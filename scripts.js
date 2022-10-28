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
        this.taskList = [];
    }
    //this function determines if the task value is an instance of the Task class, if it is, then it pushes it to the taskList array
    addTask(task) {
        if (task instanceof TaskList) {
            this.taskList.push(new (task));
        } else {
            //creates an exception to terminate the program and print an error message if user input was not an instance of the Task class
            throw new Error(`Argument is not a task: ${task}.`);
        }
    }
    //this function prints the name of the task and the name of the taskList list it is on
    //QUESTION: can this only be called inside this class? how would I call it 
    describe() {
        return `This ${this.task} is on this ${this.taskList} list.`;
    }
}

//this class holds methods to run this 'app' as well as the prompts the user will interact with 
class Menu {
  //this constructor creates an empty array to hold user input for TaskList names
  constructor() {
    this.taskLists = [];
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
  //QUESTION: where is taskListInfo supposed to pull info from? i tried using the describe function above
  showTaskListMenuOptions(taskListInfo) {
    return prompt(`
            0) Back
            1) Create New Task
            2) Delete a Task
            -------------------
            ${taskListInfo}
        `);
  }
  //QUESTION: should there be something to bring us back to the mainMenuOptions at the end of the showTaskListMenuOptions function?
  //QUESTION: how are we getting back to the menu in general?

  //this function prompts users to create a name for the task list and pushes the users input to the taskLists array
  createTaskList() {
    let name = prompt("Enter a name for your task list");
    this.taskLists.push(new TaskList(name));
  }

  //this function prompts user for the index of the TaskList array they'd like to view, then shows information about that list
  viewTaskList() {
    let index = prompt("Enter the index of the task list you wish to view:");

    //creates a variable called selectedTaskList which is equal to the index from the user input
    if (index > -1 && this.taskLists.length) {
      this.selectedTaskList = this.taskLists[index];
      let description = "Task list name: " + this.selectedTaskList.name + "\n";

      //loops through the length of the taskList array and adds a description including the taskList name and some formatting
      for (let i = 0; i < this.selectedTaskList.taskList.length; i++) {
        //QUESTION: why are we adding i to the description?
        description +=
          i + ") " + this.selectedTaskList.taskLists[index].name + "\n";
      }

      //function prompts users to select an option by typing in a number
      let selection = this.showTaskListMenuOptions();
      switch (selection) {
        case "1":
          this.createTask();
          break;
        case "2":
          this.deleteTask();
      }
    }
  }

  createTask() {
    let name = prompt("Enter the name of your task:");
    //QUESTION: getting stuck on line below, should there be something to kick us back to the menu options?
    //says this.selectedTaskList.push is not a function
    this.selectedTaskList.push(new Task(name));
  }

  //function prompts user for index of the task to be deleted and uses the splice method to to remove the indicated task
  //QUESTION inside function
  deleteTask() {
    let index = prompt("Enter the index of the task you completed:");
    //QUESTION: why does the index have to be shorter than the length of the taskLists array? couldn't it be equal to?
    if (index > -1 && index < this.taskLists.length) {
      this.taskLists.splice(index, 1);
    }
  }
  //function prompts user for index of taskList to be deleted and uses the splice method to to remove the indicated taskList
  deleteTaskList() {
    let index = prompt(
      `Nice work completing your task list! Enter the index of the task list you've completed to delete it:`
    );
    if (index > -1 && index < this.taskLists.length) {
      this.taskList.splice(index, 1);
    }
  }

  //function creates an empty variable, then populates it with the results of a loop that loops through the taskLists array and adds formatting
  //QUESTION: how would I make an alert if there are no task lists to be displayed?
  displayTaskLists() {
    let displayTaskLists = "";
    for (let i = 0; i < this.taskLists.length; i++) {
      displayTaskLists += [i] + ") " + this.taskLists[i].name + "\n";
    }
    alert(displayTaskLists);
  }
}

let menu = new Menu();
menu.start();
