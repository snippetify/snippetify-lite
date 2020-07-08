<template>
  <v-app>
    <new-page v-if="isNew" />
    <show-page v-else-if="isShow" />
    <index-page v-else />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import NewPage from '@/pages/New'
import ShowPage from '@/pages/Show'
import IndexPage from '@/pages/Index'
import {
  SET_ONE,
  SET_PAGE,
  SET_TOKEN,
  SET_VS_CODE,
  SET_AUTHENTICATED
} from '@/store/mutations.type'
import {
  FETCH_ONE,
  FETCH_AUTH_USER
} from '@/store/actions.type'

export default {
  name: 'App',
  components: {
    NewPage,
    ShowPage,
    IndexPage
  },
  computed: {
    ...mapGetters(['page']),
    isNew () { return this.page === 'new' },
    isShow () { return this.page === 'show' }
  },
  mounted () {
    if (window.snippetify) {
      this.$store.commit(SET_VS_CODE, window.snippetify.vscode)
      this.$store.commit(SET_PAGE, window.snippetify.meta.page || 'index')
      this.$store.commit(`snippet/${SET_ONE}`, window.snippetify.snippet || {})
      if ((window.snippetify.token || '').trim().length > 2) {
        this.$store.commit(`auth/${SET_TOKEN}`, window.snippetify.token)
        this.$axios.defaults.headers.common['Authorization'] = `Bearer ${window.snippetify.token}`
        this.$store
          .dispatch(`user/${FETCH_AUTH_USER}`)
          .then(() => {
            this.$store.commit(`auth/${SET_AUTHENTICATED}`, true)
          })
      }
      if ((window.snippetify.snippet || {}).id) {
        this.$store.dispatch(`snippet/${FETCH_ONE}`, window.snippetify.snippet.id)
      }
    }
  }
}
</script>
