import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./config/database.js";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";

const app = express();

// ✅ CORS setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ✅ Simple test route
app.get("/test", (req, res) => {
  res.json({ message: "✅ Main app /test route working!" });
});

// ✅ API routes
app.use("/api", authRoutes);
app.use("/api", chatRoutes);

// ✅ Connect DB and start server
const PORT = process.env.PORT || 7777;

connectDB()
  .then(() => {
    console.log("✅ DATABASE connected successfully");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DATABASE connection failed:", err.message);
  });
