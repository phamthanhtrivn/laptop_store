import express from "express";
import cors from "cors";
import productRoute from "./routes/productRoutes.js";
import connectDB from "./config/connectDB.js";

connectDB()

const PORT = process.env.PORT || 5000;

const app = express()
app.use(cors())
app.use(express.json())


app.use('/api/products', productRoute)

app.get("/", (req, res) => {
  res.send("Welcome to Laptop Store!")
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
})