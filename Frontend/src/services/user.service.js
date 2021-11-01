const axios = require('axios');
import { authHeader } from '../helpers/authHeader';
import httpClient from "./httpClient";
import { server } from './constants';

export  const userService = {
  getAllNotify,
  editProfile,
  getProfile,
  clear_notify,
  editPictureProfile,
  editBackgroundProfile,
  getFollowing,
  getOtherProfile,
  toFollow,
  toUnFollow
};

function getProfile(input) {
  const Axiosmodel = server.FETCH_OWNER_PROFILE;

  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
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

function editPictureProfile(input) {
  const Axiosmodel = server.CHANGE_PICTURE_PROFILE;

  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
      data: input,
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

function editBackgroundProfile(input) {
  const Axiosmodel = server.CHANGE_BACKGROUND_PROFILE;

  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
      data: input,
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

function editProfile(input) {
  const Axiosmodel = server.EDIT_PROFILE;

  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
      data: input,
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

function getOtherProfile(userID) {
  const Axiosmodel = server.FETCH_USER_INFORMATION;

  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: `${Axiosmodel.url}/${userID}`,
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
  const Axiosmodel = server.GET_ALL_NOTIFY;

  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
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
  const Axiosmodel = server.CLEAR_ALL_NOTIFY;

  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
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

function getFollowing(input) {
  const Axiosmodel = server.FETCH_FOLLOWING_LIST;

  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
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

function toFollow(input) {
  const Axiosmodel = server.TO_FOLLOW;

  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
      data: input,
      headers: authHeader()
    })
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      // console.log( err.response )
      reject(err);
    });
});
}

function toUnFollow(input) {
  const Axiosmodel = server.TO_UN_FOLLOW;
  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
      data: input,
      headers: authHeader()
    })
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      // console.log( err.response )
      // err.message = "Interrupting post loading because of unmount."
      reject(err);
    });
});
}