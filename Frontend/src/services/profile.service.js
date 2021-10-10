const axios = require('axios');
import { authHeader } from '../helpers/authHeader';

export const profileService = {
    fetchInfoProfile
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