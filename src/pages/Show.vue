<template>
  <v-main class="mt-6">
    <v-container>
      <section v-if="snippet">
        <h2 class="display-1 dark-grey--text mt-n3 d-flex align-center">
          <a href="#" @click.prevent="home">
            <v-avatar size="48" class="mr-4">
              <v-img class="deep-orange" src="https://snippetify.com/apple-touch-icon.png" alt="Snippetify logo">
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <span style="color:#fff" class="body-1 font-weight-bold text-uppercase">{S}</span>
                  </v-row>
                </template>
              </v-img>
            </v-avatar>
          </a>
          {{ snippet.title }}
        </h2>
        <div class="mt-3 mb-4 d-flex align-center px-1">
          <p class="ma-0 pa-0">
            <span
              class="text--secondary mr-3"
              v-html="$tc('html.viewed_count', snippet.views_count)"
            ></span>
            <span
              class="text--secondary mr-3"
              v-html="$tc('html.copied_count', snippet.copies_count)"
            ></span>
            <span
              class="text--secondary mr-3"
              v-html="$tc('html.favorited_count', snippet.favorites_count)"
            ></span>
            <span class="text--secondary">
              {{ $t('posted') }}
              <span class="dark-grey--text">
                <timeago :datetime="snippet.published_at"></timeago>
              </span>
            </span>
          </p>
          <p class="mb-0 pa-0 mt-1 ml-auto">
            <v-tooltip bottom v-if="snippet.trusted">
              <template v-slot:activator="{ on: tooltip }">
                <v-icon
                  v-on="{ ...tooltip }"
                  small
                  class="green rounded-circle mb-1 lighten-5 green--text pa-2"
                >mdi-shield-check</v-icon>
              </template>
              <span>{{ $t('trusted') }}</span>
            </v-tooltip>
            <v-tooltip bottom v-if="snippet.private">
              <template v-slot:activator="{ on: tooltip }">
                <v-icon
                  v-on="{ ...tooltip }"
                  small
                  class="deep-orange rounded-circle mb-1 lighten-5 deep-orange--text pa-2"
                >mdi-lock-outline</v-icon>
              </template>
              <span>{{ $t('private') }}</span>
            </v-tooltip>
            <v-tooltip bottom v-else-if="snippet.wiki">
              <template v-slot:activator="{ on: tooltip }">
                <v-icon
                  v-on="{ ...tooltip }"
                  small
                  class="deep-orange rounded-circle mb-1 lighten-5 deep-orange--text pa-2"
                >mdi-comment-multiple-outline</v-icon>
              </template>
              <span>{{ $t('wiki') }}</span>
            </v-tooltip>
            <v-tooltip bottom v-else-if="snippet.robot">
              <template v-slot:activator="{ on: tooltip }">
                <v-icon
                  v-on="{ ...tooltip }"
                  small
                  class="deep-orange rounded-circle mb-1 lighten-5 deep-orange--text pa-2"
                >mdi-robot</v-icon>
              </template>
              <span>{{ $t('robot') }}</span>
            </v-tooltip>
            <v-tooltip bottom v-else-if="snippet.personal">
              <template v-slot:activator="{ on: tooltip }">
                <v-icon
                  v-on="{ ...tooltip }"
                  small
                  class="deep-orange rounded-circle mb-1 lighten-5 deep-orange--text pa-2"
                >mdi-shield-key-outline</v-icon>
              </template>
              <span>{{ $t('personal') }}</span>
            </v-tooltip>
            <v-tooltip bottom v-else-if="snippet.community">
              <template v-slot:activator="{ on: tooltip }">
                <v-icon
                  v-on="{ ...tooltip }"
                  small
                  class="deep-orange rounded-circle mb-1 lighten-5 deep-orange--text pa-2"
                >mdi-account-group-outline</v-icon>
              </template>
              <span>{{ $t('community') }}</span>
            </v-tooltip>
            <v-tooltip bottom v-if="snippet.is_accepted">
              <template v-slot:activator="{ on: tooltip }">
                <v-icon
                  v-on="{ ...tooltip }"
                  small
                  class="green rounded-circle mb-1 lighten-5 green--text pa-2"
                >mdi-check-decagram</v-icon>
              </template>
              <span>{{ $t('accepted') }}</span>
            </v-tooltip>
            <v-tooltip bottom v-if="snippet.deprecated">
              <template v-slot:activator="{ on: tooltip }">
                <v-icon
                  v-on="{ ...tooltip }"
                  small
                  class="blue rounded-circle mb-1 lighten-5 blue--text pa-2"
                >mdi-file-alert-outline</v-icon>
              </template>
              <span>{{ $t('deprecated') }}</span>
            </v-tooltip>
          </p>
        </div>
        <div class="pos-relative">
          <v-sheet class="code-wrapper">
            <vue-simplebar style="max-height:500px">
              <pre v-highlightjs="snippet.code" data-provider="snippetify" class="highlight-code lg"><code :class="parseLang(snippet)"></code></pre>
            </vue-simplebar>
          </v-sheet>
          <div class="code-lang-container">
            <span class="caption white--text">{{ snippet.language }}</span>
          </div>
          <div class="code-btn-container">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" fab small color="deep-orange lighten-5 deep-orange--text" @click="copy">
                  <v-icon small>mdi-menu-open</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('use_now') }}</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" fab small class="deep-orange deep-orange--text lighten-5 ml-4" @click="save">
                  <v-icon small>mdi-checkbox-marked-circle-outline</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('add_to_collection') }}</span>
            </v-tooltip>
          </div>
        </div>
        <div class="mt-4 mb-2">
          <my-tag-list-item-widget v-for="(tag, i) in snippet.tags" :key="i" :item="tag"></my-tag-list-item-widget>
        </div>
        <v-row class="d-flex align-center">
          <v-col cols="12" lg="6" class="py-0">
            <my-user-info-widget v-if="snippet.user" :item="snippet.user"></my-user-info-widget>
          </v-col>
          <v-col v-if="authenticated" cols="12" lg="6" class="d-flex flex-column align-end py-0">
            <div class="mt-2">
              <my-vote-widget :item="snippet" parent-name="snippet"></my-vote-widget>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-on="on"
                    icon
                    :color="favoriteBtnColor"
                    @click.stop="toggleFavorite"
                    class="mr-1"
                  >
                    <v-icon>mdi-star-outline</v-icon>
                  </v-btn>
                </template>
                <span>{{ $t(snippet.user_favorited ? 'remove_from_favorite' : 'add_to_favorite') }}</span>
              </v-tooltip>
            </div>
          </v-col>
        </v-row>
        <div class="mt-3 black--text mb-8 px-2">
          <markdown-viewer :value="snippet.description"></markdown-viewer>
        </div>
      </section>
      <div v-else class="text-center mt-12 pt-12 mb-12">
        <v-row>
          <v-col cols="4" offset="4">
            <v-card color="white" flat>
              <v-card-text>
                <v-icon x-large class="pa-4 mr-n3 rounded-circle deep-orange lighten-5 deep-orange--text">
                  mdi-code-braces
                </v-icon>
                <p class="mb-2 mt-6 pt-1">
                  {{ $t('loading_dots') }}
                </p>
                <v-progress-linear rounded indeterminate color="primary" class="mb-0" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-main>
