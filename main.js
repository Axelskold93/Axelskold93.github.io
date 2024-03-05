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
      }
    },
    data() {
        return {
          teams: [], 
          teamNews: []  
        };
      },

      mounted() {
        this.fetchData();
    }
      
    }).mount('#app');