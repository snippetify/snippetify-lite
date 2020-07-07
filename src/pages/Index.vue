<template>
  <div>
    <v-app-bar app height="120" elevate-on-scroll tag="header" color="white">
      <v-container>
        <v-row>
          <v-col>
            <v-form @submit.prevent="search">
              <v-text-field
                v-model="keyword"
                hide-details
                :placeholder="$t('form.placeholder.make_search')"
                type="search"
                height="81"
                class="search-input"
                single-line
                full-width
                large
                outlined
                flat
                rounded
                solo
              >
                <template v-slot:prepend-inner>
                  <div class="search-icon-wrapper mr-2">
                    <v-avatar size="70" class="custom-icon">
                      <v-img class=" deep-orange" src="https://snippetify.com/apple-touch-icon.png" alt="Snippetify logo">
                        <template v-slot:placeholder>
                          <v-row class="fill-height ma-0" align="center" justify="center">
                            <span style="color:#fff" class="title text--white font-weight-bold text-uppercase">{S}</span>
                          </v-row>
                        </template>
                      </v-img>
                    </v-avatar>
                  </div>
                </template>
              </v-text-field>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
        <section v-if="!loading" class="mt-6">
          <my-list-item v-for="(item, i) in items" :key="i" :item="item" />
          <my-pagination-widget 
            v-if="meta.total > items.length" 
            :page="page" 
            :limit="limit"
            @page="v => page = v"
            @limit="v => limit = v"
            :total-page="meta.last_page" 
          />
        </section>
        <div v-if="!loading && items.length === 0" class="text-center mt-2 pt-12">
          <div>
            <v-icon x-large class="pa-4 rounded-circle deep-orange lighten-5 deep-orange--text">
              mdi-magnify
            </v-icon>
            <p class="mt-8">
              <template v-if="dirty">
                {{ $t('sorry_anything_found') }} <b>{{ keyword }}</b>
              </template>
              <template v-else>{{ $t('search_hint') }}</template>
            </p>
            <p class="caption text--secondary">
              <template v-if="dirty">
                {{ $t('try_different_keyword') }}
              </template>
              <template v-else>{{ $t('search_hint_more') }}</template>
            </p>
          </div>
        </div>
        <div v-if="loading" class="text-center mt-12 pt-12 mb-12">
          <v-row>
            <v-col cols="4" offset="4">
              <v-card color="white" flat>
                <v-card-text>
                  <v-icon x-large class="pa-4 mr-n3 rounded-circle deep-orange lighten-5 deep-orange--text">
                    mdi-magnify
                  </v-icon>
                  <p class="mb-2 mt-6 pt-1">
                    {{ $t('searching_dots') }}
                  </p>
                  <v-progress-linear rounded indeterminate color="primary" class="mb-0" />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-main>
  </div>
</template>

<style lang="scss" scoped>
.search-input{
    border-radius: 40px;
}
.search-icon-wrapper{
    height: 70px;
    .custom-icon{
      margin: 0 0 0 -19px;
    }
}
</style>

<script>
import { mapGetters } from 'vuex'
import MyListItem from '@/components/snippet/ListItem.vue'
import MyPaginationWidget from '@/components/common/MyPaginationWidget.vue'
import {
  SET_MANY
} from '@/store/mutations.type'
import {
  FETCH_RESULTS
} from '@/store/actions.type'

// Get payload
const getPayload = (query) => {
  const payload = { filter: { q: query.q, type: 'snippet' } }
  if (query.page) { payload.page = query.page }
  if (query.limit) { payload.limit = query.limit }
  return payload
}

export default {
  components: {
    MyListItem,
    MyPaginationWidget
  },
  data () {
    return {
      page: 1,
      limit: 30,
      keyword: '',
      dirty: false,
      loading: false,
    }
  },
  computed: {
    ...mapGetters('search', { items: 'results', meta: 'metaResults' })
  },
  watch: {
    page () {
      this.search()
    },
    limit () {
      this.search()
    },
    keyword () {
      this.dirty = false
    }
  },
  methods: {
    search () {
      if (!this.keyword || this.keyword.length < 2) { return }
      this.loading = true
      this.$store.commit(`search/${SET_MANY}`, [])
      this.$store
        .dispatch(`search/${FETCH_RESULTS}`, getPayload({
          q: this.keyword,
          page: this.page,
          limit: this.limit,
        }))
        .finally(() => {
          this.dirty = true
          this.loading = false
        })
    }
  }
}
</script>
