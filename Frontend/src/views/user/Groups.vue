<style scoped>
  .yellow{color:yellow;}
</style>

<template>
  <TopNav />

  <div class="app-container">

    <div class="left-container">
      <div class="wrapper" data-simplebar>
        <LeftNav @on-click="(tab) => onClickTab(tab)" />
      </div>
    </div>
    
    <div class="right-container" data-aos="fade-up" data-aos-delay="150">
      <div class="wrapper" data-simplebar>
        <div>
          <SectionSponsored />
        </div>
      </div>
    </div>

    <div class="middle-container">
      <h1>Start Here</h1>

    </div>

  </div>
</template>

<script>
import TopNav from '../../components/TopNav';
import LeftNav from '../../components/LeftNav';
import SectionSponsored from '../../components/SectionSponsored';

export default {
  name: 'UserGroupsPage',
  components: {
    TopNav,
    LeftNav,
    SectionSponsored
  },
  mounted() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
  },
  methods: {
    createPost(post) {
      this.$refs['posts'].createPost(post);
    },
    onClickTab(tab) {
      if(tab.link=='javascript:'){
        this.$refs['posts'].updateCategory(tab);
      }else{
        window.location.href = tab.link;
      }
    }
  }
}
</script>
