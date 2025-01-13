import express from "express";
import { login, logout, register, bookTabel, contactFormSubmit} from "../controler/user.controler.js";
import { isAuthenticated } from "../middleware/authStudent.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.post("/book-a-table", bookTabel);
router.post("/contact", contactFormSubmit);

export default router;
