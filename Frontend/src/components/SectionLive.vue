<template>
  <div v-if="user">
    <h6 class="fw-600 color-01">Live</h6>
    <div class="grids">
      <div v-for="(card, i) in showDataset" :key="i" class="grid sm-100">
        <SpecialCard02 
          :link="card.link" :image="card.image" 
          :title="card.title" :user="card.user" 
        />
      </div>
      <div v-if="datasetLimit < dataset.length" class="grid sm-100 mt-2">
        <a
          class="p xxs fw-600 color-gray h-color-01" href="javascript:" 
          @click="datasetLimit += 3"
        >
          <u>Load More</u>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import SpecialCard02 from './SpecialCard02'
import {mapGetters, mapActions, mapMutations} from "vuex"

export default {
  name: 'SectionLive',
  components: {
    SpecialCard02
  },
  data() {
    return {
      // user: this.$store.getters.user,
      dataset: [],
      datasetLimit: 3
    }
  },
  mounted() {
    for(let i=0; i<8; i++){
      this.dataset.push({
        link: '#',
        image: `/assets/img/content/0${i%3+4}.jpg`,
        title: 'VR Mind Control Is HERE! And It Works!',
        user: {
          id: 1,
          firstname: 'Emilia',
          lastname: 'Bubu',
          avatar: '/assets/img/profile/01.jpg'
        }
      });
    }
  },
  computed: {
    showDataset: function() {
      var that = this;
      return that.dataset.filter(function(d, i){
        return i < that.datasetLimit;
      });
    },
    ...mapGetters({
      user: 'authentication/user',
    })
  }
}
</script>
