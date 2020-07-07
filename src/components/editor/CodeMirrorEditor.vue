<template>
  <div>
    <codemirror
      ref="editor"
      class="code-mirror"
      :options="options"
      :value="value"
      :style="`height:${height}`"
      :class="{'has-error': hasError, 'has-state': hasState}"
      @input="onChange"
      @focus="onFocus"
      @blur="onBlur"
    />
    <div v-if="hasError">
      <p v-for="(item, i) in errorMessages" :key="i" class="caption error--text pa-2">
        {{ item }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default () {
        return this.$t('add_description_here')
      }
    },
    rules: { // Existing rules
      type: Array,
      default: () => []
    },
    height: {
      type: String,
      default: '300px'
    },
    errorMessages: { // Error messages
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      hasState: false,
      options: {
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,
        placeholder: this.placeholder
      }
    }
  },
  computed: {
    hasError () {
      return (this.errorMessages || []).filter(v => v).length > 0
    }
  },
  watch: {
    value (v, w) {
      if (v === w) { return }
      this.$refs.editor.codemirror.refresh()
    }
  },
  methods: {
    onBlur (e) {
      this.$emit('blur', e)
      this.hasState = false
    },
    onFocus (e) {
      this.$emit('focus', e)
      this.hasState = !this._.isEmpty(this.value)
    },
    onChange (v) {
      this.$emit('input', v)
      this.hasState = !this._.isEmpty(this.value)
    }
  }
}
</script>
