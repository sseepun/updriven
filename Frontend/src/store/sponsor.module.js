import Sponsor, { TempSponsor } from "../models/sponsor";
import { sponsorService } from "../services";

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
    tempSponsor: (state) => state.tempSponsor,
  },

  actions: {
    async onFetch({ commit }) {
      const sponsor = await sponsorService.fetchAds();
      commit("fetchAll", Sponsor.responseFormat(sponsor));
    },
    onEdit({ commit, state }, index) {
      commit("fetchTempSponsor", state.sponsored[index]);
    },
    async submitEdit({ commit, state }, index) {
      commit("fetchSponsor", index);      
      const editSponsor = await sponsorService.editAds(Sponsor.requestFormat(state.tempSponsor));
    },
  },

  mutations: {
    fetchAll(state, input) {
      state.sponsored = { ...input };
      state.tempSponsor = new TempSponsor();
    },
    fetchTempSponsor(state, input) {
      state.tempSponsor = { ...input };
    },
    fetchSponsor(state, index) {
      state.sponsored[index] = { ...state.tempSponsor };
    },
  },
};
