<template>
  <div v-if="user">
    <div v-if="title" :key="title" class="post-header pt-1 pb-1 mt-6">
      <Avatar v-if="icon" :avatar="icon" classer="lg" />
      <div class="text-container">
        <h6 class="h4 fw-500">
          {{title}}
        </h6>
      </div>
    </div>
    <div class="grids" :key="title">
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
      isLoading: 'post/isLoading'
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
    updateCategory(tab) {
      this.title = tab.title;
      this.icon = tab.icon;
      window.scrollTo(0,0);
      this.posts = [];
      this.selectFetchOption()
    },
    selectFetchOption() {

      if (this.typePost == true ) {
        this.fetchPostAll();
      } else if (this.typePost == false) {
        this.fetchPostOwner();
      }

    },
    ...mapActions({
      fetchPostOwner:'post/fetchPostOwner',
      fetchPostAll:'post/fetchPostAll'
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
