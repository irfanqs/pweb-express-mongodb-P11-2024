import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { borrowBook, returnBook } from "../controllers/mechanism.controller";

const router = Router();

router.use(authMiddleware as any);

router.post("/borrow/:bookId", borrowBook);
router.post("/return/:bookId", returnBook);

export default router;
