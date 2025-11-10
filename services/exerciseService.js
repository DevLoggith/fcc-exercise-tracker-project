import * as exerciseRepo from '../repositories/exerciseRepo.js';
import * as userRepo from '../repositories/userRepo.js';

async function addExercise(userID, description, duration, date) {
    const exerciseDate = date || new Date();

    const newExercise = await exerciseRepo.createNewExercise(
        userID, description, duration, exerciseDate
    );
    const user = await userRepo.returnOneUser(userID);

    return {
        _id: user._id,
        username: user.username,
        description: newExercise.description,
        duration: newExercise.duration,
        date: newExercise.date.toDateString()
    };
}

async function getUserLogs(userID, from, to, limit) {
    // Validate date format if provided
    if (from || to) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        
        if ((from && !dateRegex.test(from)) || (to && !dateRegex.test(to))) {
            throw new Error("INVALID_DATE_FORMAT");
        }
    }

    const user = await userRepo.returnOneUser(userID);
    const exercises = await exerciseRepo.returnUserExercises(userID, from, to, limit);
    const log = exercises.map(exercise => ({
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date.toDateString()
    }));

    return {
        _id: userID,
        username: user.username,
        count: log.length,
        log: log
    }
}

export { addExercise, getUserLogs };
