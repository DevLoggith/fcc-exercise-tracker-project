import { Exercise } from "../models/exercise.js";

async function createNewExercise(userID, description, duration, date) {
	try {
		const newExercise = new Exercise({
			description: description,
			duration: duration,
			date: date,
			user: userID,
		});

		await newExercise.save();
		return newExercise;
	} catch (err) {
		console.error("error:", err.message);
		throw err;
	}
}

async function returnUserExercises(userID, from, to, limit) {
	const query = { user: userID };

	if (from || to) {
		query.date = {};
		if (from) query.date.$gte = from;
		if (to) query.date.$lt = to;
	}

	try {
		const userExercises = await Exercise.find(query).limit(limit).lean();

		return userExercises;
	} catch (err) {
		console.error("error:", err.message);
		throw err;
	}
}

export { createNewExercise, returnUserExercises };
