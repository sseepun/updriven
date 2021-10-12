import { authHeader } from '../helpers/authHeader';
const axios = require('axios');
import httpClient from "./httpClient";
import { server } from './constants';

export const postService = {
    createPost,
    fetchPost,
    fetchComment,
    deletePost,
    sentiment,
    rm_sentiment,
    commentOrReply,
    fetchFeed,
    search,
    sharePost,
    previewLink
}

function createPost(postDetail) {
  const Axiosmodel = server.CREATE_POST;

  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
      data: postDetail,
      withCredentials: true,
    })
    .then(res => {
      resolve(res.data);
    })
    .catch(err => {
      reject(err);
    });
  });
}

function deletePost(id) {
  const Axiosmodel = server.DELETE_POST;
  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
      data: {
        post_id: id
      },
      withCredentials: true,
    })
    .then(res => {
      resolve(res.data);
    })
    .catch(err => {
      reject(err);
    });
  });
}

function sentiment(detail) {
  const Axiosmodel = server.SENTIMENT_POST;
  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
      data: detail,
      withCredentials: true,
    })
    .then(res => {
      resolve(res.data);
    })
    .catch(err => {
      reject(err);
    });
  });
}

function rm_sentiment(detail) {
  const Axiosmodel = server.REMOVE_SENTIMENT_POST;
  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
      data: detail,
      withCredentials: true,
    })
    .then(res => {
      resolve(res.data);
    })
    .catch(err => {
      reject(err);
    });
  });
}

function fetchPost(options) {
  const Axiosmodel = server.FETCH_POST;

  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
      data: options,
      withCredentials: true,
    })
    .then(res => {
      resolve(res.data);
    })
    .catch(err => {
      reject(err);
    });
  })
}

function fetchFeed(options) {
  const Axiosmodel = server.FETCH_FEED;
  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
      data: options,
      withCredentials: true,
      headers: authHeader()
    })
    .then(res => {
      resolve(res.data);
    })
    .catch(err => {
      reject(err);
    });
  })
}

function fetchComment(postID) {
  const Axiosmodel = server.FETCH_COMMENT;
  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
      data: {
        post_id: postID,
      },
      withCredentials: true,
    })
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    });
  });
}

function commentOrReply(detail) {
  const Axiosmodel = server.COMMENT_OR_REPLY_POST;
  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
      data: {
        post_id: detail.postID,
        comment: detail.comment,
        parent_comment: detail.parentCommentID,
        depth: detail.depth,
      },
      withCredentials: true,
    })
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    });
  });
}

function sharePost(post_id) {
  const Axiosmodel = server.SHARE_POST;

  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
      data: {
        post_id: post_id
      },
      withCredentials: true,
    })
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    });
  });
}

function previewLink(link) {

  return new Promise((resolve, reject) => {
    httpClient({
      method: 'POST',
      url: 'http://api.linkpreview.net/?key=' + process.env.VUE_APP_KEY_LINKPREVIEW + '&q=' + link,
      header: {
        'Content-Type': 'application/json',
      },
      withCredentials: false,
    })
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    });
  });
}

function search( option ) {
  const Axiosmodel = server.SEARCH;
  // console.log( 'option :', option )

  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
      data: option,
      withCredentials: true,
    })
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    });
  });
}