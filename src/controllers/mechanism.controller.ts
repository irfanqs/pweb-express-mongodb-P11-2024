import { Request, Response } from "express";
import { borrowBookService, returnBookService } from "../services/mechanism.service";

export const borrowBook = async (req: Request, res: Response) => {
	try {
		const { bookId } = req.params;
		const result = await borrowBookService(bookId);

		res.status(200).json({
			status: "success",
			message: "Successfully borrowed book",
			data: {
				currentQty: result.qty,
			},
		});
	} catch (error) {
		res.status(500).json({ status: "failed", message: "The qty is 0 or an unknown error occurred" });
	}
};

export const returnBook = async (req: Request, res: Response) => {
	try {
		const { bookId } = req.params;
		const result = await returnBookService(bookId);

		res.status(200).json({
			status: "success",
			message: "Successfully returned book",
			data: {
				currentQty: result.qty,
			},
		});
	} catch (error) {
		res.status(500).json({ status: "failed", message: "Cannot return book beyond initial quantity or an unknown error occurred" });
	}
};
