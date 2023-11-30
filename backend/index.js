import express from "express";
import bodyParser from "body-parser";
import employeesRouter from "./routes/employees.js";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/employees", employeesRouter);
app.use("*", (req,res) => {
  res.status(404).send("Page not found!");
});

const port = 3001;

app.listen(port, () => {
  console.log(`Server ${port} running...`);
}); 