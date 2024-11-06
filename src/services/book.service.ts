import Book from "../models/book.model";

export const getAllBooks = async () => {
	return Book.find();
};

export const getBookById = async (id: string) => {
	return Book.findById(id);
};

export const addNewBook = async (bookData: any) => {
	const newBook = await Book.create(bookData);
	return newBook;
};

export const updateBook = async (id: string, bookData: any) => {
	const updatedBook = await Book.findByIdAndUpdate(id, bookData, { new: true });
	return updatedBook;
};

export const deleteBook = async (id: string) => {
	await Book.findByIdAndDelete(id);
};
