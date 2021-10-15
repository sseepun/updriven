<template>
  <nav v-if="user" class="topnav">
    <div class="wrapper">
      <div class="left-container">
        <router-link to="/user/dashboard" class="logo">
          <img src="/assets/img/logo.png" alt="App Logo" />
        </router-link>
      </div>
      <div class="right-container">
        <div v-if="isAdmin" class="search-container" style="width: 43rem;">
          <form @submit.prevent="onSubmitSearch" style="display: flex; justify-content: space-around;">
            <FormGroup
              placeholder="Search UpDriven" wrapperClass="append"
              icon="search.png" :value="getSearchSentance"
              @input="updateSentance($event)"
            />

            <FormGroup
              v-if="isAdmin"
              type="select"
              placeholder="Select Careers"
              classer="label-sm"
              wrapperClass="fgray"
              :options="optionList"
              :value="getSearchcareers"
              @input="updateCareer($event)"
            />
          </form>
        </div>

        <div v-else class="search-container" >
          <form @submit.prevent="onSubmitSearch" >
            <FormGroup
              placeholder="Search UpDriven" wrapperClass="append"
              icon="search.png" :value="getSearchSentance"
              @input="updateSentance($event)"
            />
          </form>
        </div>

        <div class="option-container">
          <div class="option" :class="{ 'active': isActiveNoti }">
            <a class="icon icon-alert" href="javascript:" @click="onclickRemoveAllNotification()">
              <img src="/assets/img/icon/bell.png" alt="Bell Icon" />
              <div v-if="getAmount > 0" class="num">{{parseInt(getAmount, 10)}}</div>
            </a>
            <div class="dropdown bshadow" :class="{ 'active': isActiveNoti }">
              <div v-for="(content, index) in getContents" :key="index" class="submenu submenu-alert">
                <a @click="onclickClearNotification(content._id)" >
                  <div class="icon">
                    <img src="/assets/img/icon/alert.svg" alt="Image Icon" />
                  </div>
                  <div class="text-container">
                    <div class="date">
                      
                      {{formatDate(content.createdAt)}}
                    </div>
                    <div class="title">
                      {{content.user_like_post_firstname}} {{content.user_like_post_lastname}} 
                      Reacted to your Post. 
                    </div>
                    <!-- <div class="desc">{{content.action_to}}</div> -->
                  </div>
                </a>
              </div>
            </div>
          </div>

          <!-- <div class="option" :class="{ 'active': isActiveMsg }">
            <router-link to="/user/chat" class="icon" @click="isActiveMsg = !isActiveMsg">
              <img src="/assets/img/icon/message.png" alt="Message Icon" />
            </router-link>
          </div>
          <div class="option" :class="{ 'active': isActiveAdd }">
            <a class="icon" href="javascript:" @click="isActiveAdd = !isActiveAdd">
              <img src="/assets/img/icon/plus-circle.png" alt="Plus Circle Icon" />
            </a>
          </div> -->
          <div class="option-profile" :class="{ 'active': isActiveProfile }">
            <a href="javascript:" @click="isActiveProfile = !isActiveProfile">
              <Avatar :avatar="user.avatar" classer="border-3 bcolor-01" />
              <div class="name color-gray">
                {{user.firstname}} {{user.lastname}}
              </div>
              <div class="chev">
                <img src="/assets/img/icon/chev-down.png" alt="Chev Icon" />
              </div>
            </a>
            <div class="dropdown bshadow" :class="{ 'active': isActiveProfile }">
              <div class="submenu">
                <router-link :to="user.profileLink">
                  My Profile
                </router-link>
              </div>
              <div class="submenu">
                <a @click.prevent="signOut">
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <div v-if="user" class="topnav-spacer"></div>
</template>

<script>
import moment from 'moment';
import {mapGetters, mapActions, mapMutations, mapState} from "vuex"
import { categoryService } from '../services/index'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'


export default {
  name: 'TopNav',
  data() {
    return {
      // user: this.$store.getters.user,
      isActiveNoti: false,
      isActiveMsg: false,
      isActiveAdd: false,
      isActiveProfile: false,
      amountNotify: 0,
      menuCategory: [
        {
          status: true,
          title: 'Careers', link: 'javascript:',
          icon: '/assets/img/profile/03.jpg',
          children: []
        } 
      ]
    }
  },
  created() {
    this.getSocketID.emit('join-with-id', { user_id: this.user.id });
    this.getAllNotify()
  },
  mounted() {

    this.getSocketID.on('receive-notify', (data) => { });

    this.getSocketID.on('get-count-notify', (data) => { this.getAllNotify() });
  },
  computed: {
    ...mapGetters({
      user: 'authentication/user',
      isAdmin: 'authentication/isAdmin',
      getSocketID: 'socketIO/getSocketID',
      getAmount: 'socketIO/getAmount',
      getContents: 'socketIO/getContents',
      getSearchSentance: 'search/getSearchSentance',
      getSearchKeyword: 'search/getSearchKeyword',
      getSearchcareers: 'search/getSearchcareers',
      optionList: "category/option_ilst",
    })
  },
  methods: {
    ...mapActions({
      signout: 'authentication/signout',
      removeNotification: 'socketIO/removeNotification',
      getAllNotify: 'socketIO/getAllNotify',
      searchPost: 'search/searchPost'
    }),

    ...mapMutations({
      updateSentance: 'search/updateSentance',
      updateKeyword: 'search/updateKeyword',
      updateCareer: 'search/updateCareer',
      clearResult: 'search/clearResult'
    }),
    
    formatDate(value) {
      return moment(value).fromNow()
    },

    signOut() {
      this.signout().then(
        () => {
          this.$router.push({ 
            name: 'Home'
          })
        }
      )
    },

    onclickClearNotification(id) {
      this.removeNotification({"notification_id": id}).then(response => {
      })
    },

    onclickRemoveAllNotification() {
      this.isActiveNoti = !this.isActiveNoti
    },

    async onSubmitSearch() {
      await this.clearResult()
      await this.searchPost()
      await this.$router.push('/user/search');
    }

  }
}
</script>
