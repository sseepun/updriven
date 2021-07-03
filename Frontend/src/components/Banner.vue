<template>
  <div v-if="user" class="banner-container bshadow ovf-hidden">
    <div class="img-bg" :style="'background-image:url(\''+user.background+'\');'"></div>
    <div class="content-container">
      <div class="top-container">
        <div class="avatar-container">
          <Avatar :avatar="user.avatar" classer="xxl border-4 bcolor-white" />
        </div>
        <div class="text">
          <h6 class="p lg fw-500">
            {{user.firstname}} {{user.lastname}}
          </h6>
          <p class="xxs fw-500 color-gray">
            Student, NYC
          </p>
        </div>
      </div>
      <div class="d-flex ai-center jc-space-between fw-wrap mt-3">
        <div class="tabs">
          <a class="tab" href="#">About</a>
          <a class="tab active" href="#">Post</a>
          <a class="tab" href="#">Friends</a>
          <a class="tab" href="#">Photo</a>
          <a class="tab" href="#">Video</a>
          <a class="tab" href="#">Activity</a>
        </div>
        <div class="btn">
          <Button 
            href="#" classer="d-block btn-color-01 btn-sm pl-4 pr-4" 
            text="EDIT PROFILE"
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
  data() {
    return {
      // user: this.user
    }
  },
  computed: {
    ...mapGetters({
      user: 'authentication/user',
    })
  },
}
</script>
