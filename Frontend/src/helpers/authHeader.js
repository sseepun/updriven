import Cookie from 'js-cookie';

export function authHeader() {
  let member = JSON.parse(localStorage.getItem(`${process.env.VUE_APP_API_URL}_MEMBER`));
  if (member && member.access_token) {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + member.access_token
    };
  } else {
    return { 'Content-Type': 'application/json' };
  }
}

export function authHeaderFormData() {
  let member = JSON.parse(localStorage.getItem(`${process.env.VUE_APP_API_URL}_MEMBER`));
  if (member && member.access_token) {
    return {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + member.access_token
    };
  } else {
    return { 'Content-Type': 'application/json' };
  }
}
  
export function setCookieBeforeAuth() {
  Cookie.set('UPDRIVEN_2020_session', 'eyJwYXNzcG9ydCI6eyJ1c2VyIjoiaGVoZUBoZS5oZWEifX0=')
  Cookie.set('UPDRIVEN_2020_session.sig', 'pkuqH8ASv8xHzxS47RgTdN0pDzw')
}