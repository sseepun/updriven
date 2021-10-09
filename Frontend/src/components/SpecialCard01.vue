<template>
  <div class="ss-card ss-card-01 bshadow">
    <a v-if="editable" class="post-icon color-gray mr-0" href="javascript:" @click="$emit('on-edit');">
      <img class="m-2" src="/assets/img/icon/edit.png" alt="Image Icon" />
    </a>
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
  name: "SpecialCard01",
  props: {
    link: { type: String, default: "" },
    image: { type: String, default: "" },
    btnText: { type: String, default: "" },
    editable: { type: Boolean, default: false }
  },
  emits: [ 'on-edit' ]
};
</script>
