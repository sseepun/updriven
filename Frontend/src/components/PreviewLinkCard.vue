<template>
  <div class="ss-card ss-card-01 bshadow">
    {{ title }}
    <a v-if="image" class="img-wrapper" :href="url">
        <img :src="image" alt="Image Content" />
    </a>
    {{ description }}
  </div>
</template>

<script>
export default {
  name: 'PreviewLinkCard',
  props: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    url: { type: String, default: '' },
    image: { type: String, default: '' },
  }
}
</script>
