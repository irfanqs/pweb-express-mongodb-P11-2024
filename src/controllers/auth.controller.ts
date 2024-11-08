import { Request, Response } from "express";
import * as User from "../services/auth.service";

// Register
export const register = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { username, password } = req.body;

		// Panggil service untuk registrasi
		const newUser = await User.registerUser(username, password);

		return res.status(201).json({
			status: "success",
			message: "User registered successfully",
			data: newUser,
		});
	} catch (error) {
		console.error("Error during registration:", error);
		return res.status(500).json({ status: "error", message: "Internal server error" });
	}
};

// Login
export const login = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { username, password } = req.body;

		// Panggil service untuk login
		const loginData = await User.loginUser(username, password);

		return res.status(200).json({
			status: "success",
			message: "Login success",
			data: loginData,
		});
	} catch (error) {
		console.error("Error during login:", error);
		return res.status(401).json({ status: "failed", message: "Internal server error" });
	}
};

