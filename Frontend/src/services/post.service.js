import { setCookieBeforeAuth } from '../helpers/authHeader';
import Cookie from 'js-cookie';
const axios = require('axios');

export const post = {
    createPost
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