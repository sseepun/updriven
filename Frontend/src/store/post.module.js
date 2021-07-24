import { checkCookie } from '../helpers/authHeader';
import { StatusPost, changeStructurePost, _create, changeStructureFetchComment } from '../models/post';
import { postService } from '../services';

const initial_StatusPost = new StatusPost('', '', false, false);
const createDetail = new _create();

export const post = {
    namespaced: true,
    state: {
        StatusPost: initial_StatusPost,
        Post: [],
        _create: createDetail,
        loading: false,
        category: null,
        OwnerOrAll: null, // 0 : Dashboard, 1 : Profile
    },
    getters: {
        getPost: state => state.Post,
        _create: state => state._create,
        getStatusPost: state => state.StatusPost,
        isLoading: state => state.loading
    },
    actions: {
        /**
         * Change category post
         */
        async changeCategoryPost({ state, commit, dispatch }, newcategory) {
            state.Post = []
            state.StatusPost = initial_StatusPost;
            state.category = newcategory;
        },
        /**
         * fetch post (owner's post)
         */
        async fetchPostOwner({ state, commit, dispatch }) {
            await commit('updateStatusLoading', true)
            return await new Promise((resolve, reject) => {
                postService.fetchPostOwner(state.StatusPost)
                .then( res => {
                    // update status 
                    const statusPost = new StatusPost(res.hasNext, res.hasPrevious, res.next, res.previous);
                    commit('updateStatusPost', statusPost)

                    // fetch all post
                    const posts = changeStructurePost(res.results);
                    commit('updatePost', posts)

                    // fetch comment each postID
                    res.results.map( x => { dispatch('post/fetchComment', x._id, { root: true }) })

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
         * fetch all posts to display on dashboard page
         */
        async fetchPostAll({ state, commit, dispatch }) {
            await commit('updateStatusLoading', true)
            return await new Promise((resolve, reject) => {
                postService.fetchPostAll(state.StatusPost, state.category)
                .then( res => {

                    // update status 
                    const statusPost = new StatusPost(res.hasNext, res.hasPrevious, res.next, res.previous);
                    commit('updateStatusPost', statusPost)

                    // fetch all post
                    const posts = changeStructurePost(res.results);
                    commit('updatePost', posts)

                    // fetch comment each postID
                    res.results.map( x => { dispatch('post/fetchComment', x._id, { root: true }) })

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
         * fetch comment each post if user want to see
         */
        fetchComment({ state, commit }, postID) {  
            return new Promise((resolve, reject) => {
                postService.fetchComment(postID)
                .then( res => {
                    // let test = state.Post.findIndex(post => post.id == postID);
                    const commentPost = changeStructureFetchComment(res.data.comments, res.data.avatar);
                    state.Post[state.Post.findIndex(post => post.id == postID)].comments = commentPost;
                    state.Post[state.Post.findIndex(post => post.id == postID)].counts.comments = res.data.count;
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
            })
        },
        /**
         * comment on post or reply comment
         */
        async commentOrReply({state, dispatch}, detail) {
            console.log( detail )
            var promise = await new Promise((resolve, reject) => {
                postService.commentOrReply(detail)
                .then( res => {
                    dispatch('post/fetchComment', detail.postID , { root: true })
                    dispatch('alert/assign', { type: 'Success', message: 'Commented on post successfully.' }, { root: true })
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
            });

            return await promise
        },
        /**
         * Create post
         */
        async create({ state, commit, dispatch }) {
            var promise = await new Promise((resolve, reject) => {
                var formData = new FormData();
                formData.append("subject", state._create.subject);
                formData.append("content", state._create.content);
                formData.append("category", state._create.category);
                state._create.PVmedia.forEach(file => formData.append("media", file));
                state._create.fileMedia.forEach(file => formData.append("media", file));
                formData.append("visible_to", state._create.visible_to);
                postService.createPost(formData)
                .then( res => {
                    const post = changeStructurePost([res.post]);
                    commit('fetchCreated', post)
                    commit('clear_create')
                    dispatch('alert/assign', { type: 'Success', message: 'Post created successfully.' }, { root: true })
                    resolve(res)
                })
                .catch( err => {
                    dispatch('alert/assign', { type: 'Warning', message: err.response.data.message }, { root: true })
                    reject(err)
                })
            })
            //await dispatch('fetchPostOwner')
            return await promise
        },
        /**
         * Delete post
         */
        delete({ commit, dispatch }, id) {
            return new Promise((resolve, reject) => {
                postService.deletePost(id)
                .then( res => {
                    commit('clearDeleted', id)
                    dispatch('alert/assign', { type: 'Success', message: 'Post deleted successfully.' }, { root: true })
                    resolve(res)
                })
                .catch( err => {
                    dispatch('alert/assign', { type: 'Warning', message: err.response.data.message }, { root: true })
                    reject(err)
                })
            })
        },
        sentiment({ dispatch }, detail) {
            return new Promise((resolve, reject) => {
                postService.sentiment(detail)
                .then( res => {
                    //dispatch('alert/assign', { type: 'Success', message: res.message }, { root: true })
                    resolve(res)
                }, err => {
                    dispatch('alert/assign', { type: 'Warning', message: err.response.data.message }, { root: true })
                    resolve(err)
                })
                .catch( err => {
                    dispatch('alert/assign', { type: 'Danger', message: 'System error.' }, { root: true })
                    reject(err)
                })
            }) 
            
        },
        rm_sentiment({ dispatch, commit }, detail) {
            return new Promise((resolve, reject) => {
                postService.rm_sentiment(detail)
                .then( res => {
                    dispatch('alert/assign', { type: 'Success', message: res.message }, { root: true })
                    resolve(res)
                }, err => {
                    dispatch('alert/assign', { type: 'Warning', message: err.response.data.message }, { root: true })
                    resolve(err)
                })
                .catch( err => {
                    dispatch('alert/assign', { type: 'Danger', message: 'System error.' }, { root: true })
                    reject(err)
                })
            })
        },
        sharePost({ dispatch, commit }, post_id) {
            return new Promise((resolve, reject) => {
                postService.sharePost(post_id)
                .then( res => {
                    const post = changeStructurePost([res.data]);
                    commit('fetchCreated', post)
                    dispatch('alert/assign', { type: 'Success', message: 'Post shared successfully.' }, { root: true })
                    resolve(res)
                }, err => {
                    dispatch('alert/assign', { type: 'Warning', message: err.response.data.message }, { root: true })
                    resolve(err)
                })
                .catch( err => {
                    dispatch('alert/assign', { type: 'Danger', message: 'System error.' }, { root: true })
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
            while ( state.loading == true ) {
                
            }
            state.Post = []
            state.StatusPost = initial_StatusPost;
            state.category = null;
        },

        clear_create(state) {
            state._create = new _create();
        },
        clearDeleted(state, id) {
            var i = 0;
            while (i < state.Post.length) {
                if (state.Post[i].id == id) {
                    state.Post.splice(i, 1);
                } else {
                    ++i;
                }
            }
        },
        fetchCreated(state, newPost) {
            state.Post = newPost.concat(state.Post)
        },
    }
}