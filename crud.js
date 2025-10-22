import { User, Exercise } from './models.js';


async function isExistingUser(username) {
    try {
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return true;
        }
        return false;
    } catch (err) {
        console.error("error:", err.message);
        throw err;
    }
}

async function createNewUser(username) {
    try {
        const newUser = new User({
            username: username
        });

        await newUser.save();
        return newUser;

    } catch (err) {
        console.error("error:", err.message);
        throw err;
    }
}

async function returnOneUser(userID) {
    try {
        const user = await User.findById(userID);
        return user;

    } catch (err) {
        console.error("error:", err.message);
        throw err;
    }
}

async function returnAllUsers() {
    try {
        const allUsers = await User.find({});
        return allUsers;

    } catch (err) {
        console.error("error:", err.message);
        throw err;
    }
}

async function createNewExercise(userID, description, duration, date) {
    try {
        const newExercise = new Exercise({
            description: description,
            duration: duration,
            date: date,
            user: userID
        });

        await newExercise.save();
        // TODO: determine if i still need array of exercise references to better query for logs
        await User.updateOne({ _id: userID }, { $push: { exercises: newExercise.id } })
        return newExercise;

    } catch (err) {
        console.error("error:", err.message);
        throw err;
    }
}


export { isExistingUser, createNewUser, returnOneUser, returnAllUsers, createNewExercise };
