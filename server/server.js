import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connecToMongoDB.js";
import { app,server } from "./socket/socket.js";

const port = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); // to parse the incoming request with JSON payloads (from req.body)
app.use(cookieParser()); // to parse the incoming cookies from the request

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

 
// app.get("/",(req,res) => {
//     // root route https://localhost:5000/
//     res.send("Hello World ")
// });


server.listen(port, () => {
    connectToMongoDB();
    console.log(`Server running on port ${port} `)
});