</template>

<style lang="scss">
.code-btn-container {
    position: absolute;
    bottom: -20px;
    right: 16px;
    z-index: 3;
  }
.code-lang-container{
    position: absolute;
    top: 8px;
    right: 16px;
}
</style>

<script>
import { mapGetters } from "vuex"
import Highlight from "highlight.js/lib/index"
import MyVoteWidget from '@/components/vote/MyVoteWidget'
import MarkdownViewer from '@/components/editor/MarkdownViewer'
import MyUserInfoWidget from '@/components/user/MyUserInfoWidget'
import MyTagListItemWidget from '@/components/tag/MyTagListItemWidget'
import {
  SET_ONE,
  SET_PAGE,
  INCREMENT_FAVORITE,
  DECREMENT_FAVORITE 
} from "@/store/mutations.type"
import {
  SAVE,
  DELETE 
} from "@/store/actions.type"

export default {
  components: {
    MyVoteWidget,
    MarkdownViewer,
    MyUserInfoWidget,
    MyTagListItemWidget
  },
  computed: {
    ...mapGetters(["vscode"]),
    ...mapGetters("snippet", ["snippet"]),
    ...mapGetters("auth", ["authenticated"]),
    favoriteBtnColor() {
      return this.snippet.user_favorited ? "deep-orange" : "grey darken-1"
    }
  },
  methods: {
    toggleFavorite() {
      if (!this.snippet.user_favorited) {
        this.$store
          .dispatch(`favorite/${SAVE}`, { snippet: this.snippet.id })
          .then(v => {
            this.$store.commit(`snippet/${INCREMENT_FAVORITE}`, {
              id: v.data.id
            })
            this.vscode.postMessage({
              action: "alert",
              type: "success",
              context: 'favorite',
              message: this.$t("snippet_added_from_favorite")
            })
          })
          .catch(e => {
            this.vscode.postMessage({
              action: "alert",
              type: "error",
              context: 'favorite',
              message: e.response.data.errors.snippet.join(", ")
            })
          })
      } else {
        this.$store
          .dispatch(`favorite/${DELETE}`, { id: this.snippet.user_favorite_id })
          .then(() => {
            this.$store.commit(`snippet/${DECREMENT_FAVORITE}`)
            this.vscode.postMessage({
              action: "alert",
              type: "success",
              context: 'favorite',
              message: this.$t("snippet_removed_from_favorite")
            })
          })
          .catch(e => {
            this.vscode.postMessage({
              action: "alert",
              type: "error",
              context: 'favorite',
              message: e.response.data.errors.snippet.join(", ")
            })
          })
      }
    },
    parseLang(v) {
      const lang = (v.language || "").toLowerCase()
      return this.hasLang(lang) ? lang : null
    },
    hasLang(v) {
      return Highlight.listLanguages().includes(v)
    },
    save() {
      this.vscode.postMessage({ action: "save", snippet: this.snippet })
    },
    copy() {
      this.vscode.postMessage({ action: "copy", snippet: this.snippet })
    },
    home () {
      this.$store.commit(SET_PAGE, 'index')
      this.$store.commit(`snippet/${SET_ONE}`, {})
    }
  }
}
</script>
