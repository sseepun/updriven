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
      <div v-for="post in posts" :key="post.id" class="grid sm-100">
        <PostSingle :post="post" />
      </div>
    </div>
    <div ref="lazyLoadPosts">Loading...</div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from "vuex"

export default {
  name: 'PostMultiple',
  data() {
    return {
      // user: this.$store.getters.user,
      title: null,
      icon: null,
      posts: []
    }
  },
  computed: {
    ...mapGetters({
      user: 'authentication/user',
    })
  },
  methods: {
    loadPosts() {
      for(let i=0; i<4; i++){
        this.posts.push({
          id: this.posts.length+1,
          image: `/assets/img/post/0${Math.round(Math.random()*2+1)}.jpg`,
          title: 'The Top 5 Programming Languages in 2021 to get a job',
          desc: `
            Want to get a developer job in 2021? Some languages are better than others.
            <br><br>
            Here's a top 5 (we actually talk about 9 languages total) --- 
            based on real year-end data, not just opinion or generic advice.
          `,
          createdAt: new Date(),
          user: {
            id: 1,
            firstname: 'Emilia',
            lastname: 'Bubu',
            avatar: '/assets/img/profile/01.jpg'
          },
          counts: {
            likes: 1235
          },
          actions: {
            shared: false,
            liked: true,
            followed: true,
          },
          comments: [
            {
              comment: 'Can mobile\'s notification Led light be controlled by python?',
              createdAt: new Date(),
              user: {
                id: 1,
                firstname: 'Emilia',
                lastname: 'Bubu',
                avatar: '/assets/img/profile/01.jpg'
              },
              counts: {
                likes: 5
              },
              actions: {
                liked: true
              }
            },
            {
              comment: 'Can mobile\'s notification Led light be controlled by python?',
              createdAt: new Date(),
              user: {
                id: 1,
                firstname: 'Emilia',
                lastname: 'Bubu',
                avatar: '/assets/img/profile/01.jpg'
              },
              counts: {
                likes: 5
              },
              actions: {
                liked: true
              }
            },
            {
              comment: 'Can mobile\'s notification Led light be controlled by python?',
              createdAt: new Date(),
              user: {
                id: 1,
                firstname: 'Emilia',
                lastname: 'Bubu',
                avatar: '/assets/img/profile/01.jpg'
              },
              counts: {
                likes: 5
              },
              actions: {
                liked: true
              }
            },
            {
              comment: 'Can mobile\'s notification Led light be controlled by python?',
              createdAt: new Date(),
              user: {
                id: 1,
                firstname: 'Emilia',
                lastname: 'Bubu',
                avatar: '/assets/img/profile/01.jpg'
              },
              counts: {
                likes: 5
              },
              actions: {
                liked: true
              }
            }
          ]
        });
      }
    },
    onScroll() {
      var lazyLoadPosts = this.$refs['lazyLoadPosts'];
      if(lazyLoadPosts){
        var top = lazyLoadPosts.getBoundingClientRect().top;
        var innerHeight = window.innerHeight;
        if(top - innerHeight < 0){                 
          this.loadPosts();
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
      this.loadPosts();
    }
  },
  mounted() {
    this.$nextTick(function(){
      window.addEventListener('scroll', this.onScroll);
      this.loadPosts();
    });
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
}
</script>
