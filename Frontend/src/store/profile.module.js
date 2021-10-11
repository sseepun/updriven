import User from '../models/user.js';
import { profileService, postService } from '../services/index';
import { post } from './post.module.js';
import countrySC from '../assets/country-state-city'

const user = JSON.parse(localStorage.getItem(`${process.env.VUE_APP_API_URL}_PROFILE`));
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
        },

        async getImages({ commit , dispatch }, {userId}) {
            var formData = new FormData();
            formData.append( 'userID' , userId);
            const response = await profileService.getImageService(formData)
            let images = response.data.results
            if(images.length > 0){
            for (let i = 0; i < images.length; i++) { 
                let pathList = images[i].path.split('/')
                const lastIndex = pathList.pop(pathList.length-1)
                const hostPath =  pathList.join('/')+"/"
                images[i].hostPath = hostPath
                images[i].name = lastIndex
                images[i].id = i
                images[i].image = images[i].path
            }
            }
            commit('setImages', images);
        },

        getFollowing({ commit , dispatch }, {userId}) {
            return new Promise((resolve, reject) => {    
                var formData = new FormData();
                formData.append( 'userID' , userId);
                profileService.getFollowing(formData).then(
                        response => {
                        
                        let myFollowings = response.data.results
                        for (let i = 0; i < myFollowings.length; i++) { 
                            if(myFollowings[i].follow.user_detail[0].country_id != "-"){
                            var country = countrySC.find(function(item){
                                if(item.numeric_code === myFollowings[i].follow.user_detail[0].country_id){
                                    return item;
                                }})
                            myFollowings[i].follow.user_detail[0].countryFullName = country.name
                            if(myFollowings[i].follow.user_detail[0].state_id != "-" ){
                                var states = country.states.find(function(item){
                                if(item.state_code === myFollowings[i].follow.user_detail[0].state_id){
                                    return item;
                                }})
                                myFollowings[i].follow.user_detail[0].stateFullName = states.name
                            }
                            else{
                                myFollowings[i].follow.user_detail[0].stateFullName = "-"
                            }
                            }
                        }
                        console.log(myFollowings)
                        commit('setFollowing', myFollowings);
                        resolve(response)
                    },
                    error => {
                        reject(error)
                    }
                )
            })
        },
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
            localStorage.setItem(`${process.env.VUE_APP_API_URL}_PROFILE`, JSON.stringify(state.userInfo));

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
            )
            localStorage.setItem(`${process.env.VUE_APP_API_URL}_PROFILE`, JSON.stringify(state.userInfo));
        },

        setImages(state , images) {
            let localProfile = localStorage.getItem(`${process.env.VUE_APP_API_URL}_PROFILE`);
            localProfile = JSON.parse(localProfile)
            localProfile.images = images
            state.userInfo.images = images
            
            localStorage.setItem(`${process.env.VUE_APP_API_URL}_PROFILE`, JSON.stringify(localProfile));
          },

          setFollowing(state , myFollowings) {
            let localProfile = localStorage.getItem(`${process.env.VUE_APP_API_URL}_PROFILE`);
            
            localProfile = JSON.parse(localProfile)
            localProfile.followings = myFollowings
            state.userInfo.followings = myFollowings
            
            localStorage.setItem(`${process.env.VUE_APP_API_URL}_PROFILE`, JSON.stringify(localProfile));
          },
    }
}