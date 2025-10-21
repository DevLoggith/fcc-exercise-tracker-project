import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

import { connectDB } from './db.js';
import { validateUserForm, validateExerciseForm } from './helpers.js';
import { isExistingUser, createNewUser, returnAllUsers } from './crud.js';


const app = express();
dotenv.config();
connectDB();

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }))
app.get("/", (req, res) => {
    const filePath = new URL('./views/index.html', import.meta.url);
	res.sendFile(fileURLToPath(filePath));
});


app.route("/api/users")
    .post(validateUserForm, async (req, res) => {
        const lowerCaseUsername = req.body.username.toLowerCase();

        try {
            if (await isExistingUser(lowerCaseUsername)) {
                return res.status(409).json({ error: "username already in use" });
            }

            const newSavedUser = await createNewUser(lowerCaseUsername);
            res.status(201).json({ username: newSavedUser.username, _id: newSavedUser.id });

        } catch (err) {
            res.status(500).json({ error: "An internal server error occurred" });
        }
    })

    .get (async (req, res) => {
        try {
            const allUsers = await returnAllUsers();
            res.status(200).json(allUsers);
        } catch (err) {
            res.status(500).json({ error: "An internal server error occurred" });
        }
    })

app.post("/api/users/:_id/exercises", validateExerciseForm, (req, res) => {
    if (!req.body.date || req.body.date.trim() === "") {
        const date = new Date();
        const formattedDate = date.toISOString().split("T")[0];
        req.body.date = formattedDate;
    }
    // post with "description", "duration", & optionally "date". If no date supplied, use the
    // current date, date = required in schema
    // response = user object with exercise fields added
});

app.get("/api/users/:_id/logs{/:from}{/:to}{/:limit}", (req, res) => {
    // returns a full exercise log of any user
    // returns a user object with "count" property representing the number of exercises for that user
    // returns the user object with a log field array thats an array of all the exercises added with
        // "description", "duration", & "date" fields
    // can add "from", "to", & "limit" parameters to request to receive part of the log
    // "from" & "to" should be yyyy-mm-dd format and "limit" should be an integer
});

const listener = app.listen(process.env.PORT || 3000, () => {
	console.log("Your app is listening on port " + listener.address().port);
});
