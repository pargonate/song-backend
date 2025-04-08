const express = require('express'); // setup (tags in HTML)
var cors = require('cors'); // allow cross-origin requests (allowing requests from the same device)

const bodyParser = require('body-parser');
const Song = require('./models/songs.js');
const req = require('express/lib/request.js');

const app = express(); // access the express server
app.use(cors()); // use cors
app.use(bodyParser.json()); // Parse body JSON

const router = express.Router(); // access the express router
const port = 3000;

//
// API Routes
//	Handle browser requests (looking like a URL), that is 
//	dynamically handled by the server using a function.
//

router.get('/songs', async(request, response) => {
	try {
		const songs = await Song.find({});
		response.send(songs);
		console.log(songs);
	} catch (error) {
		console.log(error);
	}
});

router.post('/songs', async(request, response) => {
	try {
		const song = await new Song(request.body);
		await song.save(); // WRITE to DB
		response.status(201).json(song)
		console.log(song);
	} catch (error) {
		response.status(400).send(error);
		console.log(error)
	}
})

router.get('/songs/:id', async(request, response) => {
	try {
		const song = await Song.findById(request.params.id);
		response.json(song)
	} catch (error) {
		response.status(400).send(error)
	}
})

router.put("/songs/:id", async(request, response) => {
	try {
		const song = request.body;
		await Song.updateOne({_id: request.params.id}, song);
		console.log(song)
		response.sendStatus(204)
	} catch (error) {
		response.status(400).send(error);
	}
});

app.use("/api", router); // enforce /api route
app.listen(port);