import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
	username: string;
	password: string;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

UserSchema.pre<IUser>("save", async function (next) {
	if (!this.isModified("password")) return next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
	return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
