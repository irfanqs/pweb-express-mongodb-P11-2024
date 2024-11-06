import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { getAllBooks, getBookById, addNewBook, updateBook, deleteBook } from "../controllers/book.controller";

const router = Router();

router.use(authMiddleware as any);

router.get("/", getAllBooks);
router.get("/:bookId", getBookById as any);
router.post("/", addNewBook as any);
router.patch("/:bookId", updateBook as any);
router.delete("/:bookId", deleteBook as any);

export default router;
