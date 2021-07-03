<template>
  <div v-if="user">
    <h6 class="fw-600 color-01">Photos</h6>
    <div class="gallery-grids grid-round mt-1" style="--ggs:.125rem;">
      <div v-for="(photo, i) in photos" :key="i" class="grid sm-1-3">
        <a class="ss-img square" :href="photo.href">
          <div class="img-bg" :style="'background-image:url(\''+photo.image+'\');'"></div>
        </a>
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
  name: 'SectionPhotos',
  data() {
    return {
      // user: this.$store.getters.user,
      photos: []
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
        var id = this.photos.length + i + 1;
        this.photos.push({
          id: id,
          image: `/assets/img/profile/0${id%9+1}.jpg`,
          href: '#'
        });
      }
    }
  }
}
</script>
