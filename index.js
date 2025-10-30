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

// TODO: move data transformation/validation to new service layer
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
    let date = new Date(req.body.date);

    if (!req.body.date || req.body.date.trim() === "") {
        date = new Date();
    }

    // TODO: add validation to return error if no users with that ID exists
    try {
        const newExercise = await crud.createNewExercise(userID, description, duration, date);
        const updatedUser = await crud.returnOneUser(userID);

        res.status(201).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            description: newExercise.description,
            duration: newExercise.duration,
            date: newExercise.date.toDateString()
        });
    } catch (err) {
        res.status(500).json({ error: "An internal server error occurred" });
    }
});

app.get("/api/users/:_id/logs", async (req, res) => {
    const from = req.query.from;
    const to = req.query.to;
    const limit = req.query.limit;
    const userID = req.params._id;
    const exercisesArray = [];

    try {
        const user = await crud.returnOneUser(userID);
        const exercises = await crud.returnUserExercises(userID, from, to, limit);
        const count = exercises.length;

        // creates array for log parameter with only the data we need to return
        for (const exercise of exercises) {
            exercisesArray.push({
                description: exercise.description,
                duration: exercise.duration,
                date: exercise.date.toDateString()
            });
        }

        res.status(200).json({
            _id: userID,
            username: user.username,
            count: count,
            log: exercisesArray
        });
    } catch (err) {
        res.status(500).json({ error: "An internal server error occurred" });
    }
});

const listener = app.listen(process.env.PORT || 3000, () => {
	console.log("Your app is listening on port " + listener.address().port);
});
