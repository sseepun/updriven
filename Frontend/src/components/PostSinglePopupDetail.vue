<template>
  <div class="popup-post-detail" :class="isActive ? 'active' : ''">
    <div class="wrapper">
      <div class="filter" @click="$emit('close')"></div>
      <div class="content">
        <div
          v-if="images.length > 1"
          class="arrow arrow-prev cursor-pointer"
          @click="imageIndex -= 1"
          :class="imageIndex < 1 ? 'disabled' : ''"
        >
          <img src="/assets/img/icon/chev-down.png" alt="Image Icon" />
        </div>
        <div class="img-container">
          <div class="wrapper">
            <div class="inner-wrapper">
              <template v-for="(image, i) in images" :key="i"
                ><div
                  v-if="removable && i == imageIndex"
                  class="img-icon color-gray mr-4"
                  v-on:click.stop
                  @click="$emit('remove', image.name)"
                >
                  <img
                    class="mr-2"
                    src="/assets/img/icon/close-round.png"
                    alt="Image Icon"
                    width="30"
                  />
                </div>
                <img
                  v-if="i == imageIndex"
                  :src="image.path"
                  alt="Image Content"
                />
              </template>
            </div>
          </div>
        </div>
        <div
          v-if="images.length > 1"
          class="arrow arrow-next cursor-pointer"
          @click="imageIndex += 1"
          :class="imageIndex == images.length - 1 ? 'disabled' : ''"
        >
          <img src="/assets/img/icon/chev-down.png" alt="Image Icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostSinglePopupDetail",
  props: {
    images: { type: Array, default: [] },
    isActive: { type: Boolean, default: false },
    removable: { type: Boolean, default: false },
  },
  data() {
    return {
      imageIndex: 0,
    };
  },
  emits: ["close", "remove"],
};
</script>