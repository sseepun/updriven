import { setCookieBeforeAuth } from '../helpers/authHeader';
import Cookie from 'js-cookie';
import { authHeader } from '../helpers/authHeader';
const axios = require('axios');

// import httpClient from "@/services/httpClient";
// import { server } from "@/services/constants";

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
    return new Promise((resolve, reject) => {
      axios({
          method: 'POST',
          url: 'post/create',
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
    return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: `post/delete`,
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
    return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: `post/sentiment`,
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
    return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: `post/remove_sentiment`,
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
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `user/post`,
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

  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `feed/post`,
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
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `feed/comment`,
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
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `post/comment`,
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
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `post/share`,
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
    axios({
      methods: 'POST',
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
  console.log( 'option :', option )

  return new Promise((resolve, reject) => {
    axios({
      methods: 'POST',
      url: `feed/search`,
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