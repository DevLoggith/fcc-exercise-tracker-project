import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

import { connectDB } from './db.js';
import { validateUserForm, validateExerciseForm } from './helpers.js';
import * as crud from './crud.js';


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
            if (await crud.isExistingUser(lowerCaseUsername)) {
                return res.status(409).json({ error: "username already in use" });
            }

            const newSavedUser = await crud.createNewUser(lowerCaseUsername);
            res.status(201).json({ username: newSavedUser.username, _id: newSavedUser.id });

        } catch (err) {
            res.status(500).json({ error: "An internal server error occurred" });
        }
    })

    .get (async (req, res) => {
        try {
            const allUsers = await crud.returnAllUsers();
            res.status(200).json(allUsers);
        } catch (err) {
            res.status(500).json({ error: "An internal server error occurred" });
        }
    })

app.post("/api/users/:_id/exercises", validateExerciseForm, async (req, res) => {
    const userID = req.params._id;
    const description = req.body.description;
    const duration = req.body.duration;

    // TODO: add additional validation for "date" to make sure it's (user) imputed in the correct format
    if (!req.body.date || req.body.date.trim() === "") {
        const date = new Date();
        const formattedDate = date.toISOString().split("T")[0];
        req.body.date = formattedDate;
    }

    const date = req.body.date;

    // TODO: add validation to return error if no uses with that ID exists
    try {
        const newExercise = await crud.createNewExercise(userID, description, duration, date);
        const updatedUser = await crud.returnOneUser(userID);
        // TODO: find out why test #8 is not passing regarding the returned object
        res.status(201).json({
            username: updatedUser.username,
            description: newExercise.description,
            duration: newExercise.duration,
            date: newExercise.date,
            _id: newExercise._id
        });
    } catch (err) {
        res.status(500).json({ error: "An internal server error occurred" });
    }
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
