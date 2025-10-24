import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
	username: {
		type: String,
		required: true,
	}
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
	date: {
		type: Date,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});


const User = mongoose.model("User", userSchema);
const Exercise = mongoose.model("Exercise", exerciseSchema);
export { User, Exercise };
