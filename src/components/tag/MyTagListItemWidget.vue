<template>
  <v-chip
    :close="close"
    :small="small"
    tag="div"
    class="ma-1 pr-4"
    @click:close="onClose"
  >
    <v-avatar v-if="!small" left color="grey darken-2">
      <v-img v-if="!!item.icon" />
      <v-icon v-else small color="white">
        mdi-pound
      </v-icon>
    </v-avatar>
    <span class="text-capitalize">{{ item.name }}</span>
    <v-icon v-if="item.trusted" small color="green" class="ml-2">
      mdi-shield-check
    </v-icon>
    <template v-if="!!item.score">
      <small class="deep-orange--text ml-2 caption text--lighten-1">({{ item.score }})</small>
    </template>
  </v-chip>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    small: {
      type: Boolean,
      default: false
    },
    close: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClose () {
      this.$emit('on-close', true)
    }
  }
}
</script>
