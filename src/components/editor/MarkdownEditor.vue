<template>
  <div>
    <editor
      ref="editor"
      :height="height"
      :options="options"
      :initial-value="value"
      class="markdown-editor"
      preview-style="tab"
      initial-edit-type="markdown"
      :class="{'has-error': hasError, 'has-state': hasState}"
      @change="onChange"
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
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'

export default {
  components: {
    editor: Editor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    clear: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: '300px'
    },
    minHeight: {
      type: String,
      default: '200px'
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
    errorMessages: { // Error messages
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      hasState: false,
      options: {
        usageStatistics: true,
        hideModeSwitch: false,
        minHeight: this.minHeight,
        placeholder: this.placeholder
      }
    }
  },
  computed: {
    hasError () {
      return (this.errorMessages || []).filter(v => v).length > 0
    },
    htmlValue () {
      return this.$refs.editor.invoke('getHtml')
    },
    markdownValue () {
      return this.$refs.editor.invoke('getMarkdown')
    }
  },
  watch: {
    clear (v) {
      if (v === true) { this.$refs.editor.invoke('reset') }
    }
  },
  methods: {
    onBlur (e) {
      this.$emit('blur', e)
      this.hasState = false
    },
    onFocus (e) {
      this.$emit('focus', e)
      this.hasState = !this._.isEmpty(this.markdownValue)
    },
    onChange () {
      this.$emit('input', this.markdownValue)
      this.hasState = !this._.isEmpty(this.markdownValue)
    }
  }
}
</script>
