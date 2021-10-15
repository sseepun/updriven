<template>
  <div v-if="user">
    <h6 class="fw-600 color-01">About</h6>
    <div class="personal-info">
      <div class="info" >
        <p class="xs fw-500 color-gray" v-if="false">
        <div class="icon">
          <img src="/assets/img/icon/education.png" alt="Image Icon" />
        </div>

          Study <span class="color-dark">{{user.organization[0].name}}</span>
        </p>
      </div>
      <div class="info">
        <div class="icon">
          <img src="/assets/img/icon/pin.png" alt="Image Icon" />
        </div>
        <p class="xs fw-500 color-gray">
          Lives in 
          <span class="color-dark">
            {{stateFullName && stateFullName!='-'? stateFullName: ''}}{{
              stateFullName && stateFullName!='-' && countryFullName
                ? ', '+countryFullName: countryFullName
            }}
          </span>
        </p>
      </div>
      <div class="info">
        <div class="icon">
          <img src="/assets/img/icon/user-no-plus.png" alt="Image Icon" />
        </div>
        <p class="xs fw-500 color-gray">
          Following <span class="color-dark">{{following}} people</span>
        </p>
      </div>
      <div class="info">
        <div class="icon">
          <img src="/assets/img/icon/user-plus.png" alt="Image Icon" />
        </div>
        <p class="xs fw-500 color-gray">
          Followed by <span class="color-dark">125 people</span>
        </p>
      </div>
      <div class="info" v-if="false">
        <div class="icon">
          <img src="/assets/img/icon/star.png" alt="Image Icon" />
        </div>
        <p class="xs fw-500 color-gray">
          Interested in <span class="color-dark">Program, Engineer, Robot</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from "vuex"

export default {
  name: 'SectionInfo',
  props: {
    userProfile: { type: Object, default: {} }
  },
  data() {
    return {
      // user: this.$store.getters.user,
      userId: ( this.$route.params.id === ''? this.user.id : this.$route.params.id ),
      friends: [],
      following: 0,
      isFetching: false,
    }
  },
   computed: {
    ...mapGetters({
      user: 'authentication/user',
      profile: 'profile/information',
      countryFullName: 'csc/countryFullName',
      stateFullName: 'csc/stateFullName',
    })
  },
  created() {
  },
  async mounted() {
    await this.getFollowing({ userId: this.userId })
    console.log(this.profile.followings.length)
    this.following = this.profile.followings.length
    this.isFetching = true
  },
  methods: {
    
    ...mapActions({
      getFollowing: 'profile/getFollowing',
    }),
    
  }
  
}
</script>
