import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import { validateUserForm, validateExerciseForm } from './utils/formValidation.js';
import * as userRepo from './repositories/userRepo.js';
import * as exerciseRepo from './repositories/exerciseRepo.js';
import * as userService from './services/userService.js';
import * as exerciseService from './services/exerciseService.js';


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
        try {
            const newUser = await userService.createUser(req.body.username);
            res.status(201).json({ username: newUser.username, _id: newUser.id });

        } catch (err) {
            if (err.message === "USERNAME_EXISTS") {
                return res.status(409).json({ error: "username already in use" });
            }

            res.status(500).json({ error: "An internal server error occurred" });
        }
    })

    .get (async (req, res) => {
        try {
            const allUsers = await userRepo.returnAllUsers();
            res.status(200).json(allUsers);
        } catch (err) {
            res.status(500).json({ error: "An internal server error occurred" });
        }
    })

app.post("/api/users/:_id/exercises", validateExerciseForm, async (req, res) => {
    // TODO: add validation to return error if no users with that ID exists
    try {
        const result = await exerciseService.addExercise(
            req.params._id,
            req.body.description,
            req.body.duration,
            req.body.date
        );
        res.status(200).json(result);
        
    } catch (err) {
        res.status(500).json({ error: "An internal server error occurred" });
    }
});

app.get("/api/users/:_id/logs", async (req, res) => {
    if (req.query.from || req.query.to) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        
        if (!dateRegex.test(req.query.from) || !dateRegex.test(req.query.to)) {
            return res.status(422).json({error: "improper date format. format should be 'YYYY-MM-DD'"});
        }
    }

    const userID = req.params._id;
    const from = req.query.from;
    const to = req.query.to;
    const limit = req.query.limit;
    const exercisesArray = [];

    try {
        const user = await userRepo.returnOneUser(userID);
        const exercises = await exerciseRepo.returnUserExercises(userID, from, to, limit);
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
