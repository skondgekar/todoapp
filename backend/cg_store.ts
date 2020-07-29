export class cgStore {
  Users: Array<cgUser> = [];

  AddToDo(UserName: string, toDoDescription: string) {
    var userIndex;
    this.Users.forEach((user: cgUser, index: number) => {
      if (user.isSame(UserName)) {
        userIndex = index;
      }
    });
    if (userIndex !== undefined) {
      this.Users[userIndex].addToDo(toDoDescription);
      return;
    }
    if (userIndex === undefined) { //user is not defined here
      var user = new cgUser();
      user.UserName = UserName;
      this.Users.push(user); // User is created as added it in this.Users
      /**
       * Because User exists in an array this.Users after this point. We can actually recurse function AddToDo so that it will exxecute same logic again but this time user is included in a list
       */
      this.AddToDo(UserName, toDoDescription);
      return;
    }
  }
}

export class cgUser {
  UserName: string = "";
  ToDos: Array<cgToDo> = [];

  isSame(UserName: string): boolean {
    if (this.UserName === UserName) {
      return true;
    } else {
      return false;
    }
  }

  addToDo(Description: string) {
    var todo = new cgToDo();
    todo.Description = Description;
    this.ToDos.push(todo);
  }
}

export class cgToDo {
  Description: string = "";
  Completed: boolean = false;
}
