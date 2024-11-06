import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const register = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { username, password } = req.body;

		const existingUser = await User.findOne({ username });
		if (existingUser) return res.status(400).json({ status: "failed", message: "Username already taken" });

		// const hashedPassword = await bcrypt.hash(password, 10);
		// console.log("Hash pw register: ", hashedPassword);

		const newUser = new User({ username, password: password });
		await newUser.save();

		return res.status(201).json({
			status: "success",
			message: "User registered successfully",
			data: {
				id: newUser._id,
				username: newUser.username,
			},
		});
	} catch (error) {
		console.error("Error during registration:", error);
		return res.status(500).json({ status: "error", message: "Internal server error" });
	}
};

export const login = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username });
		if (!user) {
			console.error("User not found");
			return res.status(404).json({ status: "failed", message: "User not found" });
		}

		console.log("Stored password hash:", user.password);

		const isPasswordValid = bcrypt.compareSync(password, user.password);
		console.log("Valid?", isPasswordValid);

		if (!isPasswordValid) {
			console.error("Invalid credentials");
			return res.status(401).json({ status: "failed", message: "Invalid credentials" });
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" });

		return res.status(200).json({
			status: "success",
			message: "Login success",
			data: {
				user: {
					username: user.username,
				},
				token: token,
			},
		});
	} catch (error) {
		console.error("Error during login:", error);
		return res.status(500).json({ status: "error", message: "Internal server error" });
	}
};
