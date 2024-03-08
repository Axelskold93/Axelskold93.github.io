Vue.createApp({
    methods: { 
      fetchData() {
        fetch ('./season.json')
        .then (response => {
          return response.json();
        })
        .then(data => {
          this.teams = data.teams;

        })

        fetch('./teamnews.json')
        .then(response => {
            return response.json(); 
        })
        .then(data => {
            this.teamNews = data.team_news;
        });

      },
      calculateGoalDifference(team) {
        return team.goals_for - team.goals_against;
   },
   calculatePoints(team) {
       return team.wins * 3 + team.draws;
   },    
   togglePlayersList(team) {
     team.showPlayersList = !team.showPlayersList;
   },
   selectPlayer (player) {
    if (!this.playerOne.name) {
      this.playerOne = player;
    }
    else if (!this.playerTwo.name) {
      if (player.name === this.playerOne.name) {
        alert("You cant compare the same player.")
      }
      else {
        this.playerTwo = player;
      }
      
    }
    if (this.playerOne.name && this.playerTwo.name) {
       this.playersChosen = true;
    }
   },
   resetHeadToHead() {
          this.playersChosen = false;
          this.playerOne = {};
          this.playerTwo = {};
   },
   toggleComparison () {
    this.showComparison = !this.showComparison;

   },
   toggleDescription(index) {
    this.showDescription[index] = !this.showDescription[index];
  }

    },
    computed: {
      getTopPlayers() {
        return (statistics) => {
          return this.teams
            .flatMap(team => team.players.map(player => ({
              name: player.name,
              team: team.name,
              [statistics]: player[statistics] 
            })))
            .sort((a, b) => b[statistics] - a[statistics])
            .slice(0, 5);
        };
      },
      topScorers() {
        return this.getTopPlayers('goals');
      },
      topAssists() {
        return this.getTopPlayers('assists');
      },
      topYellowCards() {
        return this.getTopPlayers('yellow_cards');
      },
      topRedCards() {
        return this.getTopPlayers('red_cards');
      },
      sortedTeams() {
        return this.teams.slice().sort((a, b) => {
            return this.calculatePoints(b) - this.calculatePoints(a);
        });
    }
      
    },
    data() {
        return {
          showComparison: false,
          playersChosen: false,
          playerOne: {},
          playerTwo: {},
          teams: [], 
          teamNews: [],
          showDescription: [] 
        };
      },

      mounted() {
        this.fetchData();
    }
      
    }).mount('#app');