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

app.get("/getToDo", async (req: Request, res: Response) => {
  const UserName = req.query.UserName!;
  // _cgStore.GetTodoForUser(UserName.toString(),(todoList: Array<cgToDo>)=>{
  //   res.json(todoList);
  // });

  var todoList = await _cgStore.getToDoForusersAsync(UserName.toString());
  res.json(todoList);
  return;
});

app.get("/toggleTodo", async (req: Request, res: Response) => {
  // const UserName = req.query.UserName;
  // const ToDoDescription = req.query.ToDoDescription;
  const { UserName, ToDoDescription } = req.query;
  if (UserName === undefined || ToDoDescription === undefined) {
    res.send("Username or todo description cannot be undefined");
    return;
  }

  const success = await _cgStore.toggleTodo(
    UserName.toString(),
    ToDoDescription.toString()
  );

  res.send(success);
  return;
});

app.get("/deleteToDo", async (req: Request, res: Response) => {
  // const UserName = req.query.UserName;
  // const ToDoDescription = req.query.ToDoDescription;
  const { UserName, ToDoDescription } = req.query;
  if (UserName === undefined || ToDoDescription === undefined) {
    res.send("Username or todo description cannot be undefined");
    return;
  }

  const success = await _cgStore.deleteToDo(
    UserName.toString(),
    ToDoDescription.toString()
  );

  res.send(success);
  return;
});

app.listen(PORT, () => {
  console.log("Listening on ", PORT);
});
