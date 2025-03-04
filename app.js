const express = require('express'); // setup (tags in HTML)
var cors = require('cors'); // allow cross-origin requests (allowing requests from the same device)
const app = express(); // access the express server
app.use(cors()); // use cors
const router = express.Router(); // access the express router
const port = 3000;

//
// API Routes
//	Handle browser requests (looking like a URL), that is 
//	dynamically handled by the server using a function.
//

router.get('/songs', (req, res) => {
	const songs = [
		{
			title: "Look at Me",
			artist: "Juice WRLD",
			release_date: null,
			streams: 10000,
			genre: ["Hip-Hop", "Rap"],
		},
		{
			title: "Lucid Dreams",
			artist: "Juice WRLD",
			release_date: new Date(2018, 4, 4),
			streams: 2600000000,
			genre: ["Hip-Hop", "Rap"],
		},
	]

	res.json(songs);
});

app.use("/api", router); // enforce /api route
app.listen(port);