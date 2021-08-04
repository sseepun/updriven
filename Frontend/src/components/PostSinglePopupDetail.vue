<template>
  <div class="popup-post-detail" :class="isActive? 'active': ''">
    <div class="wrapper">
      <div class="filter" @click="$emit('close')"></div>
      <div class="content">
        <div 
          v-if="images.length > 1" class="arrow arrow-prev cursor-pointer" 
          @click="imageIndex -= 1" :class="imageIndex < 1? 'disabled': ''" 
        >
          <img src="/assets/img/icon/chev-down.png" alt="Image Icon" />
        </div>
        <div class="img-container">
          <div class="wrapper">
            <div class="inner-wrapper">
              <template v-for="(image, i) in images" :key="i">
                <img v-if="i == imageIndex" :src="image.path" alt="Image Content" />
              </template>
            </div>
          </div>
        </div>
        <div 
          v-if="images.length > 1" class="arrow arrow-next cursor-pointer" 
          @click="imageIndex += 1" :class="imageIndex == images.length-1? 'disabled': ''" 
        >
          <img src="/assets/img/icon/chev-down.png" alt="Image Icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Popup Post Detail */
.popup-post-detail *{
  user-select:none; -webkit-user-select:none; -moz-user-select:none;
  -khtml-user-select:none; -ms-user-select:none;
}
.popup-post-detail{
  position:fixed; top:0; left:0; width:100%; height:100vh; opacity:0; z-index:100;
  background:rgba(0,0,0,.9); pointer-events:all; transition:opacity .25s;
}
.popup-post-detail.active{opacity:1; pointer-events:auto;}
.popup-post-detail > .wrapper{
  display:flex; align-items:center; justify-content:center; position:relative; 
  width:100%; height:100%; padding:1rem;
}
.popup-post-detail > .wrapper > .filter{
  position:absolute; top:0; bottom:0; left:0; right:0; cursor:pointer;
}
.popup-post-detail .content{
  position:relative; width:100%; max-width:64rem; padding:1rem 0; border-radius:.25rem;
  display:flex; align-items:center; justify-content:center;
  pointer-events:all; border-radius:.25rem;
}
.popup-post-detail .arrow{
  display:flex; align-items:center; justify-content:center; width:3rem; height:3rem;
  border:2px solid transparent; border-radius:.25rem; margin:0 1rem 0 0;
  transition:opacity .25s;
}
.popup-post-detail .arrow.arrow-next{margin:0 0 0 1rem;}
.popup-post-detail .arrow:hover{opacity:.7;}
.popup-post-detail .arrow.disabled{opacity:.4; pointer-events:none;}
.popup-post-detail .arrow > img{
  display:block; width:60%; height:auto; margin:0 .125rem 0 0; transform:rotate(90deg);
}
.popup-post-detail .arrow.arrow-next > img{margin:0 0 0 .125rem; transform:rotate(-90deg);}
.popup-post-detail .img-container{width:calc(100% - 8rem);}
.popup-post-detail .img-container .wrapper{
  position:relative; display:block; width:100%; padding:66% 0 0 0;
}
.popup-post-detail .img-container .inner-wrapper{
  position:absolute; top:0; bottom:0; left:0; right:0; display:flex; align-items:center;
  justify-content:center;
}
.popup-post-detail .img-container img{
  display:block; width:auto; max-width:100%; height:auto; max-height:100%;
}
@media screen and (max-width:767.98px){
  .popup-post-detail .arrow{width:2.5rem; height:2.5rem; margin:0 .5rem 0 0;}
  .popup-post-detail .arrow.arrow-next{margin:0 0 0 .5rem;}
  .popup-post-detail .img-container{width:calc(100% - 6rem);}
}
@media screen and (max-width:575.98px){
  .popup-post-detail .arrow{width:2rem; height:2rem; margin:0 .5rem 0 0;}
  .popup-post-detail .arrow.arrow-next{margin:0 0 0 .5rem;}
  .popup-post-detail .img-container{width:calc(100% - 5rem);}
}
/* Popup Post Detail */
.popup-post-detail .content{background:#ffffff;}
.popup-post-detail .arrow{border-color:#ffffff; background:#ffffff;}
</style>

<script>
export default {
  name: 'PostSinglePopupDetail',
  props: {
    images: { type: Array, default: [] },
    isActive: { type: Boolean, default: false },
  },
  data() {
    return {
      imageIndex: 0
    };
  },
  emits: ['close']
}
</script>