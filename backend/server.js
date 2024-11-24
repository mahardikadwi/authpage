import express from "express"
import userRoutes from "./Auth/AuthRoutes.js"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
// import db from "../backend/Config/Database.js";

dotenv.config();
const app = express();
const PORT = 5000;
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser())
app.use("/users", userRoutes);

app.get("/", (req, res) => {
    res.send("backend is running!")
});

// db.sync({ alter: true }).then(() => {
//     console.log("db updated!")
// });

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})
