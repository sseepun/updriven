import { setCookieBeforeAuth } from '../helpers/authHeader';
import Cookie from 'js-cookie';
const axios = require('axios');

export const postService = {
    createPost,
    fetchPost_Owner,
    fetchComment
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
          console.log('res', res)
          resolve(res.data);
        })
        .catch(err => {
          console.log('err', err)
          reject(err);
        });
    });
}

function fetchPost_Owner(next_previous) {
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
      resolve(res.data);
    })
    .catch(err => {
      reject(err);
    });
  });
}