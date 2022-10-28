//creates a class that allows us to build the players from user input for name and position, and also allows us to display their names and positions
//this class won't run anything until later in the code when we have created the interactive menu

class Player {
    constructor (nameValue, positionValue) { //information that you insert through a prompt or something, pass that info into respective properties. Having parameter in there allows you to dynamically update data
        this.name = nameValue;
        this.position = positionValue;
    }
    describe () {
        return `${this.name} plays ${this.position}.`;
    }
}

//creates a class that allows us to build a team from user input for name, holds a function that adds a player (which will be called on within the interactive
//menu later in the code) and also allows us to display the team with the names of the players on it
//this class won't run anything until later in the code when we have created the interactive menu

class Team {
  constructor(name) {
    this.name = name;
    this.players = [];
  }

  addPlayer(player) {
    if (player instanceof Player) {
      this.players.push(player);
    } else {
      //QUESTION: is Error a built in class, because it isn't defined anywhere else. Entire method never got implemented. 
      throw new Error(
        `You can only add an instance of Player. Argument is not a player: ${player}.`
      );
    }
  }
  //Could commment this out to see that it doesn't affect code at all.
  describe() {
    return `${this.name} has ${this.players.length} players.`;
  }
}

//the Menu class creates a class that prompts the user with the menu options. This class also holds all of the code to execute each menu option.

class Menu {
  constructor() { //QUESTION: why is this constructor allowed to be empty (no parameters?). In general, when to leave them empty or give them parameters. Don't need to take in info, just need to define a couple things. 
    this.teams = [];
    this.selectedTeam = null; //QUESTION: what does it mean to set something to null? why choose that instead of 0? //almost like placeholder information
  }

  // the start function will use a switch to correlate the user's input with the function it should execute (ie. if user input = 1, then execute the createTeam function)
  start() {
    let selection = this.showMainMenuOptions();

    //points to code to execute for each case, if the selection is 0, then alert "Goodbye"
    while (selection != 0) {
      switch (selection) {
        case "1":
          this.createTeam();
          break;
        case "2":
          this.viewTeam();
          break;
        case "3":
          this.deleteTeam();
          break;
        case "4":
          this.displayTeam();
          break;
        default:
          selection = 0;
      }
      selection = this.showMainMenuOptions(); // QUESTION: what does this line do? //run it after the code is completed. Sort of like a loop, will come back around to run it again
    }

    alert("Goodbye!");
  }
  //this function prompts the user with the main menu options (QUESTION: can I move this above the switch case block? In general can I move these blocks around?)
  showMainMenuOptions() {
    return prompt(`
        00) exit
        01) create team
        02) view team
        03) delete team
        04) display team
        `);
  }

  //this function prompts the user with the team menu options
  //QUESTION: confused how teamInfo is only referenced in this one block. Where does it pull teamInfo from? //parameter is a nickname for what is coming into it 
  showTeamMenuOptions(teamInfo) { //teamInfo is an alias (it is equal to the description data)
    return prompt(`
        00) back
        01) create a team
        02) delete a team

        -----------------
        ${teamInfo}
        `);
  }

  //this function creates a variable from user input to use as a team's name, then runs the Team class function on it and pushes the result to the to the empty teams array
  createTeam() {
    let name = prompt("What is your team name?");
    this.teams.push(new Team(name));
  }

  //this function creates a variable from user input and loops through
  viewTeam() {
    let index = prompt("Enter the index of the team you wish to view:");

    //this if statement runs through the teams array, and if the user's input is > -1 and equal (?) to the team array's length, then we find the specified team and describe it
    if (index > -1 && this.teams.length) { //prevent a scenario where there isn't a team
      //QUESTION: is it asking if index is > -1 and also if index is > this.teams.length, or if it is equal to it?
      this.selectedTeam = this.teams[index];
      let description = "Team Name: " + this.selectedTeam.name + "\n";

      //this loop runs through the selected team's players and adds formatting, the players' names and the players' positions.
      for (let i = 0; i < this.selectedTeam.players.length; i++) {
        description +=
          i +
          ") " +
          this.selectedTeam.players[i].name +
          " - " +
          this.selectedTeam.players[i].position +
          "\n";
      }

      //QUESTION: unsure exactly what this is doing:
      let selection = this.showTeamMenuOptions(description);
      switch (selection) {
        case "1":
          this.createPlayer();
          break;
        case "2":
          this.deletePlayer();
      }
    }
  }

  ////this function creates a local variable, filled in by user input, and uses a splice method to remove the indicated team
  deleteTeam() {
    let index = prompt("Enter the index of the team you wish to delete:");
    if (index > -1 && index < this.teams.length) {
      this.teams.splice(index, 1);
    }
  }

  //this function creates two local variables, filled in by user input, and pushes those to the Player array
  createPlayer() {
    let name = prompt("Enter name for new player:");
    let position = prompt("Enter position for new player:");
    this.selectedTeam.players.push(new Player(name, position));
  }

  //this function creates a local variable, filled in by user input, and uses a splice method to remove the indicated player
  deletePlayer() {
    let index = prompt("Enter the index of the player you wish to delete");
    if (index > -1 && index < this.selectedTeam.players.length) {
      this.selectedTeam.players.splice(index, 1);
    }
  }
  //this function creates an empty local variable, runs a for loop through the length of the teams array, and adds formatting and the teams' names
  displayTeams() {
    let teamString = "";
    for (let i = 0; i < this.teams.length; i++) {
        // why are we adding i to the team string if i is a local variable?
      teamString += i + ") " + this.teams[i].name + "\n";
    }
    alert(teamString);
  }
}

    let menu = new Menu();
    menu.start();




