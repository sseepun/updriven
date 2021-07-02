<template>
  <div v-if="avatar" class="avatar" :class="classer">
    <div class="img-bg" :style="'background-image:url(\''+avatar+'\');'"></div>
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    avatar: { type: String, default: '' },
    classer: { type: String, default: '' }
  }
}
</script>
