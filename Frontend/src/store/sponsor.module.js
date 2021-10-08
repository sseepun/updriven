import Sponsor, { TempSponsor } from "../models/sponsor";

const tempSponsor = new TempSponsor();
const sponsored = [];
for (let i = 0; i < 3; i++) {
  sponsored.push(
    new Sponsor("#", `/assets/img/content/0${i + 1}.jpg`, "JOIN US")
  );
}

export const sponsor = {
  namespaced: true,
  state: { sponsored, tempSponsor },
  getters: {
    sponsored: (state) => state.sponsored,
    tempSponsor: (state) => state.tempSponsor
  },
  actions: {
    onEdit({ commit }, index) {
      commit("fetchTempSponsor", sponsored[index]);
    },
    submitEdit({ commit }, index) {
        commit("fetchSponsor", index);
      }
  },
  mutations: {
    fetchTempSponsor(state, input) {
      state.tempSponsor = {...input};
    },
    fetchSponsor(state, index) {
        state.sponsored[index] = {...state.tempSponsor};
      },
  },
};
