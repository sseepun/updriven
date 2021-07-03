<template>
  <div v-if="user">
    <div class="d-flex ai-center jc-space-between">
      <h6 class="fw-600 color-01">Friends</h6>
      <p class="xxs fw-500 color-gray">215 friends</p>
    </div>
    <div class="gallery-grids" style="--ggs:.375rem;">
      <div v-for="(friend, i) in friends" :key="i" class="grid sm-1-3 mt-2">
        <a class="ss-img square bradius-1" :href="friend.href">
          <div class="img-bg" :style="'background-image:url(\''+friend.image+'\');'"></div>
        </a>
        <p class="xxxs fw-600 lh-3xs mt-1">{{friend.name}}</p>
      </div>
    </div>
    <div class="mt-2">
      <a
        class="p xxs fw-600 color-gray h-color-01" href="javascript:" 
        @click="loadData(3)"
      >
        <u>Load More</u>
      </a>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from "vuex"

export default {
  name: 'SectionFriends',
  data() {
    return {
      // user: this.$store.getters.user,
      friends: []
    }
  },
  computed: {
    ...mapGetters({
      user: 'authentication/user',
    })
  },
  mounted() {
    this.loadData(9);
  },
  methods: {
    loadData(num) {
      for(var i=0; i<num; i++){
        var id = this.friends.length + i + 1;
        this.friends.push({
          id: id,
          image: `/assets/img/profile/0${id%9+1}.jpg`,
          href: '#',
          name: 'Kirsten Mckellar'
        });
      }
    }
  }
}
</script>
