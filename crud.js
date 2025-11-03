import { User } from './models/user.js';
import { Exercise } from './models/exercise.js';


async function isExistingUser(username) {
    try {
        // .lean() returns plain JS object, not fully-functional Mongoose doc
        // https://mongoosejs.com/docs/tutorials/lean.html#when-to-use-lean
        const existingUser = await User.findOne({ username: username }).lean();
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

// TODO: refactor user query functions into just one function
async function returnOneUser(userID) {
    try {
        // .lean() returns plain JS object, not fully-functional Mongoose doc
        // https://mongoosejs.com/docs/tutorials/lean.html#when-to-use-lean
        const user = await User.findById(userID).lean();
        return user;

    } catch (err) {
        console.error("error:", err.message);
        throw err;
    }
}

async function returnAllUsers() {
    try {
        // .lean() returns plain JS object, not fully-functional Mongoose doc
        // https://mongoosejs.com/docs/tutorials/lean.html#when-to-use-lean
        const allUsers = await User.find({}).lean();
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
        const userExercises = await Exercise.find(query)
            .limit(limit)
            .lean();
        
        return userExercises;

    } catch (err) {
        console.error("error:", err.message);
        throw err;
    }
}


export {
    isExistingUser,
    createNewUser,
    returnOneUser,
    returnAllUsers,
    createNewExercise,
    returnUserExercises
};
