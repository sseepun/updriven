<style>
  .group-manage{padding:2rem 1.25rem 1.25rem;}
  .group-manage .title{text-align:center;}
  .group-manage .gallery-grids{width:60%;}
  .group-join{padding:2rem 1.25rem 1.25rem;}
  .group-join .gallery-grids{width:60%;}
  .x4s{font-size: 0.6rem;text-align: center;}
@media screen and (max-width:767.98px){
  .group-manage .gallery-grids{width:80%;}
  .group-join .gallery-grids{width:80%;}
}
/* Special Card 03 */
.ss-card-03{width:100%; display:flex; overflow:hidden;}
.ss-card-03 .img-container{width:18.75rem;}
.ss-card-03 .text-container{width:calc(100% - 8rem); padding:0.75rem 1rem; 
  display: flex; flex-direction: column;
}
.ss-card-03 .text-container .title{-webkit-line-clamp:1;}
.ss-card-03 .options{margin:1rem 0 0 0;}
@media screen and (max-width:991.98px){
    .ss-card-03 .img-container{width:15rem;}
    .ss-card-03 .text-container{width:calc(100% - 8rem); padding:1rem;}
}
@media screen and (max-width:767.98px){
/*    .ss-card-03 .img-container{width:5rem;}
    .ss-card-03 .text-container{width:calc(100% - 8rem);}*/
}
@media screen and (max-width:575.98px){
/*    .ss-card-03{flex-wrap:wrap;}
    .ss-card-03 .img-container{width:100%;}
    .ss-card-03 .text-container{width:100%;}*/
}

</style>

<template>
  <TopNav />

  <div class="app-container">

    <div class="left-container">
      <div class="wrapper" data-simplebar>
        <LeftNav @on-click="(tab) => onClickTab(tab)" />
      </div>
    </div>
    
    <div class="right-container" data-aos="fade-up" data-aos-delay="150">
      <div class="wrapper" data-simplebar>
        <div>
          <SectionSponsored />
        </div>
      </div>
    </div>

    <div class="middle-container">
      <div class="group-manage bshadow">
        <h6 class="title fw-600">Groups Your Manage</h6>
        <div class="gallery-grids" style="--ggs:.375rem;">
          <div v-for="(Gman, i) in Gman" :key="i" class="grid sm-25 mt-2">
            <a class="ss-img square bradius-1" href="#">
              <div class="img-bg" :style="'background-image:url(\''+Gman.img+'\');'"></div>
            </a>
            <p class="x4s fw-300 lh-3xs mt-1 .color-gray">{{Gman.text}}</p>
          </div>
          <div class="grid sm-25 mt-2">
            <a class="ss-img square bradius-1" href="#">
              <div class="img-bg" style="background-image:url('\\assets\\img\\profile\\01.jpg');"></div>
            </a>
          </div>
        </div>

      </div>
      <div class="group-join bshadow" style="padding:1.5rem;">
        <h6 class="title fw-600">Groups You've Joined</h6>
        <div class="gallery-grids" style="--ggs:.375rem;">
          <div v-for="(Gjoin, i) in Gjoin" :key="i" class="grid sm-25 mt-2">
            <a class="ss-img square bradius-1" href="#">
              <div class="img-bg" :style="'background-image:url(\''+Gjoin.img+'\');'"></div>
            </a>
            <p class="x4s fw-300 lh-3xs mt-1 .color-gray">{{Gjoin.text}}</p>
          </div>       
        </div>
      </div>
      <div class="list-interested">
        <h6 class="title fw-600 mt-1">You may be interested</h6>
        <div style="width:100%; max-width:900px;">
          <div class="gallery-grids">
            <div class="grid all-100">
              <div v-for="(Interest, i) in Interest" :key="i" class="ss-card ss-card-03 bshadow mt-3">
                <div class="img-container">
                  <a class="ss-img adaptive" href="#">
                    <div class="img-bg" :style="'background-image:url(\''+Interest.img+'\');'"></div>
                  </a>
                </div>
                <div class="text-container">
                  <a class="title h6 fw-600 color-dark h-color-01" href="#">
                      {{Interest.Title}}
                  </a>
                  <p class="desc fw-400 color-gray sm" style="flex-grow: 1;">
                      {{Interest.type}} group {{Interest.member}} members
                  </p>
                  <div class="options">
                    <div class="d-flex ai-center jc-space-between">
                      <div class="btns mt-0">
                        <a class="btn btn-action btn-md btn-color-01" href="#">
                          <span>JOIN</span>
                        </a>
                      </div>
                      <p class="fw-400 color-gray ws-nowrap sm">
                          {{Interest.post}} posts a week
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from '../../components/TopNav';
import LeftNav from '../../components/LeftNav';
import SectionSponsored from '../../components/SectionSponsored';

var vm = 10;
export default {
  name: 'UserGroupsPage',
  components: {
    TopNav,
    LeftNav,
    SectionSponsored
  },
    data() {
    return {
      Gman: [{img:'/assets/img/profile/13.jpg',text:'Python for Beginers'},
            {img:'/assets/img/profile/14.jpg',text:'Behind the Code'}],
      Gjoin:[{img:'/assets/img/profile/15.jpg',text:'Data Analyst Accelerated Bootcamp'},
            {img:'/assets/img/profile/16.jpg',text:'Industrial Robotics'},
            {img:'/assets/img/profile/17.jpg',text:'VFX & CG pricing (VFXTREME)'},
            {img:'/assets/img/profile/18.jpg',text:'Computer Gaming And Coding Sphere'}],
      Interest:[{img:'/assets/img/content/robot.jpg',Title:'Robot Fans',type:'Public',member:'21.8K',post:'45'},
                {img:'/assets/img/content/robot.jpg',Title:'Code for VR',type:'Public',member:'13K',post:'24'},
                {img:'/assets/img/content/robot.jpg',Title:'Arduino programming/coding',type:'Public',member:'42K',post:'70'},
                {img:'/assets/img/content/robot.jpg',Title:'Data Science NYU',type:'Private',member:'254',post:'17'},
                {img:'/assets/img/content/robot.jpg',Title:'Creative Cake',type:'Public',member:'140',post:'17'},
                {img:'/assets/img/content/robot.jpg',Title:'CG Artist',type:'Public',member:'33K',post:'85'}]
    }
  },
  mounted() {
    AOS.init({ easing: 'ease-in-out-cubic', duration: 750, once: true, offset: 10 });
  },
  methods: {
    createPost(post) {
      this.$refs['posts'].createPost(post);
    },
    onClickTab(tab) {
      if(tab.link=='javascript:'){
        this.$refs['posts'].updateCategory(tab);
      }else{
        window.location.href = tab.link;
      }
    }
  },
}
</script>
