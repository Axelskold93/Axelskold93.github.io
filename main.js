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

      },
      calculateGoalDifference(team) {
        return team.goals_for - team.goals_against;
   },
   calculatePoints(team) {
       return team.wins * 3 + team.draws;
   }

    },
    computed: {
    },
    data() {
        return {
          teams: []   
        };
      },

      mounted() {
        this.fetchData();
    }
      
    }).mount('#app');