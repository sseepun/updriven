<template>
  <TopNav />

  <div class="app-container">

    <div class="left-container">
      <div class="wrapper" data-simplebar>
        <LeftNav @on-click="(tab) => onClickTab(tab)" />
      </div>
    </div>

    <Banner />
    
    <div ref="rightContainer" class="right-container">
      <div class="wrapper" data-simplebar>
        <div class="p-3 bshadow">
          <SectionInfo />
        </div>
        <div class="p-3 bshadow mt-4">
          <SectionPhotos />
        </div>
        <div class="p-3 bshadow mt-4">
          <SectionFriends />
        </div>
        <div class="p-3 bshadow mt-4">
          <SectionInterested />
        </div>
        <div class="p-3 bshadow mt-4">
          <SectionLive />
        </div>
      </div>
    </div>

    <div ref="middleContainer" class="middle-container">
      <PostNew @on-post="(post) => createPost(post)" />
      <PostMultiple ref="posts" />
    </div>

  </div>
</template>

<script>
import TopNav from '../../components/TopNav';
import LeftNav from '../../components/LeftNav';
import PostNew from '../../components/PostNew';
import PostMultiple from '../../components/PostMultiple_Profile';
import Banner from '../../components/Banner';
import SectionInfo from '../../components/SectionInfo';
import SectionPhotos from '../../components/SectionPhotos';
import SectionFriends from '../../components/SectionFriends';
import SectionInterested from '../../components/SectionInterested';
import SectionLive from '../../components/SectionLive';
import {mapGetters, mapActions, mapState, mapMutations} from "vuex"

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
  created() {
    this.clearPost();
    this.fetchPost_Owner();
  },
  mounted() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
    this.$refs.middleContainer.style.minHeight = (this.$refs.rightContainer.clientHeight*2.75)+'px';
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
    },
    ...mapActions({
      fetchPost_Owner:'post/fetchPost_Owner'
    }),
    ...mapMutations({
      clearPost:'post/clearPost'
    })
  }
}
</script>
