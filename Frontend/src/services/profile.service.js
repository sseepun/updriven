const axios = require('axios');
import { authHeader } from '../helpers/authHeader';
import httpClient from "./httpClient";
import { server } from './constants';

export const profileService = {
    fetchInfoProfile,
    getFollowing,
    getImageService
    
}

function fetchInfoProfile(userId) {
  const Axiosmodel = server.FETCH_USER_INFORMATION;
  // console.log( 'userId :', userId)

  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: `${Axiosmodel.url}/${userId}`,
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
function getImageService(input) {
  const Axiosmodel = server.FETCH_IMAGE_LIST;
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