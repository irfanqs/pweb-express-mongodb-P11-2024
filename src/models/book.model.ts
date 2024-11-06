import mongoose, { Schema, Document } from "mongoose";

interface Rating {
	average: number;
	count: number;
}

export interface Book extends Document {
	rating: Rating;
	title: string;
	author: string;
	publishedDate: Date;
	publisher: string;
	description: string;
	coverImage: string;
	tags: string[];
	initialQty: number;
	qty: number;
}

const BookSchema: Schema = new Schema(
	{
		rating: { average: Number, count: Number },
		title: { type: String, required: true },
		author: { type: String, required: true },
		publishedDate: { type: Date, required: true },
		publisher: { type: String, required: true },
		description: { type: String, required: true },
		coverImage: { type: String, required: true },
		tags: { type: [String], required: true },
		initialQty: { type: Number, required: true },
		qty: { type: Number, required: true },
	},
	{ timestamps: true }
);

export default mongoose.model<Book>("Book", BookSchema);
