import express from "express";
import "dotenv/config";
import connectDb from "./utils/dbConn.js";
import blogRouter from "./routers/blogRoute.js";
import authRouter from "./routers/authRouter.js";
import cors from "cors";
const app = express();
const port = process.env.PORT || 8000;
connectDb();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  console.log("app is running successfully");
  res.json({
    status: "success",
    statusCode: 200,
    message: "App is running successfully",
  });
});
app.use("/api", blogRouter);
app.use("/api/user", authRouter);

app.listen(port, console.log(`app is running at port : ${port}`));
