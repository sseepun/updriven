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
       
         <div v-if="user">
          <div class="gallery-grids grid-round mt-1" style="--ggs:.125rem;">
            <div v-for="(photo, i) in photos" :key="i" class="grid sm-1-3">
              <a class="ss-img square" @click="showLightbox(photo.name)"  >
                <div class="img-bg" :style="'background-image:url(\''+photo.image+'\');'"></div>
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    <lightbox id="mylightbox" 
      ref="lightbox"
      :images="photos"
      :directory="thumbnailDir"
      :timeout-duration=5000
      :close-on-backdrop-click=true
  />

    

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
      thumbnailDir: '/assets/img/profile/',
    };
  },
  mounted() {
    this.onScroll();
    window.addEventListener('scroll', this.onScroll);
    this.loadData(12);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  },
  computed: {
    ...mapGetters({
      user: 'authentication/user'
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
    loadData(num) {
      for(var i=0; i<num; i++){
        var id = this.photos.length + i + 1;
        this.photos.push({
          id: id,
          image: `/assets/img/profile/0${id%9+1}.jpg`,
          name:`0${id%9+1}.jpg`,
        });
      }
    },
    showLightbox: function(imageName) {
      console.log(imageName)
      this.$refs.lightbox.show(imageName);
    },
  }
}
</script>
