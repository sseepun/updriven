// https://blog.andrewjamesbibby.com/2019/08/01/cancel-all-pending-axios-requests-in-vue-spa-on-router-change/
export const axios = {
    namespaced: true,
    state: {
        cancelTokens: [],
    },
    getters: {
        cancelTokens(state) {
            return state.cancelTokens;
        }
    },
    mutations: {
        addCancelToken(state, token) {
            state.cancelTokens.push(token);
        },
        clearCancelTokens(state) {
            state.cancelTokens = [];
        }
    },
    actions: {
        cancelPendingRequests(context) {

            // Cancel all request where a token exists
            context.state.cancelTokens.forEach((request, i) => {
                if(request.cancel){
                    request.cancel();
                }
            });

            // Reset the cancelTokens store
            context.commit('clearCancelTokens');
        }
    }
}