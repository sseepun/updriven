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
            // console.log( 'token :', token )
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
                // console.log( request )
                if ( request.config.url === 'user/follow' || request.config.url === 'user/unfollow' ) {
                    
                }
                else if(request.source.cancel){
                    request.source.cancel();
                }
            });

            // Reset the cancelTokens store
            context.commit('clearCancelTokens');
        }
    }
}