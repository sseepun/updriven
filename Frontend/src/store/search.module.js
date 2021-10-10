import { postService } from '../services/index';
import {
    StatusPost,
} from "../models/post";
const axios = require('axios');

const initial_StatusPost = new StatusPost("", "", false, false);
export const search = {
    namespaced: true,
    state: {
        StatusPost: initial_StatusPost,
        input: '',
        keyword: '',
        careers: []
    },
    getters: {

    },
    actions: {
        async searchPost( {state, dispatch, commit } ) {

            const newOption = {
                search : 'hi',
            };

            var promise = await new Promise((resolve, reject) => {
                postService.search( newOption )
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
            });

            console.log( 'results :', promise );
        }
    },
    mutations: {
        updateInput( state, input ) {
            state.input = input
        },

        updateKeyword( state, input ) {
            state.keyword = input
        },

        updateCareer( state, input ) {
            state.careers = [...state.state.careers, input]
        }
    }
}