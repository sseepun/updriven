import { setCookieBeforeAuth } from '../helpers/authHeader';
import Cookie from 'js-cookie';
const axios = require('axios');

export const authenService = {
    signin,
    signFacebook,
    signGoogle,
    register,
    verify,
    verifyEmailRegister,
    forgetPasswordSentEmail,
    resetPassword,
    checkTokenResetPassword,
    logout
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
          console.log('response: ',res)
          resolve(res.data);
        })
        .catch(err => {
          console.log('error: ',err)
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
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function checkTokenResetPassword(token) {
    return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `auth/reset/${token}`,
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

function resetPassword(input) {
    return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: `auth/reset/`,
          data: {
            token: input.token,
            password: input.password
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

function verify(id) {
    return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `/auth/success/${id}`
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
}

function logout() {
    return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `/auth/logout`
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
}

function verifyEmailRegister(token) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `auth/verify/${token}`
    })
    .then(res => {
      resolve(res.data);
    })
    .catch(err => {
      reject(err);
    });
});
}

function forgetPasswordSentEmail(email) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `auth/forgot/${email}`
    })
    .then(res => {
      console.log(res.data)
      resolve(res.data);
    })
    .catch(err => {
      reject(err);
    });
});
}
