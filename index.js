import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

import { connectDB } from './db.js';
import { User, Exercise } from './models.js';


const app = express();
dotenv.config();

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
    const filePath = new URL('./views/index.html', import.meta.url);
	res.sendFile(fileURLToPath(filePath));
});

app.post("/api/users", async (req, res) => {
    console.log("req.body:", req.body);
    if (!req.body.username) {
        return res.status(422).json({error: "username can not be empty"});
    }

    try {
        const existingUser = await User.findOne({username: req.body.username})
        if (existingUser) {
            return res.status(409).json({error: "username already in use"});
        }
    } catch (err) {
        return res.json({error: err.message});
    }
    
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
