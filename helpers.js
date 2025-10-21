function validateUserForm(req, res, next) {
    if (!req.body.username || req.body.username.trim() === "") {
        return res.status(422).json({ error: "username can not be empty" });
    }
    next();
}

function validateExerciseForm(req, res, next) {
    const errors = [];

    if (!req.body.description || req.body.description.trim() === "") {
        errors.push("exercise description can not be empty");
    }

    if (!req.body.duration || req.body.duration.trim() === "") {
        errors.push("exercise duration can not be empty");
    }

    if (errors.length > 0) {
        return res.status(422).json({ errors });
    }
    next();
}

export { validateUserForm, validateExerciseForm }; 
