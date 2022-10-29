//create a class function for a Task that takes a name variable
class Task {
    constructor(name) {
        this.name = name;
    }
}

//create a class function for a Task List that takes a name variable and creates an empty array to hold tasks. 
class TaskList {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }
    //this function determines if the task value is an instance of the Task class, if it is, then it pushes it to the taskList array
    addTask(task) {
        if (task instanceof Task) {
            this.tasks.push(new (task));
        } else {
            //creates an exception to terminate the program and print an error message if user input was not an instance of the Task class
            throw new Error(`Argument is not a task: ${task}.`);
        }
    }

    //this function prints the name of the task and the name of the taskList list it is on
    describe() {
      let listName = this.name;
      
      let list = " ";
        for (let i = 0; i < this.tasks.length; i++) {
          if (i < this.tasks.length -1) {
            list += this.tasks[i].name + ", ";
          } else {
            list += this.tasks[i].name;
          }
        }
        return `${listName} - ${list}`;
    }
}

//this class holds methods to run this 'app' as well as the prompts the user will interact with 
class Menu {
  //this constructor creates an empty array to hold user input for TaskList names
  constructor() {
    this.toDoList = [];
    this.selectedTaskList = null;
  }
  //this function creates the cases for what user input we may receive and what function to run in response to that input
  start() {
    let selection = this.showMainMenuOptions();

    while (selection != 0) {
      switch (selection) {
        case "1":
          this.createTaskList();
          break;
        case "2":
          this.deleteTaskList();
          break;
        case "3":
          this.viewTaskList();
          break;
        case "4":
          this.displayTaskLists();
          break;
        default:
          selection = 0;
      }
      selection = this.showMainMenuOptions();
    }
    alert("Can't believe you didn't have any tasks to do today!");
  }

  //this function prompts users to select an option by typing in a number
  showMainMenuOptions() {
    return prompt(`
        0) Exit
        1) Create a New Task List
        2) Delete a Task List
        3) View Task List Details
        4) Display All Task Lists
        `);
  }
  //this function prompts users to select an option by typing in a number. It also shows the name of the task list users are in
  showTaskListMenuOptions(taskListInfo) {
    return prompt(`
            0) Back
            1) Create New Task
            2) Delete a Task
            -------------------
            ${taskListInfo}
        `);
  }

  //this function prompts users to create a name for the task list and pushes the users input to the taskLists array
  createTaskList() {
    let name = prompt("Enter a name for your task list");
    this.toDoList.push(new TaskList(name));
  }

  //this function prompts user for the index of the TaskList array they'd like to view, then shows information about that list
  viewTaskList() {
    let index = prompt("Enter the index of the task list you wish to view:");

    //creates a variable called selectedTaskList which is equal to the index from the user input
    if (index > -1 && this.toDoList.length) {
      this.selectedTaskList = this.toDoList[index];
    
      //function prompts users to select an option by typing in a number
      let taskListInfo = `${this.selectedTaskList.describe()} `
  
      let selection = this.showTaskListMenuOptions(taskListInfo);
      switch (selection) {
        case "1":
          this.createTask();
          break;
        case "2":
          this.deleteTask();
      }
    }
  }

  //function prompts user to enter a name for a task, and pushes that name to the tasks array
  createTask() {
    let name = prompt("Enter the name of your task:");
    this.selectedTaskList.tasks.push(new Task(name));
  }

  //function prompts user for index of the task to be deleted and uses the splice method to to remove the indicated task
  deleteTask() {
    let index = prompt("Enter the index of the task you completed:");
    if (index > -1 && index < this.toDoList.length) {
      this.selectedTaskList.tasks.splice(index, 1);
    }
  }
  //function prompts user for index of taskList to be deleted and uses the splice method to to remove the indicated taskList
  deleteTaskList() {
    let index = prompt(
      `Nice work completing your task list! Enter the index of the task list you've completed to delete it:`
    );
    if (index > -1 && index < this.toDoList.length) {
      this.toDoList.splice(index, 1);
    }
  }

  //function creates an empty variable, then populates it with the results of a loop that loops through the taskLists array and adds formatting
  displayTaskLists() {
    let displayTaskLists = "";
    for (let i = 0; i < this.toDoList.length; i++) {
      displayTaskLists += (i + 1) + ") " + this.toDoList[i].describe() + "\n";
    }
    alert(displayTaskLists);
  }
}

//create an instance of the menu class
let menu = new Menu();
//call the menu function
menu.start();
