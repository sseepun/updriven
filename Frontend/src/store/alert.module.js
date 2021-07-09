export const alert = {
    namespaced: true,
    state: {
        alert: { type: null, message: null }
    },
    getters: {
        alert: state => state.alert
    },
    actions: {
        assign({ commit }, input) {
            commit('fetchAlert', input)
        },
        clear({ commit }) {
            commit('fetchAlert', { type: null, message: null })
        }
    },
    mutations: {
        fetchAlert(state, input) {
            state.alert = { type: input.type, message: input.message }
        },
    }
}