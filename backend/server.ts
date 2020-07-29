import express, { Request, Response } from "express";
import { cgUser, cgToDo, cgStore } from "./cg_store";

const app = express();

const PORT = 8085;

const _cgStore = new cgStore();

app.get("/", (req: Request, res: Response) => {
  console.log(req.query);
  var dob: string = req.query.dob?.toString() || "";
  var luckeyNumber = 0;

  res.send("Sum is " + luckeyNumber);
});

app.get("/addToDo", (req: Request, res: Response) => {
  if (req.query.UserName === undefined || req.query.Description === undefined) {
    res.json(_cgStore);
    return;
  }
  const cgInput: {
    UserName: string;
    ToDoDescription: string;
  } = {
    UserName: req.query.UserName.toString(),
    ToDoDescription: req.query.Description.toString(),
  };

  _cgStore.AddToDo(cgInput.UserName, cgInput.ToDoDescription);

  res.json(_cgStore);
  return;
});

app.get("/test", (req: Request, res: Response) => {
  var nishmita = new Human();
  nishmita.name = "Nishmita";
  res.send(nishmita.swim());
});

export class Human {
  name: string = "";
  swim() {
    return this.name + " Swimming";
  }
}


app.listen(PORT, () => {
  console.log("Listening on ", PORT);
});
