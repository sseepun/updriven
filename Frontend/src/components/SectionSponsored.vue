<template>
  <h6 class="fw-600 color-01">Sponsored</h6>
  <div class="grids">
    <div v-for="(card, i) in dataset" :key="i" class="grid sm-100">
      <SpecialCard01 :link="card.link" :image="card.image" :btnText="card.btnText" />
    </div>
  </div>
</template>

<script>
import SpecialCard01 from './SpecialCard01'
import {mapGetters, mapActions, mapState} from "vuex"

export default {
  name: 'SectionSponsored',
  components: {
    SpecialCard01
  },
  data() {
    return {
      // user: this.$store.getters.user,
      dataset: []
    }
  },
  computed: {
    ...mapGetters({
      user: 'authentication/user',
    })
  },
  mounted() {
    for(let i=0; i<3; i++){
      this.dataset.push({
        link: '#',
        image: `/assets/img/content/0${i+1}.jpg`,
        btnText: 'JOIN US'
      });
    }
  }
}
</script>
