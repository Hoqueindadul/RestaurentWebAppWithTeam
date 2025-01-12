import express from "express"
import { login, logout, register} from "../controler/user.controler.js"
import { isAuthenticated } from "../middleware/authStudent.js"


const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/logout", isAuthenticated, logout)

export default router