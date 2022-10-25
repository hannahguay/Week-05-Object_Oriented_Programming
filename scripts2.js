//creates a class that allows us to build the players from user input for name and position, and also allows us to display their names and positions
//this class won't run anything until later in the code when we have created the interactive menu

class Player {
    constructor (name, position) {
        this.name = name;
        this.position = position;
    }
    describe () {
        return `${this.name} plays ${this.position}.`;
    }
}

//creates a class that allows us to build a team from user input for name, holds a function that adds a player (which will be called on within the interactive
//menu later in the code) and also allows us to display the team with the names of the players on it
//this class won't run anything until later in the code when we have created the interactive menu

class Team {
    constructor (name) {
        this.name = name;
        this.players = [];
    }
    
    addPlayer (player) {
      if (player instanceof Player) {
        this.players.push(player);
      } else {
        throw new Error(`You can only add an instance of Player. Argument is not a player: ${player}.`);
      }
    }

    describe () {
        return `${this.name} has ${this.players.length} players.`;
    }
    
}

//the Menu class creates a class that prompts the user with the menu options. This class also holds all of the code to execute each menu option.

class Menu {
    constructor() {
        this.teams = [];
        this.selectedTeams = null;
    }

    // the start function will use a switch to correlate the user's input with the function it should execute (ie. if user input = 1, then execute the createTeam function)
    start () {
        let selection = this.showMainMenuOptions ();

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
        selection = this.showMainMenuOptions;
        }

      alert("Goodbye!")
    }   
    //this function prompts the user with the main menu options (can I move this above the switch case block?)
    showMainMenuOptions () {
        return prompt(`
        00) exit
        01) create team
        02) view team
        03) delete team
        04) display team
        `);
    }

    //this function prompts the user with the team menu options
    //confused how teamInfo is only referenced in this one block. Where does it pull teamInfo from? 
    showTeamMenuOptions (teamInfo) {
        return prompt(`
        00) back
        01) create a team
        02) delete a team

        -----------------
        ${teamInfo}
        `)
    }

    //this function creates a variable from user input to use as a team's name
    createTeam () {
        let name = prompt('What is your team name?');
        this.teams.push(new Team(name))
    }

    viewTeam () {
        let index = prompt("Enter the index of the team you wish to view:");
        if (index > -1 && this.teams.length) { //

        }
    }
}



