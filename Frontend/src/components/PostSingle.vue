<template>
  <div v-if="user" class="post bshadow">
    <div v-if="selfPost.image" class="ss-img horizontal no-hover">
      <div class="img-bg" :style="'background-image:url(\''+selfPost.image+'\');'"></div>
    </div>
    <div class="text-container">

      <div class="title-container">
        <h6 class="title fw-600">
          {{selfPost.title}}
        </h6>
        <div class="option-icon">
          <a class="icon" href="javascript:" @click="isActivePopup = !isActivePopup">
            <img src="/assets/img/icon/dots.png" alt="Image Icon" />
          </a>
          <div class="popup-options bshadow" :class="{ 'active': isActivePopup }">
            <div class="wrapper">
              <div class="menu-container">
                <a class="menu color-gray h-color-01" href="#">
                  <div class="icon">
                    <img src="/assets/img/icon/bell-02.png" alt="Image Icon" />
                  </div>
                  <div class="text">Turn on notifications for this post</div>
                </a>
                <a class="menu color-gray h-color-01" href="#">
                  <div class="icon">
                    <img src="/assets/img/icon/embed.png" alt="Image Icon" />
                  </div>
                  <div class="text">Embed</div>
                </a>
              </div>
              <div class="menu-container">
                <a class="menu color-gray h-color-01" href="#">
                  <div class="icon">
                    <img src="/assets/img/icon/drag.png" alt="Image Icon" />
                  </div>
                  <div class="text">Hide Post</div>
                </a>
                <a class="menu color-gray h-color-01" href="#">
                  <div class="icon">
                    <img src="/assets/img/icon/clock.png" alt="Image Icon" />
                  </div>
                  <div class="text">Snooze Derrick Sheril for 30 days</div>
                </a>
                <a class="menu color-gray h-color-01" href="#">
                  <div class="icon">
                    <img src="/assets/img/icon/unfollow.png" alt="Image Icon" />
                  </div>
                  <div class="text">Unfollow Derrick Sheril</div>
                </a>
                <a class="menu color-gray h-color-01" href="#">
                  <div class="icon">
                    <img src="/assets/img/icon/report.png" alt="Image Icon" />
                  </div>
                  <div class="text">Find suport or report post</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p class="stat xs fw-600 color-gray">
        {{selfPost.user.firstname}} {{selfPost.user.lastname}}
        <span class="dot"></span>
        {{formatDate(selfPost.createdAt)}}
      </p>
      <p class="sm fw-300 color-gray lh-xs mt-3" v-html="selfPost.desc"></p>
      
      <div class="toolbar mt-3">
        <div class="post-icon color-gray mr-4">
          <img class="mr-2" src="/assets/img/icon/message.png" alt="Image Icon" />
          {{selfPost.comments.length}}
        </div>
        <a 
          class="post-icon color-gray mr-4" href="javascript:" 
          :class="{ 'active': selfPost.actions.liked  }" 
          @click="togglePostLike()" 
        >
          <img class="mr-2" src="/assets/img/icon/heart.png" alt="Image Icon" />
          {{formatNumber(selfPost.counts.likes, 0)}}
        </a>
        <a 
          class="post-icon mr-4" href="javascript:" 
          :class="{ 'active': selfPost.actions.shared  }" 
          @click="selfPost.actions.shared = !selfPost.actions.shared"
        >
          <img src="/assets/img/icon/share.png" alt="Image Icon" />
        </a>
        <a 
          class="post-icon" href="javascript:" 
          :class="{ 'active': selfPost.actions.followed  }" 
          @click="selfPost.actions.followed = !selfPost.actions.followed"
        >
          <img src="/assets/img/icon/ribbon.png" alt="Image Icon">
        </a>
      </div>

      <div class="comments">
        <div v-for="(c, i) in showComments" :key="i" class="comment mt-3">
          <div class="wrapper">
            <Avatar :avatar="c.user.avatar" />
            <div class="text">
              <div class="bg-fgray bradius-1 p-3">
                <p class="sm fw-500 lh-xs">
                  {{c.user.firstname}} {{c.user.lastname}}
                </p>
                <p class="sm lh-xs ovf-hidden" v-html="c.comment"></p>
              </div>
              <p class="xs fw-400 color-gray mt-1">
                {{formatDate(c.createdAt)}} 
                <a 
                  class="color-gray fw-600 ml-3" :class="{ 'color-01': c.actions.liked }"
                  href="javascript:" @click="commentLikeToggle(c)"
                >
                  Like
                  <span v-if="c.counts.likes">
                    {{c.counts.likes}}
                  </span>
                </a> 
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="selfPost.comments.length > 3" class="mt-3">
        <a 
          v-if="commentLimit < selfPost.comments.length - 1"  
          class="p sm fw-400 color-gray h-color-01" href="javascript:" 
          @click="commentLimit = commentLimit + 3"
        >
          <u>View more comments</u>
        </a>
        <a 
          v-else class="p sm fw-400 color-gray h-color-01" href="javascript:" 
          @click="commentLimit = 1" 
        >
          <u>Hide comments</u>
        </a>
      </div>

      <form action="/" method="GET" @submit.prevent="onSubmit()">
        <div class="comment mt-4">
          <div class="wrapper ai-center">
            <Avatar :avatar="user.avatar" />
            <FormGroup
              placeholder="Write a comment..." :required="true" 
              icon="send.png" wrapperClass="append fgray" 
              :value="comment" @input="(event) => comment = event" 
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import {mapGetters, mapActions, mapMutations} from "vuex"

export default {
  name: 'PostSingle',
  props: {
    post: { type: Object, default: {} }
  },
  data() {
    return {
      // user: this.$store.getters.user,
      selfPost: this.post,
      isActivePopup: false,
      commentLimit: 1,
      comment: ''
    }
  },
  computed: {
    showComments: function() {
      var that = this;
      return that.selfPost.comments.filter(function(d, i){
        return that.selfPost.comments.length - i - 1 < that.commentLimit;
      });
    },
    ...mapGetters({
      user: 'authentication/user',
    })
  },
  methods: {
    formatNumber(value, digits=2) {
      let val = (value/1).toFixed(digits);
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    formatDate(value) {
      return moment(String(value)).format('MM/DD/YYYY');
    },
    togglePostLike() {
      if(this.selfPost.actions.liked){
        this.selfPost.actions.liked = false;
        this.selfPost.counts.likes -= 1;
      }else{
        this.selfPost.actions.liked = true;
        this.selfPost.counts.likes += 1;
      }
    },
    commentLikeToggle(c) {
      if(c.actions.liked){
        c.actions.liked = false;
        c.counts.likes -= 1;
      }else{
        c.actions.liked = true;
        c.counts.likes += 1;
      }
    },
    onSubmit() {
      this.selfPost.comments.push({
        comment: this.comment,
        createdAt: new Date(),
        user: this.user,
        counts: {
          likes: 0
        },
        actions: {
          liked: false
        }
      });
      this.comment = '';
      this.commentLimit += 1;
    }
  }
}
</script>
