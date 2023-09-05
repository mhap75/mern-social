import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import mongoose from "mongoose";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { verifyToken } from "./middleware/auth.js";

/* CONFIG */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/assets");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage });

/* UPLOAD */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* AUTHENTICATION AND AUTHORIZATION */
app.use("/auth", authRoutes);

/* USERS */
app.use("/users", usersRoutes);

/* POSTS */
app.use("/posts", postRoutes);

/* MONGOOSE CONFIG */
const PORT = process.env.PORT || 6001;
const uri = process.env.MONGODB_URI;
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () => console.log(`Listening on PORT [${PORT}]`));

		// Inserted mock database on one run and commented out in case of duplication (!!DO NOT execute this on multiple
		// runs)
		// User.insertMany(users);
		// Post.insertMany(posts);
	})
	.catch((err) => console.log(`Did not connect due to: ${err}`));
