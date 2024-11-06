import Book from "../models/book.model";

export const borrowBookService = async (bookId: string) => {
	const book = await Book.findById(bookId);
	if (!book) {
		const error = new Error("Book not found");
		error.name = "NotFoundError";
		throw error;
	}
	if (book.qty < 1) {
		const error = new Error("Book is not available");
		error.name = "OutOfStockError";
		throw error;
	}

	book.qty -= 1;
	await book.save();
	return book;
};

export const returnBookService = async (bookId: string) => {
	const book = await Book.findById(bookId);
	if (!book) {
		const error = new Error("Book not found");
		error.name = "NotFoundError";
		throw error;
	}
	if (book.qty >= book.initialQty) {
		const error = new Error("Cannot return book beyond initial quantity");
		error.name = "ExceedInitialQtyError";
		throw error;
	}

	book.qty += 1;
	await book.save();
	return book;
};
