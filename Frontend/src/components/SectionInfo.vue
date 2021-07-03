<template>
  <div v-if="user">
    <h6 class="fw-600 color-01">About</h6>
    <div class="personal-info">
      <div class="info">
        <div class="icon">
          <img src="/assets/img/icon/education.png" alt="Image Icon" />
        </div>
        <p class="xs fw-500 color-gray">
          Study <span class="color-dark">Columbia University</span>
        </p>
      </div>
      <div class="info">
        <div class="icon">
          <img src="/assets/img/icon/pin.png" alt="Image Icon" />
        </div>
        <p class="xs fw-500 color-gray">
          Lives in <span class="color-dark">Broadway, New York</span>
        </p>
      </div>
      <div class="info">
        <div class="icon">
          <img src="/assets/img/icon/user-no-plus.png" alt="Image Icon" />
        </div>
        <p class="xs fw-500 color-gray">
          Following <span class="color-dark">47 people</span>
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
      <div class="info">
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
    user: { type: Object, default: {} }
  },
  date() {
    return {
      user: this.$store.getters.user
    }
  },
  
}
</script>
