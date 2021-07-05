import { checkCookie } from '../helpers/authHeader';
import { StatusPost, changeStructurePost } from '../models/post';
import { postService } from '../services';

const initial_StatusPost = new StatusPost('', '', false, false);

export const post = {
    namespaced: true,
    state: {
        StatusPost: initial_StatusPost,
        Post: [],
        loading: false
    },
    getters: {
        getPost: state => state.Post,
        getStatusPost: state => state.StatusPost,
        getLoading: state => state.loading
    },
    actions: {
        async fetchPost_Owner({ state, commit }) {
            await commit('updateStatusLoading', true)
            return await new Promise((resolve, reject) => {
                postService.fetchPost_Owner(state.StatusPost)
                .then( res => {
                    const statusPost = new StatusPost(res.hasNext, res.hasPrevious, res.next, res.previous);
                    commit('updateStatusPost', statusPost)
                    const posts = changeStructurePost(res.results);
                    commit('updatePost', posts)
                    commit('updateStatusLoading', false)
                    resolve(res)
                })
                .catch( err => {
                    commit('updateStatusLoading', false)
                    reject(err)
                })
            })
        }
    },
    mutations: {
        updatePost(state, newPosts) {
            state.Post = state.Post.concat(newPosts);
        },

        updateStatusPost(state, newStatus) {
            state.StatusPost = newStatus
        },

        updateStatusLoading(state, statusLoading) {
            state.loading = statusLoading
        }
    }
}