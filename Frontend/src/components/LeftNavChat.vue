<template>
  <nav v-if="user" class="leftnav">
    <div class="menu-container">
      <div class="menu menu-tab active mb-6">
        <router-link to="/user/dashboard">
          <div class="icon">
            <img src="/assets/img/icon/home-white.png" alt="Image Icon" />
          </div>
          Home
        </router-link>
      </div>

      <h6 class="fw-600 color-01">Chat</h6>
      <div class="mt-1">
        <FormGroup 
          placeholder="Search chats" wrapperClass="append" icon="search.png" 
          @input="search($event)" 
        />
      </div>
      <div v-if="filteredChatUsers.length" class="mt-2">
        <div class="chat-scroll" data-simplebar>
          <div
            v-for="(user, i) in filteredChatUsers" :key="i" 
            class="chat-user" :class="{ 'active': user.id == selectedChatUser }" 
            @click="selectedChatUser = user.id" 
          >
            <Avatar :avatar="user.avatar" />
            <div class="text-container">
              <div class="name p xs fw-600 lh-2xs">
                {{user.firstname}} {{user.lastname}}
              </div>
              <p class="chat-last p xxxs lh-2xs">
                {{user.lastChat}}
              </p>
            </div>
            <div class="option-container">
              <div class="option-icon">
                <a class="icon" href="javascript:" @click="user.optionOpened = !user.optionOpened">
                  <img src="/assets/img/icon/dots.png" alt="Image Icon" />
                </a>
                <div class="popup-options bshadow" :class="{ 'active': user.optionOpened }">
                  <div class="wrapper">
                    <div class="menu-container">
                      <a class="menu color-gray h-color-01" href="#">
                        <div class="icon">
                          <img src="/assets/img/icon/bell-02.png" alt="Image Icon" />
                        </div>
                        <div class="text">Mark as read</div>
                      </a>
                      <a class="menu color-gray h-color-01" href="#">
                        <div class="icon">
                          <img src="/assets/img/icon/embed.png" alt="Image Icon" />
                        </div>
                        <div class="text">Mute conversation</div>
                      </a>
                      <a class="menu color-gray h-color-01" href="#">
                        <div class="icon">
                          <img src="/assets/img/icon/embed.png" alt="Image Icon" />
                        </div>
                        <div class="text">View profile</div>
                      </a>
                    </div>
                    <div class="menu-container">
                      <a class="menu color-gray h-color-01" href="#">
                        <div class="icon">
                          <img src="/assets/img/icon/drag.png" alt="Image Icon" />
                        </div>
                        <div class="text">Archive chat</div>
                      </a>
                      <a class="menu color-gray h-color-01" href="#">
                        <div class="icon">
                          <img src="/assets/img/icon/report.png" alt="Image Icon" />
                        </div>
                        <div class="text">Delete chat</div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="time">32 min</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="chat-not-found">
          No chat found.
        </div>
      </div>

    </div>
  </nav>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from "vuex"

export default {
  name: 'LeftNavChat',
  data() {
    return {
      // user: this.$store.getters.user,
      selectedChatUser: 0,
      chatUsers: [],
      filteredChatUsers: []
    }
  },
  computed: {
    ...mapGetters({
      user: 'authentication/user',
    })
  },
  mounted() {
    for(let i=0; i<20; i++){
      this.chatUsers.push({
        id: i+1,
        firstname: i%2==0? 'Emilia': 'John',
        lastname: i%2==0? 'Bubu': 'Doe',
        avatar: '/assets/img/profile/'+this.pad(i%12+1, 2)+'.jpg',
        background: '/assets/img/bg/01.jpg',
        lastChat: 'Protect the senator at all costs. So tell the voice inside your head.',
        optionOpened: false
      });
    }
    this.filteredChatUsers = this.chatUsers;
    this.selectedChatUser = this.filteredChatUsers[0].id;
  },
  methods: {
    pad(num, size) {
      num = num.toString();
      while(num.length < size) num = '0' + num;
      return num;
    },
    search(value) {
      if(value){
        this.filteredChatUsers = this.chatUsers.filter(function(d){
          return d.firstname.indexOf(value)>-1 || d.lastname.indexOf(value)>-1;
        });
      }else{
        this.filteredChatUsers = Object.assign({}, this.chatUsers);
      }
    },
    // onClick(tab) {
    //   tab.status = !tab.status;
    //   if(tab.clickType && tab.clickType=='emit'){
    //     return this.$emit('on-click', tab);
    //   }else{
    //     return true;
    //   }
    // }
  },
  // emits: [ 'on-click' ]
}
</script>
