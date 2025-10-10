import { User, Exercise } from './models.js';

connectDB();

// TODO: import & use in index.js
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
// TODO: import & use in index.js
async function createNewUser(username) {
    try {
        const newUser = new User({
            username: username
        });

        await newUser.save();
        const newSavedUser = await User.findOne({ username: lowerCaseUsername });
        return newSavedUser;

    } catch (err) {
        console.error("error:", err.message);
    }
}
// TODO: import & use in index.js
async function returnAllUsers() {
    try {
        const allUsers = await User.find({});
        return allUsers;

    } catch (err) {
        console.error("error:", err.message);
    }
}


export { isExistingUser, createNewUser, returnAllUsers };
