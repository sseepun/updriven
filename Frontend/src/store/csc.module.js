import countrySC from '../assets/country-state-city'
const data = JSON.parse(localStorage.getItem(`${process.env.VUE_APP_API_URL}_CSC`));

export const csc = {
    namespaced: true,
    state: {
        countrys: countrySC,
        states: [],
        countryFullName : ((data == null)? '': data.country),
        stateFullName : ((data == null)? '': data.states),
    },
    getters: {
        countrys: state => state.countrys,
        states: state => state.states,
        countryFullName: state => state.countryFullName,
        stateFullName: state => state.stateFullName
    },
    actions: {
      assignCountry({state, commit, dispatch },country) {
            return new Promise((resolve, reject) => {   
              commit('mapStates', country);
              resolve(state.states.length)
          })
          },
      mapFullName({ commit },input){
        commit('setFullName', input);
      },
      
    },
    mutations: {
      mapStates(state, country) {
          var country = countrySC.find(function(item, i){
              if(item.numeric_code === country){
                return item;
              }
            })
          if(country.states){
          state.states = country.states
          }
        },
      setFullName(state, input) {
        if(input.country_code != "-"){
          var country = countrySC.find(function(item){
              if(item.numeric_code === input.country_code){
                return item;
              }})
          
          state.countryFullName = country.name
          if(input.states_code != "-" ){
            var states = country.states.find(function(item){
              if(item.state_code === input.states_code){
                return item;
              }})
            state.stateFullName = states.name
          }
          else{
            state.stateFullName = "-"
          }
          localStorage.setItem(`${process.env.VUE_APP_API_URL}_CSC`, JSON.stringify({"country":state.countryFullName,"states":state.stateFullName}));
        }
      },
    }
}