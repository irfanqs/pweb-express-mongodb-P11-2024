import { Request, Response } from "express";
import mongoose from "mongoose";
import * as BookService from "../services/book.service"; // import fungsi dari service

// Read
export const getAllBooks = async (req: Request, res: Response) => {
	try {
		const books = await BookService.getAllBooks(); // panggil service
		res.json({ status: "success", message: "Successfully get all books", data: books });
	} catch (error) {
		res.status(500).json({ status: "error", message: "Error getting books" });
	}
};

// Read by ID
export const getBookById = async (req: Request, res: Response): Promise<Response> => {
	const { bookId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(bookId)) {
		return res.status(400).json({ status: "failed", message: "Invalid book ID" });
	}

	try {
		const book = await BookService.getBookById(bookId); // panggil service
		if (!book) {
			return res.status(404).json({ status: "failed", message: "Book not found" });
		}
		return res.status(200).json({ status: "success", message: "Successfully get book", data: book });
	} catch (error) {
		return res.status(500).json({ status: "error", message: "Error retrieving book" });
	}
};

// Create
export const addNewBook = async (req: Request, res: Response): Promise<Response> => {
	const { title, author, publishedDate, publisher, description, coverImage, rating, tags, initialQty, qty } = req.body;

	if (!title || !author || !publishedDate || !publisher || !description || !coverImage || !rating || !tags || initialQty === undefined || qty === undefined) {
		return res.status(400).json({ status: "failed", message: "All fields are required" });
	}

	if (initialQty <= 0 || qty <= 0) {
		return res.status(400).json({
			status: "error",
			message: "Initial Qty and Qty should not be 0 or less",
		});
	}

	if (qty > initialQty) {
		return res.status(400).json({
			status: "error",
			message: "Qty should not be more than Initial Qty",
		});
	}

	try {
		const newBook = await BookService.addNewBook({ title, author, publishedDate, publisher, description, coverImage, rating, tags, initialQty, qty }); // panggil service
		return res.status(201).json({ status: "success", message: "Successfully add book", data: newBook });
	} catch (error) {
		return res.status(500).json({ status: "error", message: "Error adding book" });
	}
};

// Update
export const updateBook = async (req: Request, res: Response): Promise<Response> => {
	const { bookId } = req.params;
	const { title, author, publishedDate, publisher, description, coverImage, rating, tags, initialQty, qty } = req.body;

	if (initialQty <= 0 || qty <= 0) {
		return res.status(400).json({
			status: "failed",
			message: "Initial Qty and Qty should not be 0 or less",
		});
	}

	if (qty > initialQty) {
		return res.status(400).json({
			status: "failed",
			message: "Qty should not be more than Initial Qty",
		});
	}

	try {
		const updatedBook = await BookService.updateBook(bookId, { title, author, publishedDate, publisher, description, coverImage, rating, tags, initialQty, qty }); // panggil service
		if (!updatedBook) {
			return res.status(404).json({ status: "error", message: "Book not found" });
		}

		return res.status(200).json({ status: "success", message: "Successfully update book", data: updatedBook });
	} catch (error) {
		return res.status(500).json({ status: "error", message: "Error updating book" });
	}
};

// Delete
export const deleteBook = async (req: Request, res: Response): Promise<Response> => {
	const { bookId } = req.params;

	try {
		const deletedBook = await BookService.deleteBook(bookId); // panggil service
		if (!deletedBook) {
			return res.status(404).json({ status: "failed", message: `Book with ID ${bookId} not found` });
		}
		return res.status(200).json({ status: "success", message: "Successfully remove book" });
	} catch (error) {
		return res.status(500).json({ status: "error", message: "Error deleting book" });
	}
};
