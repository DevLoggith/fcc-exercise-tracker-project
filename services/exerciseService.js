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

export { addExercise };
