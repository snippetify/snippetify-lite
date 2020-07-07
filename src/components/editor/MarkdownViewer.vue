<template>
  <viewer
    :initial-value="value"
    class="markdown-viewer"
    @change="onChange"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import { Viewer } from '@toast-ui/vue-editor'

export default {
  components: {
    viewer: Viewer
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    onBlur (e) {
      this.$emit('blur', e)
    },
    onFocus (e) {
      this.$emit('focus', e)
    },
    onChange (e) {
      this.$emit('input', e)
    }
  }
}
</script>
