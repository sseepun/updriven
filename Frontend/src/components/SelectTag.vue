<template>
  <div class="form-group" :class="classer">
    <label v-if="label" class="p" :class="{ 'focused': isFocused }">
      {{label}} 
    </label>
    <div :class="wrapperClass">
      <input
        type="text" :name="'selecttag_'+randId" 
        @focusin="isFocused = true" @focusout="isFocused = false" 
        :required="required? true: false"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectTag',
  props: {
    classer: { type: String, default: '' },
    wrapperClass: { type: String, default: '' },

    label: { type: String, default: '' },
    value: { type: Array, default: [] },
    options: { type: Array, default: [] },
  },
  data() {
    return {
      randId: Math.round(Math.random() * 1000000),
      isFocused: false
    }
  },
  methods: {
      
  }
}
</script>
