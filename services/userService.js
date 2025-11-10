import * as userRepo from '../repositories/userRepo.js';

async function createUser(username) {
	const lowerCaseUsername = username.toLowerCase();

    if (await userRepo.isExistingUser(lowerCaseUsername)) {
        throw new Error("USERNAME_EXISTS");
    }

    return await userRepo.createNewUser(lowerCaseUsername);
}

export { createUser };
