import { postService } from '../services/index';
import { Paginate } from "../models/paginate";
import { changeStructurePost } from "../models/post"

const initialPaginate = new Paginate("", "", false, false);
export const search = {
    namespaced: true,
    state: {
        StatusPaginate: initialPaginate,
        loading: false,
        sentance: '',
        keyword: '',
        careers: '',
        searchResult: []
    },
    getters: {
        getSearchSentance: (state) => state.sentance,
        getSearchKeyword: (state) => state.keyword,
        getSearchcareers: (state) => state.careers,
        getSearchResult: (state) => state.searchResult,
        getStatusPaginate: (state) => state.StatusPaginate,

        isLoading: (state) => state.loading,
    },
    actions: {
        async searchPost( {state, dispatch, commit } ) {
            await commit("updateStatusLoading", true);
            console.log('uses search function')
            try {
                const newOption = await dispatch("checkPaginate");
                const response = await postService.search( newOption );
                await commit('updateStatusPaginate', response.data )

                if ( response.data.results.length ) {
                    const listPost = await changeStructurePost( response.data.results );
                    await commit('updateSearchResult', listPost )
                }
                
                await commit("updateStatusLoading", false);
            } catch (err) {
                console.log('err :', err)
                await commit("updateStatusLoading", false);
            }
        },

        checkPaginate({ state, commit, rootGetters }, option={}) {

            if ( state.sentance ) option.search = state.sentance
            if ( state.StatusPaginate.hasNext === true ) option.next = state.StatusPaginate.nextID
            if ( rootGetters["post/getCateerTitle"] !== null) {
                option.category = rootGetters["post/getCateerTitle"]
                commit("updateCareer", rootGetters["post/getCateerTitle"])
            }

            return option
        },
    },
    mutations: {
        updateSentance: (state, sentance) => state.sentance = sentance,
        updateKeyword: (state, input) => state.keyword = input,
        updateCareer: (state, input) => state.careers = input,
        updateStatusPaginate: (state, response) => state.StatusPaginate = new Paginate( response.hasNext, response.hasPrevious, response.next, response.previous ),
        updateSearchResult: (state, results) => state.searchResult = state.searchResult.concat(results),
        updateStatusLoading: (state, statusLoading) => state.loading = statusLoading,
        
        clearResult: (state) => state.searchResult = [],
        clearStatusPaginate: (state) => state.StatusPaginate = initialPaginate
    }
}