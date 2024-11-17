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
        if(!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY, {});
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 100,
            sameSite: 'Strict',
        });
        res.json({ user: { username: user.username, email: user.email } });
        console.log("login success")
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};