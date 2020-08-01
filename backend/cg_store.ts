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
    if (userIndex === undefined) {
      //user is not defined here
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

  // getUsers(callback: (users: Array<cgUser>) => void) {
  //   //02
  //   setTimeout(() => {
  //     //03
  //     console.log("user are retrieved after 3 seconds ", this.Users); //04
  //     callback(this.Users); //05
  //     return;
  //   }, 3000); // 3000 miliseconds = 3 seconds
  // }

  // GetTodoForUser(
  //   UserName: string,
  //   callback: (toDoList: Array<cgToDo>) => void
  // ) {
  //   //01
  //   this.getUsers(
  //     //02
  //     //Callback
  //     (users: Array<cgUser>) => {
  //       //05 Running after 3 seconds ie after receiving data from database
  //       console.log(
  //         "users are retrieved expected that completed database call ",
  //         users
  //       ); //06
  //       for (var index = 0; index < users.length; index++) {
  //         //07
  //         var user = users[index]; //08
  //         if (user.isSame(UserName)) {
  //           callback(user.ToDos);
  //           return;
  //         }
  //       }
        
  //       throw (Error().message = "user not found"); //13
  //     }
  //     //Callback function end
  //   );
  //   //03
  // }

  async getUsersAsync(): Promise<Array<cgUser>> {
    return new Promise<Array<cgUser>>(async (resolve, reject) => {
      setTimeout(() => {
        resolve(this.Users);
      }, 3000);
    });
  }

  async getToDoForusersAsync(UserName: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      var users = await this.getUsersAsync();

      for (var index = 0; index < users.length; index++) {
        var user = users[index];
        if (user.isSame(UserName)) {
          resolve(user.ToDos);
          return;
        }
      }
      reject((Error().message = "user not found"));
      return;
    });
  }

  async toggleTodo(UserName: string, ToDoDescription: string): Promise<boolean> { 
    return new Promise<boolean>(async (resolve, reject) => {
      setTimeout(()=>{
        for (let index = 0; index < this.Users.length; index++) {
          const user = this.Users[index];
          if(user.UserName.toLowerCase() === UserName.toLowerCase()){
            for (let index2 = 0; index2 < user.ToDos.length; index2++) {
              const todo = user.ToDos[index2];
              if(todo.Description.toLowerCase() === ToDoDescription.toLowerCase()){
                this.Users[index].ToDos[index2].toggleToDo();
                resolve(true);
              }
            }
          }
        }
        resolve(false);
      }, 4000)
    });
  }

  async deleteToDo(UserName: string, ToDoDescription: string): Promise<boolean> { 
    return new Promise<boolean>(async (resolve, reject) => {
      setTimeout(() => {
        for (let index = 0; index < this.Users.length; index++) {
          const user = this.Users[index];
          if(user.UserName.toLowerCase() === UserName.toLowerCase()){
            resolve(this.Users[index].deleteMyTodo(ToDoDescription));
            return;
          }
        }
      }, 1000);
    });
  }

  async deleteToDoMulti(UserName: string, toDoDescriptions: Array<string>): Promise<boolean> { 
    return new Promise<boolean>(async (resolve, reject) => {
      for (let index = 0; index < toDoDescriptions.length; index++) {
        const todoInput = toDoDescriptions[index];
        var success = await this.deleteToDo(UserName, todoInput);
      }
      resolve(true);
    });
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

  deleteMyTodo(ToDoDescription: string): boolean{
    var indexofTodo;
    for (let index = 0; index < this.ToDos.length; index++) {
      const todo = this.ToDos[index];
      if(todo.Description.toLowerCase() === ToDoDescription.toLowerCase()){
        indexofTodo = index;
      }
    }
    if(indexofTodo === undefined){
      return false;
    }
    this.ToDos.splice(indexofTodo, 1);
    return true;
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

  toggleToDo() {
    if (this.Completed) {
      this.Completed = false;
    } else {
      this.Completed = true;
    }
  }
}
