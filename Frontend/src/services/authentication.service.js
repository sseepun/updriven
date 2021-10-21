import { setCookieBeforeAuth } from '../helpers/authHeader';
import httpClient from "./httpClient";
import { server } from './constants';

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
  const Axiosmodel = server.SIGN_IN;
  setCookieBeforeAuth(); 

  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
      data: {
        username: authen,
        password: password
      },
      withCredentials: true,
    })
    .then(res => {
      // console.log( 'sign-in :', res)
      resolve(res.data);
    })
    .catch(err => {
      reject(err);
    });
  });
}

function signFacebook() {
  const Axiosmodel = server.SIGN_FACEBOOK;
  setCookieBeforeAuth(); 

  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
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
  const Axiosmodel = server.SIGN_GOOGLE;
  setCookieBeforeAuth(); 

  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
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
  const Axiosmodel = server.REGISTER;

  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
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
  const Axiosmodel = server.CHECK_TOKEN_RESET_PASSWORD;
  
  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: `${Axiosmodel.url}/${token}`,
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
  const Axiosmodel = server.RESET_PASSWORD;

  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
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
  const Axiosmodel = server.CHECK_AUTH;
  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: `${Axiosmodel.url}/${id}`
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
  const Axiosmodel = server.SIGN_OUT;
  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
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
  const Axiosmodel = server.VERIFY_EMAIL_REGISTER;
  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: `${Axiosmodel.url}/${token}`
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
  const Axiosmodel = server.FORGET_PASSWORD_SENT_ENAIL;
  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: `${Axiosmodel.url}/${email}`
    })
    .then(res => {
      resolve(res.data);
    })
    .catch(err => {
      reject(err);
    });
});
}
