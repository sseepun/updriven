import { setCookieBeforeAuth } from '../helpers/authHeader';
import Cookie from 'js-cookie';
const axios = require('axios');

export const postService = {
    createPost,
    fetchPostOwner,
    fetchComment,
    deletePost,
    sentiment,
    rm_sentiment,
    commentOrReply,
    fetchPostAll,
    sharePost,
    previewLink
}

function createPost(postDetail) {
    return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: `post/create`,
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

function fetchPostOwner(next_previous) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `user/post`,
      data: {
        next: (next_previous.hasNext == true? next_previous.nextID: ''),
        // previous: (next_previous.hasPrevious? '': '')
      },
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

function fetchPostAll(next_previous, category) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `feed/post`,
      data: {
        next: (next_previous.hasNext == true? next_previous.nextID: ''),
        // previous: (next_previous.hasPrevious? '': ''),
        category: category
      },
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
  axios({
    methods: 'POST',
    url: 'http://api.linkpreview.net/?key=' + process.env.VUE_APP_KEY_LINKPREVIEW + '&q=' + link,
    header: {
      'Content-Type': 'application/json',
    }
  })
  .then( (data) => {
    console.log( data )
  })
}