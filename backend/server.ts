import express, { Request, Response } from "express";

const app = express();

const PORT = 8085;

app.get("/", (req: Request, res: Response) => {
  console.log(req.query);
  var sum = (+req.query.num1!) + (+req.query.num2!)
  res.send("Sum is "+ sum);
});

app.listen(PORT, () => {
  console.log("Listening on ", PORT);
});
