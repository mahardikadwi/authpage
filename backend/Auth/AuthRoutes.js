import express from "express"
import { AuthLogin, AuthLogout, AuthRegister } from "../Controller/AuthController.js";


const router = express.Router();

router.post("/register", AuthRegister);
router.post("/login", AuthLogin);
router.post("/logout", AuthLogout);

export default router;