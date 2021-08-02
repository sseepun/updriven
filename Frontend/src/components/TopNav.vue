<template>
  <nav v-if="user" class="topnav">
    <div class="wrapper">
      <div class="left-container">
        <router-link to="/user/dashboard" class="logo">
          <img src="/assets/img/logo.png" alt="App Logo" />
        </router-link>
      </div>
      <div class="right-container">
        <div class="search-container">
          <form action="/" method="GET">
            <FormGroup
              placeholder="Search UpDriven" wrapperClass="append"
              icon="search.png"
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
                <router-link to="/user/profile">
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
import {mapGetters, mapActions, mapState} from "vuex"

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
    }
  },
  created() {
    this.getSocketID.emit('join-with-id', {
      user_id: this.user.id,
    });
    this.getAllNotify()
  },
  mounted() {
    this.getSocketID.on('receive-notify', (data) => {
        });

    this.getSocketID.on('get-count-notify', (data) => {
      this.getAllNotify()
    });
  },
  computed: {
    ...mapGetters({
      user: 'authentication/user',
      getSocketID: 'socketIO/getSocketID',
      getAmount: 'socketIO/getAmount',
      getContents: 'socketIO/getContents',
    })
  },
  methods: {
    ...mapActions({
      signout: 'authentication/signout',
      removeNotification: 'socketIO/removeNotification',
      getAllNotify: 'socketIO/getAllNotify',
    }),
    
    formatDate(value) {
      return moment(String(value)).format('MM/DD/YYYY HH:mm:ss');
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
    }

  }
}
</script>
