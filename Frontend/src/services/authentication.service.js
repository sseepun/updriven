import { setCookieBeforeAuth } from '../helpers/authHeader';
import Cookie from 'js-cookie';
const axios = require('axios');

export const authenService = {
    signin,
    signFacebook,
    signGoogle,
    register
}

function signin(authen, password) {
    setCookieBeforeAuth(); 

    return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: `auth/login`,
          data: {
            username: authen,
            password: password
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

function signFacebook() {
    setCookieBeforeAuth(); 

    return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `auth/facebook`
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
}

function signGoogle() {
    setCookieBeforeAuth(); 

    return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `auth/google`
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
}

function register(user) {

  return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: `auth/signup`,
        data: {
          firstname : user.firstname,
          lastname : user.lastname,
          password : user.password,
          email : user.email,
        },
        withCredentials: true,
      })
      .then(res => {
        console.log("success in service")
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}