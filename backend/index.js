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

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL, 
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Không được phép truy cập bởi CORS"));
    }
  },
  credentials: true,
}));
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
