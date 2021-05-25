<template>

  <button v-if="type" :type="type" class="btn btn-action" :class="classer">
    <img v-if="iconPrepend" 
      class="img-icon mr-1" :src="'/assets/img/icon/'+iconPrepend" alt="Image Icon" 
    />
    <span>{{text}}</span>
    <img v-if="iconAppend" 
      class="img-icon ml-1" :src="'/assets/img/icon/'+iconAppend" alt="Image Icon" 
    />
  </button>

  <a v-else :href="href" class="btn btn-action" :class="classer">
    <img v-if="iconPrepend" 
      class="img-icon mr-1" :src="'/assets/img/icon/'+iconPrepend" alt="Image Icon" 
    />
    <span>{{text}}</span>
    <img v-if="iconAppend" 
      class="img-icon ml-1" :src="'/assets/img/icon/'+iconAppend" alt="Image Icon" 
    />
  </a>

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
