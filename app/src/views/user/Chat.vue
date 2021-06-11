<template>
  <TopNav />

  <div class="app-container">

    <div class="left-container">
      <div class="wrapper" data-simplebar>
        <LeftNavChat @on-click="(tab) => onClickTab(tab)" />
      </div>
    </div>

    <Banner />
    
    <div class="right-container" data-aos="fade-up" data-aos-delay="150">
      <div class="wrapper" data-simplebar>
        
      </div>
    </div>

    <div class="middle-container">
      <PostNew @on-post="(post) => createPost(post)" />
      <PostMultiple ref="posts" />
    </div>

  </div>
</template>

<script>
import TopNav from '../../components/TopNav';
import LeftNavChat from '../../components/LeftNavChat';
import PostNew from '../../components/PostNew';
import PostMultiple from '../../components/PostMultiple';
import SectionSponsored from '../../components/SectionSponsored';
import SectionLive from '../../components/SectionLive';

export default {
  name: 'UserChatPage',
  components: {
    TopNav,
    LeftNavChat,
    PostNew,
    PostMultiple,
    SectionSponsored,
    SectionLive
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
