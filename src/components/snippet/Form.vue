<template>
  <v-card :loading="saving">
    <v-card-title primary-title class="headline text-left text-capitalize">
      <v-avatar size="32" class="mr-3">
        <v-img class=" deep-orange" src="https://snippetify.com/apple-touch-icon.png" alt="Snippetify logo">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <span style="color:#fff" class="body-1 font-weight-bold text-uppercase">{S}</span>
            </v-row>
          </template>
        </v-img>
      </v-avatar>
      {{ $t('save_snippet_') }}
    </v-card-title>
    <v-divider />
    <v-card-text v-if="!done" class="pt-4">
      <validation-observer ref="form">
        <div class="mb-4">
          <label for="title" class="caption font-weight-bold ml-1 text-capitalize">{{ $t('title') }}*</label>
          <validation-provider v-slot="{ errors: veeErrors }" :name="$t('title')" rules="required">
            <v-text-field
              id="title"
              v-model="form.title"
              class="mt-2"
              solo
              outlined
              flat
              autofocus="on"
              autocomplete="off"
              hide-details="auto"
              :persistent-hint="false"
              :error-messages="concatErrors(errors.title, veeErrors)"
              :placeholder="$t('form.placeholder.title')"
            />
          </validation-provider>
        </div>
        <div class="mb-4">
          <label for="code" class="caption font-weight-bold ml-1 text-capitalize">{{ $t('code') }}*</label>
          <validation-provider v-slot="{ errors: veeErrors }" :name="$t('code')" rules="required">
            <code-mirror-editor
              id="code"
              class="mt-2"
              v-model="form.code"
              :height="'200px'"
              :error-messages="concatErrors(errors.code, veeErrors)"
              :placeholder="$t('form.placeholder.code')"
            />
          </validation-provider>
        </div>
        <div class="mb-4">
          <label for="description" class="caption font-weight-bold ml-1 text-capitalize">{{ $t('description') }}*</label>
          <validation-provider v-slot="{ errors: veeErrors }" :name="$t('description')" rules="required">
            <markdown-editor
              id="description"
              class="mt-2"
              v-model="form.description"
              :height="'200px'"
              :error-messages="concatErrors(errors.description, veeErrors)"
              :placeholder="$t('form.placeholder.description')"
            />
          </validation-provider>
        </div>
        <div class="mb-4">
          <label for="type" class="caption font-weight-bold ml-1 text-capitalize">{{ $t('type') }}*</label>
          <validation-provider v-slot="{ errors: veeErrors }" :name="$t('name')" rules="required">
            <v-select
              id="type"
              v-model="form.type"
              class="mt-2"
              solo
              outlined
              flat
              :items="types"
              hide-details="auto"
              :persistent-hint="false"
              :error-messages="concatErrors(errors.type, veeErrors)"
              :placeholder="$t('form.placeholder.type')"
            />
          </validation-provider>
        </div>
        <div class="mb-4">
          <label for="tags" class="caption font-weight-bold ml-1 text-capitalize">{{ $t('tags') }}*</label>
          <validation-provider v-slot="{ errors: veeErrors }" :name="$t('tags')" rules="required">
            <my-tag-input-widget
              class="mt-2"
              v-model="form.tags"
              placeholder="Javascript, java, php, .net..."
              :error-messages="concatErrors(errors.tags, veeErrors)"
            />
          </validation-provider>
        </div>
      </validation-observer>
    </v-card-text>
    <v-card-text v-else class="pt-6 pb-6 text-center">
      <p>
        <v-icon x-large class="pa-6 green green--text lighten-5 rounded-circle">
          mdi-check-circle-outline
        </v-icon>
      </p>
      <h3 class="display-1">
        {{ $t('snippet_saved') }}
      </h3>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <v-btn color="error" text depressed large @click="close">
        {{ $t('close') }}
      </v-btn>
      <v-btn
        v-if="!done"
        depressed
        large
        color="deep-orange"
        class="white--text text-none"
        :disabled="!valid || saving"
        :loading="saving"
        @click="submit"
      >
        <template v-slot:loader>
          <span>{{ $t('saving_dots') }}</span>
        </template>
        {{ $t('save') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>
input, textarea{
  border-width: 5px!important;
}
label{
  cursor: pointer;
}
</style>

<script>
import { mapGetters } from 'vuex'
import MarkdownEditor from '@/components/editor/MarkdownEditor.vue'
import MyTagInputWidget from '@/components/tag/MyTagInputWidget.vue'
import CodeMirrorEditor from '@/components/editor/CodeMirrorEditor.vue'
import { required } from 'vee-validate/dist/rules'
import { extend } from 'vee-validate'
import {
  SET_ONE
} from '@/store/mutations.type'
import {
  SAVE
} from '@/store/actions.type'

extend('required', {
  ...required,
  message: 'form.validator.required_field'
})

export default {
  components: {
    MarkdownEditor,
    CodeMirrorEditor,
    MyTagInputWidget
  },
  data () {
    return {
      form: {},
      errors: {},
      done: false,
      saving: false
    }
  },
  computed: {
    ...mapGetters(['vscode']),
    ...mapGetters('snippet', ['snippet', 'types']),
    valid () {
      return (this.form.title || {}).length > 0 &&
        (this.form.code || {}).length > 0 &&
        (this.form.description || {}).length > 0 &&
        (this.form.type || {}).length > 0 &&
        (this.form.tags || {}).length > 0
    }
  },
  watch: {
    form: {
      deep: true,
      handler () {
        this.errors = {}
      }
    },
    snippet: {
      immediate: true,
      handler (v) {
        this.form = v ? { ...this.snippet } : { type: 'wiki' }
      }
    }
  },
  methods: {
    close () {
      this.vscode.postMessage({ action: 'close' })
    },
    submit () {
      this.$refs.form.validate().then((success) => {
        if (!success) { return }

        this.saving = true
        this.$store
          .dispatch(`snippet/${SAVE}`, this.getPayload())
          .then(() => {
            // this.done = true
            this.$store.commit(`snippet/${SET_ONE}`, {})
            this.$refs.form.reset()
            // this._.delay(() => {
            //   this.done = false
            //   // this.close()
            // }, 2000)
            this.vscode.postMessage({
              action: "alert",
              type: "success",
              context: 'saved',
              message: this.$t("snippet_saved_")
            })
          })
          .catch((e) => {
            this.errors = e.response.data.errors || {}
          })
          .finally(() => {
            this.saving = false
          })
      })
    },
    getPayload () {
      return {
        meta: this.form.meta,
        code: this.form.code,
        type: this.form.type,
        title: this.form.title,
        description: this.form.description,
        tags: this.form.tags.map(v => v.name).filter(v => !this._.isEmpty(v))
      }
    },
    concatErrors (v, w) {
      return (v || []).concat((w || []).filter(e => e).map(e => this.$t(e)))
    }
  }
}
</script>
