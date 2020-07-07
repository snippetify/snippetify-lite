<template>
  <v-row class="mt-4 mb-8 d-flex align-center">
    <v-col cols="12" lg="8">
      <v-pagination
        :value="page"
        :length="totalPage"
        :total-visible="totalVisible"
        class="justify-center justify-lg-start"
        @input="pageChange"
      />
    </v-col>
    <v-col cols="12" lg="4" class="text-center text-lg-right">
      <v-btn-toggle color="deep-orange" :value="limit" dense group @change="limitChange">
        <v-btn
          v-for="i of limitRange"
          :key="i"
          class="text-capitalize elevation-2 limit-btn"
          height="38"
          min-width="38"
          :value="i"
        >
          {{ i }}
        </v-btn>
      </v-btn-toggle>
      <span class="text--secondary ml-2 body-2">{{ $t('per_page') }}</span>
    </v-col>
  </v-row>
</template>

<style lang="scss">
.limit-btn{
  border-radius: 5px!important;
  border-width: 0!important;
}
</style>

<script>

export default {
  props: {
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    totalPage: {
      type: Number,
      default: 1
    },
    totalVisible: {
      type: Number,
      default: 8
    },
    limitRange: {
      type: Array,
      default: () => [10, 30, 50]
    }
  },
  methods: {
    pageChange (v) {
      this.$emit('page', v)
    },
    limitChange (v) {
      this.$emit('limit', v)
    }
  }
}
</script>
