import express, { json } from "express";
import cors from "cors";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import connection from "./Config/Db.js";
import Userroute from "./Routes/Userroutes.js";
import Bloogroutes from "./Routes/Bloogroutes.js";
dotenv.config();
connection();
const app = express();
app.use(cors());
app.use(json());
app.use(morgan("dev"));

app.use(Userroute);
app.use(Bloogroutes);
const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => {
  return res.status(200).send({
    message: "welcome",
  });
});
app.listen(PORT, () => {
  console.log(
    `server running on ${process.env.DEV_MODE} port no ${PORT}`.bgCyan.white
  );
});
