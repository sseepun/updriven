<template>

  <div v-if="type === 'textarea'" class="form-group" :class="classer">
    <label v-if="label" class="p" :class="{ 'focused': isFocused }">
      {{label}} <div v-if="errorText" class="error">{{errorText}}</div>
    </label>
    <div :class="wrapperClass">
      <textarea 
        :name="name" :rows="rows" 
        :placeholder="placeholder" 
        v-model="value" 
        @input="(event)=>$emit('input', event.target.value)" 
        @focusin="isFocused = true" @focusout="isFocused = false" 
        :required="required? true: false"
        :readonly="readonly? true: false"
        :disabled="disabled? true: false"
      ></textarea>
      <div v-if="icon" class="icon">
        <img :src="'/assets/img/icon/'+icon" alt="Image Icon" />
      </div>
    </div>
  </div>

  <div v-else-if="type === 'select'" class="form-group" :class="classer">
    <label v-if="label" class="p" :class="{ 'focused': isFocused }">
      {{label}} <div v-if="errorText" class="error">{{errorText}}</div>
    </label>
    <div :class="wrapperClass">
      <select 
        :name="name" 
        v-model="value" 
        @input="(event)=>$emit('input', event.target.value)" 
        @focusin="isFocused = true" @focusout="isFocused = false" 
        :required="required? true: false"
        :readonly="readonly? true: false"
        :disabled="disabled? true: false"
      >
        <option v-if="placeholder" value="" disabled selected>
          {{placeholder}}
        </option>
        <option v-for="option in options" :value="option.abbreviation" 
        :selected="option.abbreviation == value || option.name == value" :key="option.abbreviation">
          {{option.name}}
        </option>
      </select>
      <div v-if="icon" class="icon">
        <img :src="'/assets/img/icon/'+icon" alt="Image Icon" />
      </div>
    </div>
  </div>

  <div v-else-if="type === 'country'" class="form-group" :class="classer">
    <label v-if="label" class="p" :class="{ 'focused': isFocused }">
      {{label}} <div v-if="errorText" class="error">{{errorText}}</div>
    </label>
    <div :class="wrapperClass">
      <select 
        :name="name" 
        v-model="value" 
        @input="(event)=>$emit('input', event.target.value)" 
        @focusin="isFocused = true" @focusout="isFocused = false" 
        :required="required? true: false"
        :readonly="readonly? true: false"
        :disabled="disabled? true: false"
      >
        <option v-if="placeholder" value="" disabled selected>
          {{placeholder}}
        </option>
        <option v-for="option in options" :value="option.numeric_code" 
        :selected="option.numeric_code == value || option.name == value" :key="option.numeric_code">
          {{option.name}}
        </option>
      </select>
      <div v-if="icon" class="icon">
        <img :src="'/assets/img/icon/'+icon" alt="Image Icon" />
      </div>
    </div>
  </div>

 <div v-else-if="type === 'state'" class="form-group" :class="classer">
    <label v-if="label" class="p" :class="{ 'focused': isFocused }">
      {{label}} <div v-if="errorText" class="error">{{errorText}}</div>
    </label>
    <div :class="wrapperClass">
      <select 
        :name="name" 
        v-model="value" 
        @input="(event)=>$emit('input', event.target.value)" 
        @focusin="isFocused = true" @focusout="isFocused = false" 
        :required="required? true: false"
        :readonly="readonly? true: false"
        :disabled="disabled? true: false"
      >
        <option v-if="placeholder" value="" disabled selected>
          {{placeholder}}
        </option>
        <option v-for="option in options" :value="option.state_code" 
        :selected="option.state_code == value || option.name == value" :key="option.state_code">
          {{option.name}}
        </option>
      </select>
      <div v-if="icon" class="icon">
        <img :src="'/assets/img/icon/'+icon" alt="Image Icon" />
      </div>
    </div>
  </div>

  <div v-else-if="type == 'plain'" class="form-group" :class="classer">
    <label v-if="label" class="p">
      {{label}} <div v-if="errorText" class="error">{{errorText}}</div>
    </label>
    <div :class="wrapperClass">
      <div class="plain-text">
        <p v-html="value"></p>
      </div>
    </div>
  </div>

  <div v-else class="form-group" :class="classer">
    <label v-if="label" class="p" :class="{ 'focused': isFocused }">
      {{label}} 
      <div v-if="errorText" class="error">{{errorText}}</div> 
      <div v-if="sublabel && !sublabelLink">{{sublabel}}</div>
      <div v-else-if="sublabel && sublabelLink">
        <router-link :to="sublabelLink" class="color-01 h-color-black fw-300">
          {{sublabel}}
        </router-link>
      </div> 
    </label>
    <div :class="wrapperClass">
      <input
        :type="type" 
        :name="name" 
        :placeholder="placeholder" 
        v-model="value" 
        @input="(event)=>$emit('input', event.target.value)" 
        @focusin="isFocused = true" @focusout="isFocused = false" 
        :required="required? true: false"
        :readonly="readonly? true: false"
        :disabled="disabled? true: false"
      />
      <div v-if="icon" class="icon">
        <img :src="'/assets/img/icon/'+icon" alt="Image Icon" />
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'FormGroup',
  props: {
    classer: { type: String, default: '' },
    value: { type: [String, Number, Date], default: '' },
    label: { type: String, default: '' },
    desc: { type: String, default: '' },
    errorText: { type: String, default: '' },
    type: { type: String, default: 'text' },
    name: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    required: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    options: { type: Array, default: [] },
    wrapperClass: { type: String, default: '' },
    icon: { type: String, default: '' },
    selectOptions: { type: Array, default: [] },
    selectInput: { type: Boolean, default: false},
    rows: { type: Number, default: 5},
    sublabel: { type: String, default: '' },
    sublabelLink: { type: String, default: '' },
  },
  data() {
    return {
      isFocused: false
    }
  },
  methods: {
    handleInput() {
      return this.$emit('input', this.value);
    }
  },
  emits: [ 'input', 'input2', 'input-file' ]
}
</script>
