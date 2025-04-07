const express = require('express'); // setup (tags in HTML)
var cors = require('cors'); // allow cross-origin requests (allowing requests from the same device)

const bodyParser = require('body-parser');
const Song = require('./models/songs.js')

const app = express(); // access the express server
app.use(cors()); // use cors
app.use(bodyParser.json()); // Parse body JSON

const router = express.Router(); // access the express router
const port = 3000;

// grab all songs
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
		const song = new Song(request.body);
		await song.save(); // WRITE to DB
		response.status(201).json(song)
		console.log(song);
	} catch (error) {
		response.status(400).send(error);
	}
})

//
// API Routes
//	Handle browser requests (looking like a URL), that is 
//	dynamically handled by the server using a function.
//

// router.get('/songs', (req, res) => {
// 	const songs = [
// 		{
// 			title: "Look at Me",
// 			artist: "Juice WRLD",
// 			release_date: null,
// 			streams: 10000,
// 			genre: ["Hip-Hop", "Rap"],
// 		},
// 		{
// 			title: "Lucid Dreams",
// 			artist: "Juice WRLD",
// 			release_date: new Date(2018, 4, 4),
// 			streams: 2600000000,
// 			genre: ["Hip-Hop", "Rap"],
// 		},
// 	]

// 	res.json(songs);
// });

app.use("/api", router); // enforce /api route
app.listen(port);