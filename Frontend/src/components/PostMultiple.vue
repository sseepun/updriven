<template>
  <div v-if="user">
    <div v-if="getCateerTitle" :key="getCateerTitle" class="post-header pt-1 pb-1 mt-6">
      <Avatar v-if="getCateerIcon" :avatar="getCateerIcon" classer="lg" />
      <div class="text-container">
        <h6 class="h4 fw-500">
          {{getCateerTitle}}
        </h6>
      </div>
    </div>
    <div class="grids" :key="getCateerTitle">
      <div v-for="post in getPost" :key="post.id" class="grid sm-100">
        <PostSingle :post="post"/>
      </div>
    </div>
    <div 
      class="h5 fw-600 color-mgray text-center text-center" 
      style="padding:2rem 0 2.5rem 0;"
    >
      <div ref="lazyLoadPosts">Loading...</div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from "vuex"

export default {
  name: 'PostMultiple',
  props: {
    typePost: { type: Boolean, default: true } // 0 = Profile, 1 = Dashboard
  },
  data() {
    return {
      title: null,
      icon: null,
      posts: []
    }
  },
  computed: {
    ...mapGetters({
      user: 'authentication/user',
      getPost: 'post/getPost',
      getStatusPost: 'post/getStatusPost',
      isLoading: 'post/isLoading',
      isDashboard: 'post/isDashboard',
      haveFilter: 'post/haveFilter',
      profileInfo: 'profile/information',
      getCateerTitle: 'post/getCateerTitle',
      getCateerIcon: 'post/getCateerIcon',
    })
  },
  methods: {
    onScroll() {
      var lazyLoadPosts = this.$refs['lazyLoadPosts'];
      if(lazyLoadPosts){
        var top = lazyLoadPosts.getBoundingClientRect().top;
        var innerHeight = window.innerHeight;

        if(top - innerHeight < 2000){
          if(this.getStatusPost.hasNext == true) {
            if ( this.isLoading == false) {
              this.selectFetchOption()
            }
            lazyLoadPosts.innerHTML = 'Loading...';
          } else if (this.getStatusPost.hasNext == false) {
            lazyLoadPosts.innerHTML = 'That’s All For New Content';
          }
        }
      }
    },
    createPost(post) {
      this.posts = [ post, ...this.posts ];
    },
    async updateCategory(tab) {
      // console.log('updateCategory :', tab)
      // this.title = await tab.title;
      // this.icon = await tab.icon;
      // this.posts = await [];
      await window.scrollTo(0,0);
      // await this.changeStatusFilter(1);
      // await this.updateCareersTitle(this.title);
      // await this.selectFetchOption();

      // await this.clearPost();

      // await this.pullFeed();
      if ( this.$route.name === 'UserDashboardPage' ) await this.pullFeed()
      else if ( this.$route.name === 'UserProfilePage' ) await this.pullPost()

      // if ( this.$route.name === 'UserProfilePage' ) await this.pullPost()
    },
    selectFetchOption() {
      if ( this.isDashboard ) {
        if ( this.haveFilter ) {
          // console.log('condition pull feed and have filter')
          this.pullFeed({ category: this.title });
          return
        } else {
          // console.log('condition pull feed and not have filter')
          this.pullFeed();
          return
        }
      } else if ( !this.isDashboard ) {
        console.log( 'profileInfo.id :', this.profileInfo.id )
        if ( this.haveFilter ) {
          // console.log('condition pull post and have filter')
          this.pullPost({ userID: this.profileInfo.id, category: this.title });
          return
        } else {
          // console.log('condition pull post and not have filter')
          this.pullPost({ userID: this.profileInfo.id });
          return
        }
      }
    },
    ...mapActions({
      clearPost: 'post/clearPost',
      pullFeed:'post/getFeed',
      pullPost:'post/getPost',
    }),
    ...mapMutations({
      changeStatusFilter: 'post/changeStatusFilter',
      updateCareersTitle: 'post/updateCareersTitle'
    })
  },
  created() {
    // this.selectFetchOption()
  },
  mounted() {
    this.$nextTick(function(){
      window.addEventListener('scroll', this.onScroll);
      // this.fetchPostOwner();
    });
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
}
</script>
