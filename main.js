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
    return team.showPlayersList = !team.showPlayersList;
   }


    },
    computed: {
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