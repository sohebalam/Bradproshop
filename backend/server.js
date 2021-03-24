import express from "express"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import connectDB from "./db.js"

import path from "path"

const __dirname = path.resolve()
import dotenv from "dotenv"
dotenv.config({ path: path.join(__dirname, ".env") })

connectDB()

const app = express()

app.use(express.json())

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uploadRoutes)

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

if (process.env.NODE_ENV === "production") {
  const root = path.join(__dirname, "..", "frontend", "build")
  app.use(express.static(root))
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root })
  })
} else {
  app.get("/", (req, res) => {
    res.send("API is running....")
  })
}

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
