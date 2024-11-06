import User, { IUser } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (username: string, password: string) => {
	const user = new User({ username, password });
	await user.save();

	return { id: user._id, username: user.username };
};

export const loginUser = async (usernameOrEmail: string, password: string) => {
	const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
	if (!user || !bcrypt.compareSync(password, user.password)) {
		throw new Error("Invalid credentials");
	}

	// Generate token
	const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
		expiresIn: process.env.JWT_EXPIRES_IN || "1d",
	});

	return { user: { username: user.username }, token };
};
