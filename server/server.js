import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import cloudinaryConnection from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import producRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App configuration
const app = express();
const port = process.env.PORT || 4000;
connectDB();
cloudinaryConnection();

// Middleware
app.use(express.json());
app.use(cors());

// Api endpoint
app.use("/api/user", userRouter);
app.use("/api/product", producRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Homepage route
app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(port, () => console.log("Server is running at: " + port));
