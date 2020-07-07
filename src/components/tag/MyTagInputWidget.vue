<template>
  <v-combobox
    :items="items"
    :multiple="multiple"
    :no-filter="noFilter"
    chips
    :solo="label === null"
    :label="label"
    clearable
    hide-details="auto"
    hide-selected
    :hint="hint"
    :rules="rules"
    item-text="name"
    item-value="id"
    :value="value"
    :error-messages="errorMessages"
    :persistent-hint="!!hint"
    :disabled="disabled"
    :auto-select-first="autoSelectFirst"
    :hide-no-data="isMenuHidden"
    :loading="loading"
    :search-input.sync="search"
    :placeholder="placeholder"
    flat
    outlined
    @input="onUpdate"
    @focus="onFocus"
    @blur="onBlur"
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title class="d-flex align-center">
          <span class="text--secondary">
            {{ $t('no_results') }} "<strong>{{ search }}</strong>".
            <span v-if="!autoSelectFirst" v-html="$t('html.press_enter_to_create')" />
          </span>
        </v-list-item-title>
      </v-list-item>
    </template>
    <template v-slot:item="data">
      <v-avatar size="24" left color="grey darken-2" class="mr-3 white--text">
        <v-icon v-if="data.item.icon" small color="white">
          {{ data.item.icon }}
        </v-icon>
        <span v-else class="caption font-weight-bold">{{ (data.item.name || '').charAt(0).toUpperCase() }}</span>
      </v-avatar>
      <v-list-item-content style="width:60%">
        <v-list-item-title>{{ data.item.name }}</v-list-item-title>
        <v-list-item-subtitle v-if="data.item.description" class="mt-1" style="max-width:500px;">
          {{ data.item.description.substring(0, 200) }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-icon v-if="data.item.trusted" x-small color="green" class="mr-2">
        mdi-shield-check
      </v-icon>
      <span v-if="data.item.score" class="caption font-weight-bold text--disabled">({{ data.item.score }})</span>
    </template>
    <template v-slot:selection="data">
      <v-chip
        :key="data.value"
        v-bind="data.attrs"
        color="blue-grey"
        class="white--text pr-1"
        :input-value="data.selected"
        :disabled="data.disabled"
        v-on="data.on"
      >
        <v-avatar left color="grey darken-2" class="white--text">
          <v-icon v-if="data.item.icon" small color="white">
            {{ data.item.icon }}
          </v-icon>
          <span v-else class="caption font-weight-bold">{{ (data.item.name || '').charAt(0).toUpperCase() }}</span>
        </v-avatar>
        <span v-text="data.item.name" />
        <v-icon v-if="data.item.trusted" x-small color="white" class="ml-2">
          mdi-shield-check
        </v-icon>
        <v-btn small icon class="ml-1" @click="data.parent.selectItem(data.item)">
          <v-icon small color="white">
            mdi-close
          </v-icon>
        </v-btn>
      </v-chip>
    </template>
  </v-combobox>
</template>

<script>
import { mapGetters } from 'vuex'
import { SET_MANY } from '@/store/mutations.type'
import {
  FETCH_MANY
} from '@/store/actions.type'

export default {
  props: {
    value: { // Existing value
      type: Array,
      default: () => []
    },
    rules: { // Existing rules
      type: Array,
      default: () => []
    },
    errorMessages: { // Error messages
      type: Array,
      default: () => []
    },
    disabled: { // Disable input
      type: Boolean,
      default: false
    },
    label: { // Label
      type: String,
      default: null
    },
    hint: { // Hint
      type: String,
      default: null
    },
    noFilter: { // noFilter
      type: Boolean,
      default: true
    },
    placeholder: { // Placeholder
      type: String,
      default () { return this.$t('add_some_tags') }
    },
    autoSelectFirst: { // When true can't create string tag, good for filtering
      type: Boolean,
      default: false
    },
    multiple: { // For multiple selection
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      limit: 50,
      search: null,
      loading: false,
      searchDebounce: undefined
    }
  },
  computed: {
    ...mapGetters('search', ['items']),
    isMenuHidden () {
      return (this.search || '').trim().length < 1
    }
  },
  watch: {
    search (v) {
      if ((v || '').trim().length < 1) { return }
      if (this.searchDebounce) { this.searchDebounce.cancel() }
      this.$store.commit(`search/${SET_MANY}`, []) // Empty search
      this.searchDebounce = this._.debounce(() => {
        this.loading = true
        this.$store
          .dispatch(`search/${FETCH_MANY}`, { filter: { q: v, type: 'tag' }, limit: this.limit })
          .finally(() => {
            this.loading = false
          })
      }, 300)
      this.searchDebounce()
    }
  },
  methods: {
    onUpdate (val) {
      const tags = (val || []).map((v) => {
        if (typeof v === 'string') {
          v = { name: this._.upperFirst(v) }
        }
        return v
      }).filter(v => (v.name || '').trim().length > 0)
      this.search = null
      this.$emit('input', tags)
    },
    onBlur (e) {
      this.$emit('blur', e)
    },
    onFocus (e) {
      this.$emit('focus', e)
    }
  }
}
</script>
