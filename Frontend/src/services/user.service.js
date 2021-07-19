const axios = require('axios');
import { authHeader } from '../helpers/authHeader';

export  const userService = {
  getAllNotify,
  editProfile,
  getProfile,
  clear_notify,
  editPictureProfile,
  editBackgroundProfile,
  
};

function editPictureProfile(input) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `user/edit_profile_image`,
      data: input,
      withCredentials: true,
    })
    .then(res => {
      console.log('res')
      resolve(res.data);
    })
    .catch(err => {
      console.log('err',err)
      reject(err);
    });
});
}

function editBackgroundProfile(input) {
  console.log("BG")
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `user/edit_background_image`,
      data: input,
      withCredentials: true,
    })
    .then(res => {
      console.log('res')
      resolve(res.data);
    })
    .catch(err => {
      console.log('err',err)
      reject(err);
    });
});
}
function editProfile(input) {
  console.log('service'+input)
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `user/edit_info`,
      data: input,
      withCredentials: true,
      
    })
    .then(res => {
      console.log('res')
      resolve(res);
    })
    .catch(err => {
      console.log('err',err)
      reject(err);
    });
});
}

function getProfile(input) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `auth/status`,
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

function getAllNotify() {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `/user/notification`,
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

function clear_notify(input) {
  console.log(input)
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `/user/clear_notification`,
      data: input,
    })
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    });
});
}