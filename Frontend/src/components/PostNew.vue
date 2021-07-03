<template>
  <div v-if="user" class="new-post bshadow" @click="isActivePopup = !isActivePopup">
    <Avatar :avatar="user.avatar" />
    <FormGroup
      type="text" placeholder="What's your topic today?" wrapperClass="fgray"
    />
    <div class="btns">
      <Button href="javascript:" classer="d-block btn-color-01 pl-4 pr-4" text="CREATE POST" />
    </div>
  </div>

  <div v-if="user" class="popup-container" :class="{ 'active': isActivePopup }">
    <div class="wrapper">
      <div class="close-filter" @click="isActivePopup = !isActivePopup"></div>
      <div class="popup-content">
          <div class="popup-comment bshadow">
            <div class="wrapper">

              <div class="blocks">
                <div class="block fw-wrap mr-2">
                  <a 
                    v-for="(tab, i) in [
                      { text: 'Message', icon: 'message.png' },
                      { text: 'Poll', icon: 'poll.png' },
                      { text: 'Event', icon: 'event.png' },
                      { text: 'Urgen alert', icon: 'alert.png' }
                    ]" :key="i" href="javascript:" 
                    class="menu mt-1" :class="{ 'active': tabActiveIndex==i }" 
                    @click="tabActiveIndex = i"
                  >
                    <div class="icon">
                        <img :src="'/assets/img/icon/'+tab.icon" alt="Image Icon" />
                    </div>
                    <div class="text">{{tab.text}}</div>
                  </a>
                </div>
                <div class="block">
                  <a 
                    class="menu mt-1 btn-popup-toggle" href="javascript:" 
                    @click="isActivePopup = !isActivePopup"
                  >
                    <div class="icon">
                      <img src="/assets/img/icon/close.png" alt="Image Icon" />
                    </div>
                  </a>
                </div>
              </div>
              
              <div :class="tabActiveIndex == 0 ? 'd-block': 'd-none'">
                <form action="/" method="GET" @submit.prevent="onSubmitPost">
                  <div class="blocks no-padding">
                    <div class="block w-full">
                      <FormGroup 
                        type="select" value="" placeholder="Choose category" :required="true" 
                        classer="w-full" 
                        :options="[
                          { value: 1, text: 'Category 1' },
                          { value: 2, text: 'Category 2' },
                          { value: 3, text: 'Category 3' }
                        ]" 
                      />
                    </div>
                  </div>
                  <div class="blocks no-padding">
                    <div class="block w-full">
                      <FormGroup 
                        type="text" :value="dataPost.title" placeholder="Subject" 
                        :required="true" classer="w-full" 
                        @input="(event) => dataPost.title = event" 
                      />
                    </div>
                  </div>
                  <div class="blocks no-padding">
                    <div class="block w-full">
                      <FormGroup 
                        type="textarea" :value="dataPost.desc" placeholder="Message" 
                        :required="true" classer="w-full" :rows="5" 
                        @input="(event) => dataPost.desc = event" 
                      />
                    </div>
                  </div>
                  <div class="blocks no-padding">
                    <div class="block w-full">
                      <FormGroup 
                        type="select" :value="1"  classer="w-full" 
                        :options="[
                          { value: 1, text: 'Visible to Anyone' },
                          { value: 2, text: 'Visible to Friends Only' }
                        ]" 
                      />
                    </div>
                  </div>
                  <div class="blocks fw-wrap">
                    <div class="block">
                      <div class="btns mr-2">
                        <Button
                          text="Add photo or video" classer="btn-color-02" href="javascript:" 
                          iconPrepend="camera.png"
                        />
                        <Button
                          text="Attached file" classer="btn-color-02" href="javascript:" 
                          iconPrepend="attach.png"
                        />
                      </div>
                    </div>
                    <div class="block">
                      <div class="btns">
                        <Button
                          type="submit" text="POST" classer="btn-color-01 pl-5 pr-5 mr-0"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              
              <div :class="tabActiveIndex == 1 ? 'd-block': 'd-none'">
                Poll
              </div>
              
              <div :class="tabActiveIndex == 2 ? 'd-block': 'd-none'">
                Event
              </div>
              
              <div :class="tabActiveIndex == 3 ? 'd-block': 'd-none'">
                Urgent alert
              </div>
            
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from "vuex"

export default {
  name: 'NewPost',
  data() {
    return {
      // user: this.$store.getters.user,
      isActivePopup: false,
      tabActiveIndex: 0,
      dataPost: {
        title: '',
        desc: '',
        image: '/assets/img/post/01.jpg'
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'authentication/user',
    })
  },
  methods: {
    onSubmitPost() {
      this.$emit('on-post', {
        id: Math.round(Math.random() * 10**7),
        title: this.dataPost.title,
        desc: this.dataPost.desc,
        image: this.dataPost.image,
        createdAt: new Date(),
        user: this.user,
        counts: {
          likes: 0
        },
        actions: {
          shared: false,
          liked: false,
          followed: false,
        },
        comments: []
      });
      this.dataPost.title = '';
      this.dataPost.desc = '';
      this.isActivePopup = false;
      return true;
    }
  },
  emits: [ 'on-post' ]
}
</script>
