// TODO: import & use in index.js
function isUsernameValid(username) {
    if (!username || username.trim().length === 0) {
        return false;
    }
    return true;
}


export { isUsernameValid }; 
