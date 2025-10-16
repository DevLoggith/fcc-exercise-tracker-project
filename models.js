import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	exercises: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Exercise"
	}]
});

const exerciseSchema = new Schema({
	description: {
		type: String,
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},
	// TODO: should "date" be required in the schema? 
	// date will be added to exercise whether user supplied or not; either user supplied or the
	// current date/time.
	date: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});


const User = mongoose.model("User", userSchema);
const Exercise = mongoose.model("Exercise", exerciseSchema);
export { User, Exercise };
