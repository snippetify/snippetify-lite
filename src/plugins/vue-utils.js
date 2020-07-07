"use strict";

import Vue from 'vue'
import _ from 'lodash'

export const utils = {
  prepareQueryBuilder (builder, payload) {
    if (payload.tags) { // For tags query
      builder.where('tags', (payload.tags || []).join('|'))
    }

    if (payload.tagged) { // For tagged query
      builder.where('tagged', payload.tagged)
    }

    if (payload.filter) {
      if (_.isString(payload.filter)) { // For string query
        const items = payload.filter.split(',')
        for (const item of items) {
          builder.where(item, true)
        }
      } else {
        for (const key in payload.filter) {
          if (undefined !== payload.filter[key] && payload.filter[key] !== '') {
            builder.where(key, payload.filter[key])
          }
        }
      }
    }
    if (!_.isEmpty(payload.sort)) {
      if (_.isArray(payload.sort)) {
        builder.orderBy(...payload.sort)
      } else if (_.isString(payload.sort)) {
        builder.orderBy(...(payload.sort.split(',')))
      }
    }
    return builder.page(parseInt(payload.page) || 1).limit(parseInt(payload.limit) || 10)
  }
}

Plugin.install = function(Vue) {
  Object.defineProperties(Vue.prototype, {
    $myUtils: {
      get() {
        return utils
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin