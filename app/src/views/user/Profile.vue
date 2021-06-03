<template>
  <TopNav :user="user" />

  <div class="app-container">

    <div class="left-container">
      <div class="wrapper" data-simplebar>
        <LeftNav :user="user" @on-click="(tab) => onClickTab(tab)" />
      </div>
    </div>

    <Banner :user="user" data-aos="fade-up" data-aos-delay="0" />
    
    <div class="right-container" data-aos="fade-up" data-aos-delay="300">
      <div class="wrapper" data-simplebar>
        <div class="p-3 bshadow">
          <SectionInfo :user="user" />
        </div>
        <div class="p-3 bshadow mt-4">
          <SectionPhotos :user="user" />
        </div>
        <div class="p-3 bshadow mt-4">
          <SectionFriends :user="user" />
        </div>
        <div class="p-3 bshadow mt-4">
          <SectionInterested :user="user" />
        </div>
        <div class="p-3 bshadow mt-4">
          <SectionLive :user="user" />
        </div>
      </div>
    </div>

    <div class="middle-container" data-aos="fade-up" data-aos-delay="150">
      <PostNew 
        :user="user" 
        @on-post="(post) => createPost(post)" 
      />
      <PostMultiple :user="user" ref="posts" />
    </div>

  </div>
</template>

<script>
import TopNav from '../../components/TopNav';
import LeftNav from '../../components/LeftNav';
import PostNew from '../../components/PostNew';
import PostMultiple from '../../components/PostMultiple';
import Banner from '../../components/Banner';
import SectionInfo from '../../components/SectionInfo';
import SectionPhotos from '../../components/SectionPhotos';
import SectionFriends from '../../components/SectionFriends';
import SectionInterested from '../../components/SectionInterested';
import SectionLive from '../../components/SectionLive';

export default {
  name: 'UserProfilePage',
  components: {
    TopNav,
    LeftNav,
    PostNew,
    PostMultiple,
    Banner,
    SectionInfo,
    SectionPhotos,
    SectionFriends,
    SectionInterested,
    SectionLive
  },
  data() {
    return {
      user: {
        id: 1,
        firstname: 'Emilia',
        lastname: 'Bubu',
        avatar: '/assets/img/profile/01.jpg',
        background: '/assets/img/bg/01.jpg'
      }
    }
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
