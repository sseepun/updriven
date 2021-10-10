import User from '../models/user.js';
import { profileService, postService } from '../services/index';
import { post } from './post.module.js';

const user = new User()

export const profile = {
    namespaced: true,
    state: {
        userInfo: user,
    },
    getters: {
        information: state => state.userInfo,
    },
    actions: {
        async fetchInfo( {dispatch, commit, rootGetters}, { userId } ) {
            const OwnerUser = rootGetters['authentication/user']
            console.log( OwnerUser.id, userId)
            if ( (OwnerUser.id !== userId) && userId ) {
                console.log('user id not match with id param')
                const userInfo = await profileService.fetchInfoProfile(userId);
                console.log( 'userInfo :', userInfo)
                await commit("createUserInfo", userInfo);
            } else {
                console.log('user id match with id param');
                await commit("temporaryCreateOwnerUserInfo", OwnerUser);
            }
        }
    },
    mutations: {
        createUserInfo( state, userInfo ) {
            state.userInfo = new User(
                userInfo.username[0],
                userInfo.firstname,
                userInfo.lastname,
                userInfo.profile_pic,
                userInfo.background_pic,
                userInfo.state_id,
                userInfo.province,
                null,
                userInfo.organization,
                userInfo.interests,
                userInfo.country_id,
                userInfo.about_us,
            )
        },

        temporaryCreateOwnerUserInfo( state, userInfo ) {
            state.userInfo = new User(
                userInfo.id,
                userInfo.firstname,
                userInfo.lastname,
                userInfo.avatar,
                userInfo.background,
                userInfo.state_id,
                userInfo.province,
                userInfo.email,
                userInfo.organization,
                userInfo.interests,
                userInfo.country_id,
                userInfo.about_us,
                userInfo.followings,
                userInfo.images
            )
        }
    }
}