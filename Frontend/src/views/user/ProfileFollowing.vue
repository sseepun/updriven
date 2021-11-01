<template>
  <TopNav />

  <div class="app-container">

    <div class="left-container">
      <div class="wrapper" data-simplebar>
        <LeftNav @on-click="(tab) => onClickTab(tab)" />
      </div>
    </div>

    <Banner ref="bannerContainer" :activeIndex="bannerActiveIndex" />
    
    <div ref="rightContainer" class="right-container" :class="rightContainerClass">
      <div class="wrapper" data-simplebar>
        <div class="p-3 bshadow">
          <SectionInfo />
        </div>
        <div class="p-3 bshadow mt-4">
          <SectionPhotos />
        </div>
        <div class="p-3 bshadow mt-4">
          <SectionFriends />
        </div>
        <div class="p-3 bshadow mt-4">
          <SectionInterested />
        </div>
      </div>
    </div>

    <div class="middle-container">
      <div class="box-container full bshadow m-0">
      <h4 class="fw-600 color-01">Your Following</h4>
      </div>
      <div v-if="profile.followings.length > 0">
        <div v-for="(following,i) in profile.followings" class="box-container full bshadow m-0">
          <p class="mt-4">
            
            <div  class=" ovf-hidden">
              <div class="content-container"  >
                <div  :style="' padding: 10px;width:100%; display:flex; align-items:flex-end;'" >
                  <div class="avatar-container">
                    <Avatar class="img-bg" :style="''" :avatar="following.follow.user_detail[0].profile_pic" classer="xxl border-4 bcolor-white" />
                  </div>
                  <div class="text" :style="'margin-left: 30px;'">
                    <h6 class="p lg fw-500">
                      {{following.follow.user_detail[0].firstname}}  {{following.follow.user_detail[0].lastname}}
                    </h6>
                    <div v-if="following.follow.role[0]">
                      <p v-if="following.follow.role[0].is_admin === true" class="xxs fw-500 color-gray">
                        Role : Admin
                      </p>
                      <p v-else-if="following.follow.role[0].is_corporate" class="xxs fw-500 color-gray">
                        Role : Corporate
                      </p>
                      <p v-else-if="following.follow.role[0].is_learner" class="xxs fw-500 color-gray">
                        Role : Learner
                      </p>
                      <p v-else-if="following.follow.role[0].is_mentor" class="xxs fw-500 color-gray">
                        Role : Mentor
                      </p>
                    </div>
                    <div v-else>
                      <p class="xxs fw-500 color-gray">
                        Role : Nothing 
                      </p>
                    </div>
                    <p class="xxs fw-500 color-gray">
                    {{following.follow.user_detail[0].stateFullName && following.follow.user_detail[0].stateFullName!='-'? following.follow.user_detail[0].stateFullName: ''}}{{
                      following.follow.user_detail[0].stateFullName && following.follow.user_detail[0].stateFullName!='-' && following.follow.user_detail[0].countryFullName
                        ? ', '+following.follow.user_detail[0].countryFullName: following.follow.user_detail[0].countryFullName
                    }}
                    </p>
                  </div>
                </div>   
                <div class="btn " :style="'width:100%; display: flex ; justify-content: flex-end;'">
                    <div v-if="checkSelf">
                      <Button  v-if="!checkFollow[i]"
                        text="FOLLOW" v-on:click="followMethod(following.follow._id,i)" 
                        classer="d-block btn-color-03 btn-sm pl-4 pr-4 mr-2" 
                      />
                      <Button  v-else
                        text="UNFOLLOW" v-on:click="unFollowMethod(following.follow._id,i)" 
                        classer="d-block btn-color-03 btn-sm pl-4 pr-4 mr-2" 
                      />
                    </div>
                  </div>
              </div>
            </div>
          </p>
        </div>
      </div>
      
      <div v-else  class="box-container full bshadow m-0">
        <p class="mt-4">
          <div  class=" ovf-hidden">
            <div class="content-container"  >
              <div  :style="' padding: 10px;width:100%; display:flex; align-items:center; text-align: center;'" >
                <div class="text">
                 You have no following
                </div>
              </div>   
            </div>
          </div>
        </p>
      </div>

      
    </div>

  </div>
</template>

<script>
import { onMounted } from '../../helpers/frontend';
import TopNav from '../../components/TopNav';
import LeftNav from '../../components/LeftNav';
import Banner from '../../components/Banner';
import SectionInfo from '../../components/SectionInfo';
import SectionPhotos from '../../components/SectionPhotos';
import SectionFriends from '../../components/SectionFriends';
import SectionInterested from '../../components/SectionInterested';
import SectionLive from '../../components/SectionLive';
import {mapGetters, mapActions, mapState, mapMutations} from "vuex";

export default {
  name: 'UserProfileFollowingPage',
  components: {
    TopNav,
    LeftNav,
    Banner,
    SectionInfo,
    SectionPhotos,
    SectionFriends,
    SectionInterested,
    SectionLive
  },
  data() {
    return {
      bannerActiveIndex: 2,
      rightContainerClass: '',
      userId: ( this.$route.params.id === undefined? 'Not found' : this.$route.params.id ),
      checkFollow : [],
      checkSelf:false,
    };
  },
  async mounted() {
    this.onScroll();
    window.addEventListener('scroll', this.onScroll);
    const userID = ( this.userId === 'Not found'? this.profile.id : this.$route.params.id )
    // console.log( 'userID :', userID )
    await this.getFollowing({ userId: userID })
    // console.log('following')

    for(let i = 0; i < this.profile.followings.length; i++){
      this.checkFollow.push(true)
    }
    if(this.user.id === userID){
      this.checkSelf = true
    }
  

  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  },
  computed: {
    ...mapGetters({
      user: 'authentication/user',
      profile: 'profile/information',
    }),
    
  },
  methods: {
    onScroll() {
      if(this.$refs.rightContainer && this.$refs.bannerContainer) {
        if(window.scrollY < this.$refs.bannerContainer.getHeight()+16) {
          this.rightContainerClass = '';
        } else {
          this.rightContainerClass = 'sticky';
        }
      }
    },
    followMethod(id,i){
      this.follow({userId: id})
      // console.log(i)
      this.checkFollow[i] = true
    },
    unFollowMethod(id,i){
      // console.log(i)
      this.unFollow({userId: id})
      // console.log(i)
      this.checkFollow[i] = false
    },
    ...mapActions({
      getFollowing: 'profile/getFollowing',
      follow: 'authentication/follow',
      unFollow: 'authentication/unFollow',
    }),
    
  }
}
</script>
