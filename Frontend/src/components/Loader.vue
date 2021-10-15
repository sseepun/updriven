<template>
  <div class="lds-wrapper" :class="active ? 'active' : ''">
    <div class="lds-default">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    active: { type: Boolean, default: false }
  }
};
</script>