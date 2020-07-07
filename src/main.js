import Vue from 'vue'
import './plugins/axios'
import i18n from './i18n'
import App from './App.vue'
import store from './store'
import './plugins/vue-utils'
import './plugins/vue-lodash'
import './plugins/tui-editor'
import './plugins/codemirror'
import './plugins/vue-timeago'
import './assets/css/main.scss'
import './plugins/vue-simplebar'
import './plugins/vue-highlight'
import './plugins/vue-api-query'
import './plugins/vue-vee-validate'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
