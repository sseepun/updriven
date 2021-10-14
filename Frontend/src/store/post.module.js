import { checkCookie } from "../helpers/authHeader";
import {
    changeStructurePost,
    _create,
    changeStructureFetchComment,
} from "../models/post";
import { Paginate } from "../models/paginate";
import { postService } from "../services";

const initial_StatusPost = new Paginate("", "", false, false);
const createDetail = new _create();

export const post = {
    namespaced: true,
    state: {
        StatusPost: initial_StatusPost,
        Post: [],
        isDashboard: 0, // 0 = Profile, 1 = dashboard
        haveFilter: 0, // 0 = Not fillter, 1 = Fillter
        _create: createDetail,
        loading: false,
        category: null,
    },
    getters: {
        getPost: (state) => state.Post,
        _create: (state) => state._create,
        getStatusPost: (state) => state.StatusPost,
        isLoading: (state) => state.loading,
        isDashboard: (state) => state.isDashboard, 
        haveFilter: (state) => state.haveFilter,
    },
    actions: {
        /**
         * Change category post
         */
        async changeCategoryPost({ state, commit, dispatch }, newcategory) {
            state.Post = [];
            state.StatusPost = initial_StatusPost;
            state.category = newcategory;
            commit("changeStatusFilter", 1)
        },
        /**
         * fetch all posts to display on dashboard page
         */
        async getFeed({ state, commit, dispatch }, option) {
            await commit("updateStatusLoading", true);

            const newOption = await dispatch("addStatusPostToOption", option)

            return await new Promise((resolve, reject) => {
                postService.fetchFeed(newOption)
                .then(async (res) => {
                    // update status
                    const statusPost = await new Paginate(
                        res.hasNext,
                        res.hasPrevious,
                        res.next,
                        res.previous
                    );
                    await commit("updateStatusPost", statusPost);

                    // fetch all post
                    const posts = await changeStructurePost(res.results);
                    await commit("updatePost", posts);

                    // fetch comment each postID
                    await res.results.map((x) => {
                        dispatch("post/fetchComment", x._id, { root: true });
                    });

                    await commit("updateStatusLoading", false);
                    resolve(res);
                })
                .catch((err) => {
                    commit("updateStatusLoading", false);
                    reject(err);
                });
            });
        },
        /**
         * get post with user id param
         */
        async getPost({ state, commit, dispatch }, option) {
            await commit("updateStatusLoading", true);

            const newOption = await dispatch("addStatusPostToOption", option)

            return await new Promise((resolve, reject) => {
                postService.fetchPost(newOption)
                .then(async (res) => {
                    // update status
                    const statusPost = await new Paginate(
                        res.hasNext,
                        res.hasPrevious,
                        res.next,
                        res.previous
                    );
                    await commit("updateStatusPost", statusPost);

                    // fetch all post
                    const posts = await changeStructurePost(res.results);
                    await commit("updatePost", posts);

                    // fetch comment each postID
                    await res.results.map((x) => {
                        dispatch("post/fetchComment", x._id, { root: true });
                    });

                    await commit("updateStatusLoading", false);
                    resolve(res);
                })
                .catch((err) => {
                    commit("updateStatusLoading", false);
                    reject(err);
                });
            });
        },
        /**
         * fetch comment each post if user want to see
         */
        fetchComment({ state, commit }, postID) {
            return new Promise((resolve, reject) => {
                postService.fetchComment(postID)
                .then((res) => {
                    // let test = state.Post.findIndex(post => post.id == postID);
                    const commentPost = changeStructureFetchComment(
                        res.data.comments,
                        res.data.avatar
                    );
                    state.Post[ state.Post.findIndex((post) => post.id == postID) ].comments = commentPost;
                    state.Post[ state.Post.findIndex((post) => post.id == postID) ].counts.comments = res.data.count;
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
            });
        },
        /**
         * comment on post or reply comment
         */
        async commentOrReply({ state, dispatch }, detail) {
            console.log(detail);
            var promise = await new Promise((resolve, reject) => {
                postService.commentOrReply(detail)
                .then((res) => {
                    dispatch("post/fetchComment", detail.postID, { root: true });
                    dispatch(
                        "alert/assign",
                        { type: "Success", message: "Commented on post successfully." },
                        { root: true }
                    );
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
            });

            return await promise;
        },
        /**
         * Create post
         */
        async create({ state, commit, dispatch }) {
            var formData = new FormData();
            formData.append("subject", state._create.subject);
            formData.append("content", state._create.content);
            formData.append("category", state._create.category);
            state._create.PVmedia.forEach((file) => formData.append("media", file));
            state._create.fileMedia.forEach((file) => formData.append("media", file));
            formData.append("visible_to", state._create.visible_to);
            var promise = await new Promise((resolve, reject) => {
                postService.createPost(formData)
                .then(async (res) => {
                    const post = await changeStructurePost([res.post]);
                    commit("fetchCreated", post);
                    commit("clear_create");
                    dispatch(
                        "alert/assign",
                        { type: "Success", message: "Post created successfully." },
                        { root: true }
                    );
                    resolve(res);
                })
                .catch((err) => {
                    dispatch(
                        "alert/assign",
                        { type: "Warning", message: err },
                        { root: true }
                    );
                    reject(err);
                });
            });
            return await promise;
        },
        /**
         * Delete post
         */
        delete({ commit, dispatch }, id) {
            return new Promise((resolve, reject) => {
                postService.deletePost(id)
                .then((res) => {
                    commit("clearDeleted", id);
                    dispatch(
                        "alert/assign",
                        { type: "Success", message: "Post deleted successfully." },
                        { root: true }
                    );
                    resolve(res);
                })
                .catch((err) => {
                    dispatch(
                        "alert/assign",
                        { type: "Warning", message: err.response.data.message },
                        { root: true }
                    );
                    reject(err);
                });
            });
        },
        sentiment({ dispatch }, detail) {
            return new Promise((resolve, reject) => {
                postService.sentiment(detail)
                .then(
                    (res) => {
                    //dispatch('alert/assign', { type: 'Success', message: res.message }, { root: true })
                        resolve(res);
                    },
                    (err) => {
                        dispatch(
                            "alert/assign",
                            { type: "Warning", message: err.response.data.message },
                            { root: true }
                        );
                        resolve(err);
                    }
                )
                .catch((err) => {
                    dispatch(
                        "alert/assign",
                        { type: "Danger", message: "System error." },
                        { root: true }
                    );
                    reject(err);
                });
            });
        },
        rm_sentiment({ dispatch, commit }, detail) {
            return new Promise((resolve, reject) => {
                postService.rm_sentiment(detail)
                .then(
                    (res) => {
                        dispatch(
                            "alert/assign",
                            { type: "Success", message: res.message },
                            { root: true }
                        );
                        resolve(res);
                    },
                    (err) => {
                        dispatch(
                            "alert/assign",
                            { type: "Warning", message: err.response.data.message },
                            { root: true }
                        );
                        resolve(err);
                    }
                )
                .catch((err) => {
                    dispatch(
                        "alert/assign",
                        { type: "Danger", message: "System error." },
                        { root: true }
                    );
                    reject(err);
                });
            });
        },
        sharePost({ dispatch, commit }, post_id) {
            return new Promise((resolve, reject) => {
                postService.sharePost(post_id)
                .then(
                    (res) => {
                        const post = changeStructurePost([res.data]);
                        commit("fetchCreated", post);
                        dispatch(
                            "alert/assign",
                            { type: "Success", message: "Post shared successfully." },
                            { root: true }
                        );
                        resolve(res);
                    },
                    (err) => {
                        dispatch(
                            "alert/assign",
                            { type: "Warning", message: err.response.data.message },
                            { root: true }
                        );
                        resolve(err);
                    }
                )
                .catch((err) => {
                    dispatch(
                        "alert/assign",
                        { type: "Danger", message: "System error." },
                        { root: true }
                    );
                    reject(err);
                });
            });
        },
        async clearPost({ state, commit }) {
            state.Post = await [];
            state.StatusPost = await initial_StatusPost;
            state.category = await null;
            await commit("changeOptionType", 0);
            await commit("changeStatusFilter", 0);
        },

        addStatusPostToOption({ state }, option={}) {
            console.log( 'old option :', option)

            if ( state.StatusPost.hasNext === true ) option.next = state.StatusPost.nextID
            // if ( state.category !== null ) option.category = state.category

            console.log( 'new option :', option)

            return option
        },

        searchPost({state}, option={}) {
            console.log( 'Input :', option );
        }
    },
    mutations: {
        changeOptionType(state, newStatus) {
            console.log( 'changeOptionType :', newStatus )
            state.isDashboard = newStatus;
        },

        changeStatusFilter(state, newStatus) {
            state.haveFilter = newStatus;
        },

        updatePost(state, newPosts) {
            state.Post = state.Post.concat(newPosts);
            // state.Post = [...state.Post, ...newPosts];
        },

        updateStatusPost(state, newStatus) {
            state.StatusPost = newStatus;
        },

        updateStatusLoading(state, statusLoading) {
            state.loading = statusLoading;
        },

        updateCareers( state, input ) {
            state.category = input;
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
            state.Post = newPost.concat(state.Post);
        },
    },
};
