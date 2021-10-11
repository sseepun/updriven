const axios = require('axios');
import { authHeader } from '../helpers/authHeader';

export const profileService = {
    fetchInfoProfile,
    getFollowing,
    getImageService
    
}

function fetchInfoProfile(userId) {
    console.log( 'userId :', userId)

    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: `user/profile/${userId}`,
            withCredentials: true,
        })
        .then(res => {
            resolve(res.data[0]);
        })
        .catch(err => {
            reject(err);
        });
    });
}


function getFollowing(input) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: `/user/following_list`,
        data: input,
        headers: authHeader()
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
  }
  function getImageService(input) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: `/user/image_list`,
        data: input,
        headers: authHeader()
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
  }