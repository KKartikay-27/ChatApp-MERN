import dotenv from "dotenv";
import express from "express";

import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connecToMongoDB.js";

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); // to parse the incoming request with JSON payloads (from req.body)

app.use("/api/auth",authRoutes);


// app.get("/",(req,res) => {
//     // root route https://localhost:5000/
//     res.send("Hello World ")
// });


app.listen(5000, () => {
    connectToMongoDB();
    console.log(`Server running on port ${port} `)
});