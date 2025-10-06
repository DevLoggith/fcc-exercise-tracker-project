const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/users", (req, res) => {
    // response has to be {username: <username>, _id: <MongoDB _id string>}
    // (use ObjectId().toString() to return MongoDB generated ID as string)
});

app.post("/api/users/:_id/exercises", (req, res) => {
    // post with "description", "duration", & optionally "date". If no date supplied, use the
        // current date.
    // response = user object with exercise fields added
});

app.get("/api/users", (req, res) => {
    // returns an array
    // (simply execute .find({}) for all users documents)
});

app.get("/api/users/:_id/logs/:from?/:to?/:limit?", (req, res) => {
    // returns a full exercise log of any user
    // returns a user object with "count" property representing the number of exercises for that user
    // returns the user object with a log field array thats an array of all the exercises added with
        // "description", "duration", & "date" fields
    // can add "from", "to", & "limit" parameters to request to receive part of the log
});

const listener = app.listen(process.env.PORT || 3000, () => {
	console.log("Your app is listening on port " + listener.address().port);
});
