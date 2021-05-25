<template>
  <div class="ss-card ss-card-02">
    <div class="img-container">
      <a class="ss-img" :href="link">
        <div class="img-bg" :style="'background-image:url(\''+image+'\');'"></div>
        <div class="hover-container op-100">
          <div class="icon xs">
            <img src="/assets/img/icon/play-white.png" alt="Image Icon" />
          </div>
        </div>
      </a>
    </div>
    <div class="text-container">
      <a class="title p xxs fw-600 lh-xs" :href="link">
        {{title}}
      </a>
      <p class="xxxs color-gray">
        {{user.firstname}} {{user.lastname}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpecialCard02',
  props: {
    link: { type: String, default: '' },
    image: { type: String, default: '' },
    title: { type: String, default: '' },
    user: { type: Object, default: {} }
  }
}
</script>
