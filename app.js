const express = require('express'); // setup (tags in HTML)
const app = express(); // access the express server
const port = 3000;

// setup the server with a port
app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});

//
// API Routes
//	Handle browser requests (looking like a URL), that is 
//	dynamically handled by the server using a function.
//

// GET request
app.get('/hello', (req, res) => {
	res.send('<h1>Hello from Express!</h1>');
});

app.get('/goodbye', (req, res) => {	
	res.send('<h1>Goodbye from Express!</h1>');
});