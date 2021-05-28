<template>
  <TopNav :user="user" />

  <div class="app-container">

    <div class="left-container">
      <div class="wrapper" data-simplebar>
        <LeftNav :user="user" @on-click="(tab) => onClickTab(tab)" />
      </div>
    </div>

    <div class="middle-container">
      <PostNew 
        :user="user" 
        @on-post="(post) => createPost(post)" 
      />
      <PostMultiple :user="user" ref="posts" />
    </div>

    <div class="right-container">
      <div class="wrapper" data-simplebar>
        <div>
          <SectionSponsored />
        </div>
        <div class="mt-6">
          <SectionLive />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from '../../components/TopNav';
import LeftNav from '../../components/LeftNav';
import PostNew from '../../components/PostNew';
import PostMultiple from '../../components/PostMultiple';
import SectionSponsored from '../../components/SectionSponsored';
import SectionLive from '../../components/SectionLive';

export default {
  name: 'UserDashboardPage',
  components: {
    TopNav,
    LeftNav,
    PostNew,
    PostMultiple,
    SectionSponsored,
    SectionLive
  },
  data() {
    return {
      user: {
        id: 1,
        firstname: 'Emilia',
        lastname: 'Bubu',
        avatar: '/assets/img/profile/01.jpg'
      }
    }
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
