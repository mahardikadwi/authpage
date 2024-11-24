import express from "express"
import { AuthLogin, AuthRegister, userProfile } from "../Controller/AuthController.js";
import AuthMiddleware from "../Middleware/AuthMiddleware.js";


const router = express.Router();

router.post("/register", AuthRegister);
router.post("/login", AuthMiddleware, AuthLogin);
router.get("/profile", userProfile);

export default router;