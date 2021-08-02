<template>
  <TopNav />

  <div class="app-container">

    <div class="left-container">
      <div class="wrapper" data-simplebar>
        <LeftNav @on-click="(tab) => onClickTab(tab)" />
      </div>
    </div>

    <Banner :activeIndex="bannerActiveIndex" />
    
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
        <h4 class="fw-600 color-01">About</h4>
        <p class="mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et quam vitae erat 
          efficitur suscipit id non lorem. Maecenas eu felis quis sapien porttitor interdum. 
          Sed sit amet ex sapien. Quisque sed suscipit lectus. Suspendisse ac ante sit amet 
          mi mattis sagittis ac nec neque. Cras nec enim id eros porttitor luctus. Nunc tempor 
          mollis dolor, gravida consectetur velit. Sed ullamcorper, lectus et elementum molestie, 
          enim leo varius lacus, ut congue urna nulla non nibh. Nullam sed aliquet mi, et 
          tincidunt quam. Nulla sed orci metus.
        </p>
        <p class="mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et quam vitae erat 
          efficitur suscipit id non lorem. Maecenas eu felis quis sapien porttitor interdum. 
          Sed sit amet ex sapien. Quisque sed suscipit lectus. Suspendisse ac ante sit amet 
          mi mattis sagittis ac nec neque. Cras nec enim id eros porttitor luctus. Nunc tempor 
          mollis dolor, gravida consectetur velit. Sed ullamcorper, lectus et elementum molestie, 
          enim leo varius lacus, ut congue urna nulla non nibh. Nullam sed aliquet mi, et 
          tincidunt quam. Nulla sed orci metus.
        </p>
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
  name: 'UserProfileAboutPage',
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
      bannerActiveIndex: 0,
      rightContainerClass: ''
    };
  },
  mounted() {
    this.onScroll();
    window.addEventListener('scroll', this.onScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll() {
      if(this.$refs.rightContainer) {
        if(window.scrollY < 448) this.rightContainerClass = '';
        else this.rightContainerClass = 'sticky';
      }
    }
  }
}
</script>
