import { checkCookie } from '../helpers/authHeader';
import { StatusPost, changeStructurePost, _create, changeStructureComment } from '../models/post';
import { postService } from '../services';

const initial_StatusPost = new StatusPost('', '', false, false);
const createDetail = new _create();

export const post = {
    namespaced: true,
    state: {
        StatusPost: initial_StatusPost,
        Post: [],
        _create: createDetail,
        loading: false
    },
    getters: {
        getPost: state => state.Post,
        _create: state => state._create,
        getStatusPost: state => state.StatusPost,
        isLoading: state => state.loading
    },
    actions: {
        /**
         * fetch post (owner's post)
         */
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
        },
        /**
         * Create post
         */
        create({ state, commit }) {
            return new Promise((resolve, reject) => {
                var formData = new FormData();
                formData.append("subject", state._create.subject);
                formData.append("content", state._create.content);
                formData.append("category", state._create.category);
                state._create.PVmedia.forEach(file => formData.append("media", file));
                state._create.fileMedia.forEach(file => formData.append("media", file));
                formData.append("visible_to", state._create.visible_to);
                postService.createPost(formData)
                .then( res => {
                    commit('clear_create')
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
            })
        },
        /**
         * fetch comment each post if user want to see
         */
        fetchComment({ state, commit }, postID) {
            return new Promise((resolve, reject) => {
                postService.fetchComment(postID)
                .then( res => {
                    // let test = state.Post.findIndex(post => post.id == postID);
                    console.log(res)
                    changeStructureComment(res.data.comments)
                    // state.Post[state.Post.findIndex(post => post.id == postID)].comments
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
            })
        }
    },
    mutations: {
        updatePost(state, newPosts) {
            state.Post = state.Post.concat(newPosts)
            // state.Post = [...state.Post, ...newPosts];
        },

        updateStatusPost(state, newStatus) {
            state.StatusPost = newStatus
        },

        updateStatusLoading(state, statusLoading) {
            state.loading = statusLoading
        },

        clearPost(state) {
            state.Post = []
        },

        clear_create(state) {
            state._create = new _create();
        }
    }
}