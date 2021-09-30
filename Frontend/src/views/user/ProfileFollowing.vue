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
      <h4 class="fw-600 color-01">Your Following</h4>
      </div>
      <div class="box-container full bshadow m-0">
        <p class="mt-4">
          
          <div  class=" ovf-hidden">
            <div class="content-container"  >
              <div  :style="' padding: 10px;width:100%; display:flex; align-items:flex-end;'" >
                <div class="avatar-container">
                  <Avatar class="img-bg" :style="''" :avatar="user.avatar" classer="xxl border-4 bcolor-white" />
                </div>
                <div class="text" :style="'margin-left: 30px;'">
                  <h6 class="p lg fw-500">
                    Unknown Unknown
                  </h6>
                  <p class="xxs fw-500 color-gray">
                    Role : Learner
                    
                  </p>
                  <p class="xxs fw-500 color-gray">
                  Balkh, Afghanistan
                    </p>
                </div>
              </div>   
              <div class="btn " :style="'width:100%; display: flex ; justify-content: flex-end;'">
                  <Button 
                    href="#" text="UNFOLLOW" 
                    classer="d-block btn-color-03 btn-sm pl-4 pr-4 mr-2" 
                    :style="'width:120px;'"
                  />
                </div>
            </div>
          </div>
        </p>
      </div>

      <div class="box-container full bshadow m-0">
        <p class="mt-4">
          
          <div  class=" ovf-hidden">
            <div class="content-container"  >
              <div  :style="' padding: 10px;width:100%; display:flex; align-items:flex-end;'" >
                <div class="avatar-container">
                  <Avatar class="img-bg" :style="''" :avatar="user.avatar" classer="xxl border-4 bcolor-white" />
                </div>
                <div class="text" :style="'margin-left: 30px;'">
                  <h6 class="p lg fw-500">
                    Unknown Unknown
                  </h6>
                  <p class="xxs fw-500 color-gray">
                    Role : Learner
                    
                  </p>
                  <p class="xxs fw-500 color-gray">
                  Balkh, Afghanistan
                    </p>
                </div>
              </div>   
              <div class="btn " :style="'width:100%; display: flex ; justify-content: flex-end;'">
                  <Button 
                    href="#" text="UNFOLLOW" 
                    classer="d-block btn-color-03 btn-sm pl-4 pr-4 mr-2" 
                    :style="'width:120px;'"
                  />
                </div>
            </div>
          </div>
        </p>
      </div>

      <div class="box-container full bshadow m-0">
        <p class="mt-4">
          
          <div  class=" ovf-hidden">
            <div class="content-container"  >
              <div  :style="' padding: 10px;width:100%; display:flex; align-items:flex-end;'" >
                <div class="avatar-container">
                  <Avatar class="img-bg" :style="''" :avatar="user.avatar" classer="xxl border-4 bcolor-white" />
                </div>
                <div class="text" :style="'margin-left: 30px;'">
                  <h6 class="p lg fw-500">
                    Unknown Unknown
                  </h6>
                  <p class="xxs fw-500 color-gray">
                    Role : Learner
                    
                  </p>
                  <p class="xxs fw-500 color-gray">
                  Balkh, Afghanistan
                    </p>
                </div>
              </div>   
              <div class="btn " :style="'width:100%; display: flex ; justify-content: flex-end;'">
                  <Button 
                    href="#" text="UNFOLLOW" 
                    classer="d-block btn-color-03 btn-sm pl-4 pr-4 mr-2" 
                    :style="'width:120px;'"
                  />
                </div>
            </div>
          </div>
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
  name: 'UserProfileFollowingPage',
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
      bannerActiveIndex: 2,
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
  }
}
</script>
