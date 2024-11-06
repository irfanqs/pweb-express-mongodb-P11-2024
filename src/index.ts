import express from "express";
import connectDB from "./db-connection";
import authRoutes from "./routes/auth.route";
import bookRoutes from "./routes/book.route";
import mechanismRoutes from "./routes/mechanism.route";

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());

// All routes
app.use("/auth", authRoutes);
app.use("/book", bookRoutes);
app.use("/mechanism", mechanismRoutes);

connectDB();

app.get("/", (req, res) => {
	res.send("Welcome to Express + MongoDB Atlas API!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
