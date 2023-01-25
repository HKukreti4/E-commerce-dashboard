import express from "express";
import cors from "cors";
import connectDb from "./db/config.js";
import route from "./routes/routes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
connectDb();
app.use(express.json());

app.use("/", route);

app.listen(process.env.PORT || 5000, () => {
  console.log("server started");
});
