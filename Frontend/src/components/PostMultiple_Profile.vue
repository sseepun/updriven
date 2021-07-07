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
    <div class="h5 fw-600 color-mgray text-center pt-6 pb-2 text-center">
      <div ref="lazyLoadPosts">No more feed found.</div>
    </div>
  </div>

  
</template>

<script>
import {mapGetters, mapActions, mapMutations} from "vuex"

export default {
  name: 'PostMultiple',
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

        if(top - innerHeight < 0){   

          if(this.getStatusPost.hasNext == true) {
            
            if ( this.isLoading == false) {
              this.fetchPost_Owner()
            }
            lazyLoadPosts.innerHTML = 'Loading...';

          } else if (this.getStatusPost.hasNext == false) {
            lazyLoadPosts.innerHTML = 'No more feed found.';
          }
        }
      }
    },
    createPost(post) {
      console.log(post)
      this.posts = [ post, ...this.posts ];
    },
    updateCategory(tab) {
      this.title = tab.title;
      this.icon = tab.icon;
      window.scrollTo(0,0);
      this.posts = [];
      this.fetchPost_Owner()
    },
    ...mapActions({
      fetchPost_Owner:'post/fetchPost_Owner'
    })
  },
  mounted() {
    this.$nextTick(function(){
      window.addEventListener('scroll', this.onScroll);
      // this.fetchPost_Owner();
    });
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
}
</script>
