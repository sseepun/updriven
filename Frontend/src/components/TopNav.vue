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
            <a class="icon" href="javascript:" @click="isActiveNoti = !isActiveNoti">
              <img src="/assets/img/icon/bell.png" alt="Bell Icon" />
            </a>
          </div>
          <div class="option" :class="{ 'active': isActiveMsg }">
            <router-link to="/user/chat" class="icon" @click="isActiveMsg = !isActiveMsg">
              <img src="/assets/img/icon/message.png" alt="Message Icon" />
            </router-link>
          </div>
          <div class="option" :class="{ 'active': isActiveAdd }">
            <a class="icon" href="javascript:" @click="isActiveAdd = !isActiveAdd">
              <img src="/assets/img/icon/plus-circle.png" alt="Plus Circle Icon" />
            </a>
          </div>
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
                <router-link to="/">
                  Sign Out
                </router-link>
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
import {mapGetters, mapActions, mapState} from "vuex"

export default {
  name: 'TopNav',
  data() {
    return {
      // user: this.$store.getters.user,
      isActiveNoti: false,
      isActiveMsg: false,
      isActiveAdd: false,
      isActiveProfile: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'authentication/user',
    })
  }
}
</script>
