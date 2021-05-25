<template>
  <div class="ss-card ss-card-01 bshadow">
    <a v-if="image" class="img-wrapper" :href="link">
        <img :src="image" alt="Image Content" />
    </a>
    <div v-if="btnText" class="text-container">
      <div class="btns text-center">
        <Button :href="link" classer="btn-color-01" :text="btnText" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpecialCard01',
  props: {
    link: { type: String, default: '' },
    image: { type: String, default: '' },
    btnText: { type: String, default: '' }
  }
}
</script>
