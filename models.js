import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
});

const exerciseSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},
	date: String,
});


const User = mongoose.model("User", userSchema);
const Exercise = mongoose.model("Exercise", exerciseSchema);
export { User, Exercise };
