import express from "express";
import cors from "cors";
import "dotenv/config";
import productRoute from "./routes/productRoutes.js";
import connectDB from "./config/connectDB.js";
import userRoute from "./routes/userRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import cartRoute from "./routes/cartRoutes.js";
import orderRoute from "./routes/orderRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
connectCloudinary();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoute);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Laptop Store!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
