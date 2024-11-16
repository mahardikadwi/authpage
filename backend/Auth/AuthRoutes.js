import express from "express"
import { AuthLogin, AuthRegister } from "../Controller/AuthController.js";


const router = express.Router();

router.post("/register", AuthRegister);
router.post("/login", AuthLogin);

export default router;