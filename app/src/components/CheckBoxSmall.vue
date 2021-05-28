<template>
  <div class="checkbox-single" :class="classer">
    <div class="checkbox">
      <input
        type="checkbox" 
        :name="name" :id="'c_'+randId" 
        v-model="value" 
        @input="(event)=>$emit('input', event.target.value)" 
        @focusin="isFocused = true" @focusout="isFocused = false" 
        :required="required? true: false" 
      />
    </div>
    <label :for="'c_'+randId" v-html="text"></label>
  </div>
</template>

<script>
export default {
  name: 'CheckBoxSmall',
  props: {
    classer: { type: String, default: '' },
    value: { type: [String, Number, Date], default: '' },
    text: { type: String, default: '' },
    name: { type: String, default: '' },
    required: { type: Boolean, default: false }
  },
  data() {
    return {
      randId: Math.round(Math.random()*1000000),
      isFocused: false
    }
  }
}
</script>
