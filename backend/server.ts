import express, { Request, Response } from "express";

const app = express();

const PORT = 8085;

app.get("/", (req: Request, res: Response) => {
  console.log(req.query);
  var dob: string = req.query.dob?.toString() || "";
  var luckeyNumber = 0;

  res.send("Sum is " + luckeyNumber);
});

app.listen(PORT, () => {
  console.log("Listening on ", PORT);
});
