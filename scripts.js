//create Task class function that takes a name variable
class Task {
    constructor(name) {
        this.name = name;
    }
}

//create a TaskList class function that has a name property and an empty array property to hold future tasks, an addTask method and a describe method

class TaskList {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }
    //this method determines if the inputted task value is an instance of the Task class, if it is, then it pushes it to the tasks array
    addTask(task) {
        if (task instanceof Task) {
            this.tasks.push(new (task));
        } else {
            //creates an exception to terminate the program and print an error message if user input was not an instance of the Task class
            throw new Error(`User input is not a task: ${task}. Goodbye!`);
        }
    }

    //this method prints the name of the task and the name of the taskList list it is on
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

//this class holds methods to run the program and holds the prompts the user will interact with 
class Menu {
  //this constructor creates an empty array to hold user input for TaskList names
  constructor() {
    this.toDoList = [];
    this.selectedTaskList = null;
  }

  //this method prompts the user with the main menu options
  showMainMenuOptions() {
    return prompt(`
        0) Exit
        1) New Task List
        2) Delete Task List
        3) View Task List
        4) Display All Task Lists
        `);
  }

  //this method creates the cases for what user input we may receive and what method to run in response to that input
  start() {
    //selection is assigneed the showMainMenuOptions method
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
    //if selection = 0, alert message and end program
    alert("Thanks and have a productive day!!");
  }

  //this method prompts users to create a name for the task list and pushes the users input to the taskLists array
  createTaskList() {
    let name = prompt("Enter a name for your task list");
    this.toDoList.push(new TaskList(name));
  }

  //method prompts user for index of taskList to be deleted and uses the splice method to to remove the indicated taskList
  deleteTaskList() {
    let index = prompt(
      `Nice work completing your task list! Enter the index of the task list you've completed to delete it:`
    );
    if (index > -1 && index < this.toDoList.length) {
      this.toDoList.splice(index, 1);
    }
  }

  //this method prompts user for the index of the taskList array they'd like to view, then shows information about that list
  viewTaskList() {
    let index = prompt("Enter the index of the task list you wish to view:");

    //creates a variable called selectedTaskList which is equal to the index from the user input
    if (index > -1 && this.toDoList.length) {
      this.selectedTaskList = this.toDoList[index];

      //shows the information about the taskList they are currently in and creates a switch case that assigns which method to perform based on user input
      let taskListInfo = `${this.selectedTaskList.describe()} `;

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

  //method creates an empty variable, then populates it with the results of a loop that loops through the taskLists array and adds formatting
  displayTaskLists() {
    let displayTaskLists = "";
    for (let i = 0; i < this.toDoList.length; i++) {
      displayTaskLists += i + 1 + ") " + this.toDoList[i].describe() + "\n";
    }
    alert(displayTaskLists);
  }

  //this method prompts users to select an option by typing in a number. It also shows the name of the task list users are in
  showTaskListMenuOptions(taskListInfo) {
    return prompt(`
            0) Back
            1) Create New Task
            2) Delete a Task
            -------------------
            ${taskListInfo}
        `);
  }

  //method prompts user to enter a name for a task, and pushes that name to the tasks array
  createTask() {
    let name = prompt("Enter the name of your task:");
    this.selectedTaskList.tasks.push(new Task(name));
  }

  //method prompts user for index of the task to be deleted and uses the splice method to to remove the indicated task
  deleteTask() {
    let index = prompt("Enter the index of the task you completed:");
    if (index > -1 && index < this.toDoList.length) {
      this.selectedTaskList.tasks.splice(index, 1);
    }
  }
}

//create an instance of the menu class
let menu = new Menu();
//call the menu function
menu.start();
