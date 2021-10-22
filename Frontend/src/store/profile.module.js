import User from '../models/user.js';
import { profileService, postService } from '../services/index';
import { post } from './post.module.js';
import countrySC from '../assets/country-state-city'

const user = JSON.parse(localStorage.getItem(`${process.env.VUE_APP_API_URL}_PROFILE`));

export const profile = {
    namespaced: true,
    state: {
        userInfo: user
    },
    getters: {
        information: state => state.userInfo,
    },
    actions: {
        async fetchInfo( {dispatch, commit, rootGetters}, { userId } ) {
            const OwnerUser = rootGetters['authentication/user']
            console.log(OwnerUser)
            // console.log( OwnerUser.id, userId)
            if ( (OwnerUser.id !== userId) && userId ) {
                // console.log('user id not match with id param')
                const userInfo = await profileService.fetchInfoProfile(userId);
                console.log( 'userInfo :', userInfo)
                await commit("createUserInfo", userInfo.data);
            } else {
                
                // console.log('user id match with id param');
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
            console.log( 'createUserInfo :', userInfo )
            const modelData = {
                id : userInfo.user_detail[0].username[0],
                firstname : userInfo.user_detail[0].firstname,
                lastname : userInfo.user_detail[0].lastname,
                avatar : userInfo.user_detail[0].profile_pic,
                background : userInfo.user_detail[0].background_pic,
                state_id : userInfo.user_detail[0].state_id,
                province : userInfo.user_detail[0].province,
                email : userInfo.user_detail[0].email,
                organization : userInfo.user_detail[0].organization,
                country_id: userInfo.user_detail[0].country_id,
                about : userInfo.user_detail[0].about_us,
                interests: userInfo.user_detail[0].interests,
                role: userInfo.role[0]
            }
    
            state.userInfo = new User(modelData)

            localStorage.setItem(`${process.env.VUE_APP_API_URL}_PROFILE`, JSON.stringify(state.userInfo));
        },

        temporaryCreateOwnerUserInfo( state, userInfo ) {
            console.log( 'temporaryCreateOwnerUserInfo :', userInfo )
            const modelData = {
                id : userInfo.id,
                firstname : userInfo.firstname,
                lastname : userInfo.lastname,
                avatar : userInfo.avatar,
                background : userInfo.background,
                state_id : userInfo.state_id,
                province : userInfo.province,
                email : userInfo.email,
                organization : userInfo.organization,
                country_id: userInfo.country_id,
                about : userInfo.about_us,
                interests: userInfo.interests,
                role: userInfo.role
            }
    
            state.userInfo = new User(modelData)

            localStorage.setItem(`${process.env.VUE_APP_API_URL}_PROFILE`, JSON.stringify(state.userInfo));
        },

        setImages(state , images) {
            let localProfile = localStorage.getItem(`${process.env.VUE_APP_API_URL}_PROFILE`);
            localProfile = JSON.parse(localProfile)
            localProfile.images = ( images? images : [] )
            console.log(state.userInfo)
            state.userInfo.images= []
            state.userInfo.images = ( images? images : [] )
            
            localStorage.setItem(`${process.env.VUE_APP_API_URL}_PROFILE`, JSON.stringify(localProfile));
          },

          setFollowing(state , myFollowings) {
            let localProfile = localStorage.getItem(`${process.env.VUE_APP_API_URL}_PROFILE`);
            localProfile = JSON.parse(localProfile)
            localProfile.followings = ( myFollowings? myFollowings : [] )
            state.userInfo.followings= []

            state.userInfo.followings = ( myFollowings? myFollowings : [] )

            localStorage.setItem(`${process.env.VUE_APP_API_URL}_PROFILE`, JSON.stringify(localProfile));
          },
    }
}