const db = require("../db");

const Song = db.model("Song", {
	title : { type: String, required: true },
	artist : String,
	releaseDate: { type: Date, default: Date.now },
	genre: [String]
})

module.exports = Song;