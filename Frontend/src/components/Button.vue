<template>

  <a v-if="type == 'Social Google'" :href="href" class="btn btn-action" :class="classer">
    <div class="img-social">
      <img src="/assets/img/icon/google.png" alt="Image Icon" />
    </div>
    <span>{{text}}</span>
  </a>

  <a v-else-if="type == 'Social Facebook'" :href="href" class="btn btn-action" :class="classer">
    <div class="img-social">
      <img src="/assets/img/icon/facebook.png" alt="Image Icon" />
    </div>
    <span>{{text}}</span>
  </a>

  <button v-else-if="type" :type="type" class="btn btn-action" :class="classer">
    <img v-if="iconPrepend" 
      class="img-icon mr-1" :src="'/assets/img/icon/'+iconPrepend" alt="Image Icon" 
    />
    <span>{{text}}</span>
    <img v-if="iconAppend" 
      class="img-icon ml-1" :src="'/assets/img/icon/'+iconAppend" alt="Image Icon" 
    />
  </button>

  <a v-else-if="href.indexOf('javascript') > -1" href="javascript:" 
    class="btn btn-action" :class="classer"
  >
    <img v-if="iconPrepend" 
      class="img-icon mr-1" :src="'/assets/img/icon/'+iconPrepend" alt="Image Icon" 
    />
    <span>{{text}}</span>
    <img v-if="iconAppend" 
      class="img-icon ml-1" :src="'/assets/img/icon/'+iconAppend" alt="Image Icon" 
    />
  </a>

  <router-link v-else :to="href" class="btn btn-action" :class="classer">
    <img v-if="iconPrepend" 
      class="img-icon mr-1" :src="'/assets/img/icon/'+iconPrepend" alt="Image Icon" 
    />
    <span>{{text}}</span>
    <img v-if="iconAppend" 
      class="img-icon ml-1" :src="'/assets/img/icon/'+iconAppend" alt="Image Icon" 
    />
  </router-link>

</template>

<script>
export default {
  name: 'Button',
  props: {
    type: { type: String, default: '' },
    href: { type: String, default: '' },
    text: { type: String, default: '' },
    classer: { type: String, default: '' },
    iconPrepend: { type: String, default: '' },
    iconAppend: { type: String, default: '' }
  }
}
</script>
