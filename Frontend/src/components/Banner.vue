<template>
  <div v-if="user" ref="bannerContainer" class="banner-container bshadow ovf-hidden">
    <div class="img-bg" :style="'background-image:url(\''+user.background+'\');'"></div>
    <div class="content-container">
      <div class="top-container">
        <div class="avatar-container">
          <Avatar :avatar="user.avatar" classer="xxl border-4 bcolor-white" />
        </div>
        <div class="text">
          <h6 class="p lg fw-500">
            <div v-if="profileInfo.firstname != 'null'">
              {{ profileInfo.firstname }} {{ profileInfo.lastname }}
            </div>
            <div v-else>
              {{user.firstname}} {{user.lastname}}
            </div>
          </h6>
          <p class="xxs fw-500 color-gray">
            Role : Learner
            
          </p>
          <p class="xxs fw-500 color-gray">
          {{stateFullName && stateFullName!='-'? stateFullName: ''}}{{
              stateFullName && stateFullName!='-' && countryFullName
                ? ', '+countryFullName: countryFullName
            }}
            </p>
        </div>
      </div>
      <div class="d-flex ai-center jc-space-between fw-wrap mt-3">
        <div class="tabs">
          <router-link 
            class="tab" :class="activeIndex==0? 'active': ''" 
            to="/user/profile/about"
          >About</router-link>
          <router-link 
            class="tab" :class="activeIndex==1? 'active': ''" 
            to="/user/profile"
          >Post</router-link>
          <router-link 
            class="tab" :class="activeIndex==2? 'active': ''" 
            to="/user/profile/following"
          >Following</router-link>
          <router-link 
            class="tab" :class="activeIndex==3? 'active': ''" 
            to="/user/profile/image"
          >Image</router-link>
        </div>
        <div class="btn d-flex">
          <Button 
            href="#" text="FOLLOW" 
            classer="d-block btn-color-03 btn-sm pl-4 pr-4 mr-2" 
          />
          <Button 
            href="/user/profile/update" text="EDIT PROFILE" 
            classer="d-block btn-color-03 btn-sm pl-4 pr-4" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from "vuex"

export default {
  name: 'Banner',
  props: {
    activeIndex: { type: Number, default: 0 }
  },
  data() {
    return {
      // user: this.user
    }
  },
  computed: {
    ...mapGetters({
      user: 'authentication/user',
      countryFullName: 'csc/countryFullName',
      stateFullName: 'csc/stateFullName',
      profileInfo: 'profile/information',
    })
  },
  methods: {
    getHeight() {
      if(this.$refs.bannerContainer) {
        return this.$refs.bannerContainer.clientHeight;
      } else {
        return 0;
      }
    }
  }
}
</script>
