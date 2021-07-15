<template>
  <div v-if="user" class="new-post bshadow" @click="isActivePopup = !isActivePopup">
    <Avatar :avatar="user.avatar" />
    <FormGroup
      type="text" placeholder="What would you like to share about?" wrapperClass="fgray"
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

              <!-- <div class="blocks">
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
              </div> -->

              <div :class="tabActiveIndex == 0 ? 'd-block': 'd-none'">
                <form action="/" method="GET" @submit.prevent="onSubmitPost">
                  <div class="blocks no-padding">
                    <div class="block w-full">
                      <FormGroup 
                        type="select" 
                        placeholder="Choose a Discussion Topic" 
                        :required="true" 
                        classer="w-full" 
                        :options="optionList"
                        :value="createDetail.category"                         
                        @input="createDetail.category = $event" 
                      />
                    </div>
                  </div>
                  <div class="blocks no-padding">
                    <div class="block w-full">
                      <FormGroup 
                        type="text" :value="createDetail.subject" placeholder="Subject" 
                        :required="true" classer="w-full" 
                        @input="(event) => createDetail.subject = event" 
                      />
                    </div>
                  </div>
                  <div class="blocks no-padding">
                    <div class="block w-full">
                      <FormGroup 
                        type="textarea" :value="createDetail.content" placeholder="Message" 
                        :required="true" classer="w-full" :rows="5" 
                        @input="(event) => createDetail.content = event" 
                      />
                    </div>
                  </div>
                  <div class="blocks no-padding">
                    <div class="block w-full">
                      <FormGroup 
                        type="select" classer="w-full" 
                        :options="[
                          { value: 1, text: 'Visible to Anyone' },
                          { value: 2, text: 'Visible to Friends Only' }
                        ]" 
                        :value="createDetail.visible_to"                         
                        @input="createDetail.visible_to = $event" 
                      />
                    </div>
                  </div>
                  <div class="blocks fw-wrap">
                    <div class="block">
                      <div class="btns mr-2">
                        <input 
                          type="file" id="photoUpload" name="filefield" accept="video/*,image/*" multiple="multiple" 
                          @change="onPhotoSelected" hidden>
                        <Button
                          text="Add photo or video" classer="btn-color-02"
                          iconPrepend="camera.png" @click="onClickAddfiles('photoUpload')"
                        />
                        <!-- <Button
                          text="Add photo or video" classer="btn-color-02" href="javascript:" 
                          iconPrepend="camera.png"
                        /> -->
                        <input 
                          type="file" id="fileUpload" name="filefield" multiple="multiple" 
                          @change="onFileSelected" hidden>
                        <Button
                          text="Attached file" classer="btn-color-02"
                          iconPrepend="attach.png" @click="onClickAddfiles('fileUpload')"
                        />
                        <!-- <Button
                          text="Attached file" classer="btn-color-02" href="javascript:" 
                          iconPrepend="attach.png"
                        /> -->
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
import {mapGetters, mapActions} from "vuex"

export default {
  name: 'NewPost',
  data() {
    return {
      isActivePopup: false,
      tabActiveIndex: 0
    }
  },
  created() {
    this.get_list()
  },
  computed: {
    ...mapGetters({
      user: 'authentication/user',
      optionList: 'category/option_ilst',
      createDetail: 'post/_create'
    })
  },
  methods: {
    ...mapActions({
      get_list: 'category/get_list',
      createPost: 'post/create',      
      fetchPostOwner:'post/fetchPostOwner'
    }),
    onSubmitPost() {
      this.createPost().then(
        () => {
          this.isActivePopup = false;
        }
      )
    },
    onPhotoSelected(event) {      
      this.createDetail.PVmedia = event.target.files
    },
    onFileSelected(event) {      
      this.createDetail.fileMedia = event.target.files
    },
    onClickAddfiles(target) {
        document.getElementById(target).click()
    },
  },
  emits: [ 'on-post' ]
}
</script>
