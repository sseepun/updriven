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
    onAdd({ commit }) {
      commit("fetchTempSponsor", new TempSponsor());
    },
    onEdit({ commit, state }, index) {
      commit("fetchTempSponsor", state.sponsored[index]);
    },
    async submitDelete({ commit, state }, index) {
      const deleteSponsor = await sponsorService.deleteAds(
        Sponsor.requestFormat(state.tempSponsor)
      );
      commit("deleteSponsor", index);
    },
    async submitEdit({ commit, state }, index) {
      const editSponsor = await sponsorService.editAds(
        Sponsor.requestFormat(state.tempSponsor)
      );
      commit("fetchSponsor", index);
    },
    async submitAdd({ commit, state }) {
      const addSponsor = await sponsorService.addAds(
        Sponsor.requestFormat(state.tempSponsor)
      );
      commit("addSponsor");
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
    addSponsor(state) {
      state.sponsored[state.sponsored.length] = { ...state.tempSponsor };
    },
    deleteSponsor(state, index) {
      delete state.sponsored[index];
    },
  },
};
