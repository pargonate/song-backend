const express = require('express'); // setup (tags in HTML)
var cors = require('cors'); // allow cross-origin requests (allowing requests from the same device)

const bodyParser = require('body-parser');
const Song = require('./models/songs.js');
const User = require('./models/users.js');
const jwt = require('jwt-simple');

const app = express(); // access the express server
app.use(cors()); // use cors
app.use(bodyParser.json()); // Parse body JSON

const router = express.Router(); // access the express router
const port = 3000;
const secret = "supersecret"

//
// API Routes
//	Handle browser requests (looking like a URL), that is 
//	dynamically handled by the server using a function.
//

router.post("/user", async(request, response) => {
	if (!request.body.username || !request.body.password) {
		response.status(400).json({error: "Missing username or password!"});
	}

	const newUser = await new User({
		username: request.body.username,
		password: request.body.password,
		status: request.body.status
	});

	try {
		await newUser.save();
		response.sendStatus(201) // Created
	} catch (error) {
		response.status(400).send(error);
	}
});

router.post("/auth", async(request, response) => {
	if (!request.body.username || !request.body.password) {
		response.status(400).json({error: "Missing username or password!"});
		return;
	}

	let user = await User.findOne({username: request.body.username});

	// try {

	// } catch (error) {
		
	// }
	if (!user) {
		response.status(401).json({error: "Unable to login"})
	} else {
		if (user.password != request.body.password) {
			response.status(401).json({error: "Bad password"});
		} else {
			const foundUsername = user.username; // Correct variable assignment
			const token = jwt.encode({username: user.username}, secret);
			const auth = 1;
			response.json({
				foundUsername,
				token: token,
				auth: auth
			});
		}
	}
});

router.get("/status", async(request, response) => {
	if (!request.headers["x-auth"]) {
		return response.status(401).json({error: "Missing X-Auth"});
	}

	const token = request.headers["x-auth"]
	try {
		const decoded = jwt.decode(token, secret);

		let users = User.find({}, "username status");
		response.json(users)
	} catch (error) {
		response.status(401).json({error: "invalid JWT"})
	}
});

//
// Songs
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

router.delete("/songs/:id", async(request, response) => {
	try {
		const song = await Song.findById(request.params.id);
		console.log(song)
		await Song.deleteOne({ _id: song._id });
		response.sendStatus(204);
	} catch (error) {
		response.status(400).send(error);
	}
})

app.use("/api", router); // enforce /api route
app.listen(port);