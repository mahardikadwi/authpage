import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/UserModels.js"

export const AuthRegister = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashPassword });
        res.status(201).json({ message: "Users Created!", user });
    } catch(err) {
        res.status(500).json({ message: "Error creating users!", err });
    }
};

export const AuthLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user.id, email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" } 
        );

        const refreshToken = jwt.sign(
            { userId: user.id, email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false, // Set to true in production
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        // Respond with access token
        res.json({ accessToken: token });
        console.log("Login successful");
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Error logging in", error });
    }
};

