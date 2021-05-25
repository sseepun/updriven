<template>
  <nav class="topnav">
    <div class="wrapper">
      <div class="left-container">
        <a class="logo" href="#">
          <img src="/assets/img/logo.png" alt="App Logo" />
        </a>
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
            <a class="icon" href="javascript:" @click="isActiveMsg = !isActiveMsg">
              <img src="/assets/img/icon/message.png" alt="Message Icon" />
            </a>
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
          </div>
        </div>
      </div>
    </div>
  </nav>
  <div class="topnav-spacer"></div>
</template>

<script>
export default {
  name: 'TopNav',
  props: {
    user: { type: Object, default: {} }
  },
  data() {
    return {
      isActiveNoti: false,
      isActiveMsg: false,
      isActiveAdd: false,
      isActiveProfile: false
    }
  }
}
</script>
