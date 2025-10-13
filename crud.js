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
    }
}

async function createNewUser(username) {
    try {
        const newUser = new User({
            username: username
        });

        await newUser.save();
        const newSavedUser = await User.findOne({ username: username });
        return newSavedUser;

    } catch (err) {
        console.error("error:", err.message);
    }
}

async function returnAllUsers() {
    try {
        const allUsers = await User.find({});
        return allUsers;

    } catch (err) {
        console.error("error:", err.message);
    }
}


export { isExistingUser, createNewUser, returnAllUsers };
