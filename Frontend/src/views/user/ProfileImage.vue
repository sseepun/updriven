<template>
  <TopNav />

  <div class="app-container">

    <div class="left-container">
      <div class="wrapper" data-simplebar>
        <LeftNav @on-click="(tab) => onClickTab(tab)" />
      </div>
    </div>

    <Banner ref="bannerContainer" :activeIndex="bannerActiveIndex" />
    
    <div ref="rightContainer" class="right-container" :class="rightContainerClass">
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
      </div>
    </div>

    <div class="middle-container">
      <div class="box-container full bshadow m-0">
        <h4 class="fw-600 color-01" :style="'margin-bottom :20px;'">Images</h4>
         <div v-if="profile.images.length > 0">
          <div class="gallery-grids grid-round mt-1" style="--ggs:.125rem;">
            <div v-for="(image, i) in profile.images" :key="i" class="grid sm-1-3">
              <a class="ss-img square" @click="showLightbox(image.name)"  >
                <div class="img-bg" :style="'background-image:url(\''+image.path+'\');'"></div>
              </a>
              <lightbox id="mylightbox" 
                ref="lightbox"
                :images="photos"
                :directory="thumbnailDir"
                :timeout-duration=5000
                :close-on-backdrop-click=true
              />
            </div>
          </div>
        </div>

        <div v-else>
           <p class="mt-4">
            <div  class=" ovf-hidden">
              <div class="content-container"  >
                <div  :style="' padding: 10px;width:100%; display:flex; align-items:center; text-align: center;'" >
                  <div class="text">
                  You have no image
                  </div>
                </div>   
              </div>
            </div>
          </p>
        </div>
      </div>
    </div>
    
    

  </div>
</template>

<script>
import { onMounted } from '../../helpers/frontend';
import TopNav from '../../components/TopNav';
import LeftNav from '../../components/LeftNav';
import Banner from '../../components/Banner';
import SectionInfo from '../../components/SectionInfo';
import SectionPhotos from '../../components/SectionPhotos';
import SectionFriends from '../../components/SectionFriends';
import SectionInterested from '../../components/SectionInterested';
import SectionLive from '../../components/SectionLive';
import {mapGetters, mapActions, mapState, mapMutations} from "vuex";
export default {
  name: 'UserProfileImagePage',
  components: {
    TopNav,
    LeftNav,
    Banner,
    SectionInfo,
    SectionPhotos,
    SectionFriends,
    SectionInterested,
    SectionLive
  },
  data() {
    return {
      bannerActiveIndex: 3,
      rightContainerClass: '',
      photos: [],
      thumbnailDir: '',
      userId: ( this.$route.params.id === undefined? 'Not found' : this.$route.params.id ),
    };
  },
  async mounted() {
    this.onScroll();
    window.addEventListener('scroll', this.onScroll);
    const userID = ( this.userId === 'Not found'? this.profile.id : this.$route.params.id )
    await this.getImages({ userId: userID })
    this.photos = this.profile.images
    if(this.profile.images.length > 0){
      this.thumbnailDir = this.profile.images[0].hostPath
    }

  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  },
  computed: {
    ...mapGetters({
      user: 'authentication/user',
      profile: 'profile/information'
    }),
  },
  methods: {
    onScroll() {
      if(this.$refs.rightContainer && this.$refs.bannerContainer) {
        if(window.scrollY < this.$refs.bannerContainer.getHeight()+16) {
          this.rightContainerClass = '';
        } else {
          this.rightContainerClass = 'sticky';
        }
      }
    },
    
    showLightbox: function(imageName) {
      this.$refs.lightbox.show(imageName);
    },
    ...mapActions({
      getImages: 'profile/getImages'
    }),
  }
}
</script>
