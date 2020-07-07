<template>
  <v-card :class="{ 'mb-12': marginBotton }" class="pt-6 pb-1" :flat="flat">
    <div class="px-6">
      <v-row class="d-flex align-center">
        <v-col cols="9" class="py-0">
          <h4 class="headline">
            {{ item.title }}
          </h4>
        </v-col>
        <v-col cols="3" class="text-right py-0">
          <v-tooltip v-if="item.trusted" bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-icon small class="green rounded-circle mb-1 lighten-5 green--text pa-2" v-on="{ ...tooltip }">
                mdi-shield-check
              </v-icon>
            </template>
            <span>{{ $t('trusted') }}</span>
          </v-tooltip>
          <v-tooltip v-if="item.private" bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-icon small class="deep-orange rounded-circle mb-1 lighten-5 deep-orange--text pa-2" v-on="{ ...tooltip }">
                mdi-lock-outline
              </v-icon>
            </template>
            <span>{{ $t('private') }}</span>
          </v-tooltip>
          <v-tooltip v-else-if="item.wiki" bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-icon small class="deep-orange rounded-circle mb-1 lighten-5 deep-orange--text pa-2" v-on="{ ...tooltip }">
                mdi-comment-multiple-outline
              </v-icon>
            </template>
            <span>{{ $t('wiki') }}</span>
          </v-tooltip>
          <v-tooltip v-else-if="item.robot" bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-icon small class="deep-orange rounded-circle mb-1 lighten-5 deep-orange--text pa-2" v-on="{ ...tooltip }">
                mdi-robot
              </v-icon>
            </template>
            <span>{{ $t('robot') }}</span>
          </v-tooltip>
          <v-tooltip v-else-if="item.personal" bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-icon small class="deep-orange rounded-circle mb-1 lighten-5 deep-orange--text pa-2" v-on="{ ...tooltip }">
                mdi-shield-key-outline
              </v-icon>
            </template>
            <span>{{ $t('personal') }}</span>
          </v-tooltip>
          <v-tooltip v-else-if="item.community" bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-icon small class="deep-orange rounded-circle mb-1 lighten-5 deep-orange--text pa-2" v-on="{ ...tooltip }">
                mdi-account-group-outline
              </v-icon>
            </template>
            <span>{{ $t('community') }}</span>
          </v-tooltip>
          <v-tooltip v-if="item.is_accepted" bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-icon small class="green rounded-circle mb-1 lighten-5 green--text pa-2" v-on="{ ...tooltip }">
                mdi-check-decagram
              </v-icon>
            </template>
            <span>{{ $t('accepted') }}</span>
          </v-tooltip>
          <v-tooltip v-if="item.deprecated" bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-icon small class="blue rounded-circle mb-1 lighten-5 blue--text pa-2" v-on="{ ...tooltip }">
                mdi-file-alert-outline
              </v-icon>
            </template>
            <span>{{ $t('deprecated') }}</span>
          </v-tooltip>
        </v-col>
      </v-row>
      <v-row class="mt-2">
        <v-col cols="12" md="8" class="py-0">
          <p class="body-2 text--secondary text-truncate">
            {{ item.description }}
          </p>
        </v-col>
        <v-col cols="12" md="4" class="text-md-right py-0">
          <p class="body-2 text--secondary text-truncate">
            <timeago :datetime="item.published_at" />
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="py-1">
          <div class="pos-relative">
            <a href="#" @click.prevent="show" class="hover" />
            <div class="bottom-faded" />
            <pre v-highlightjs="item.code" data-provider="snippetify" class="highlight-code sm"><code :class="parseLang(item)"></code></pre>
            <div class="code-lang-container">
              <span class="caption white--text">{{ item.language }}</span>
            </div>
            <div class="code-btn-container">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" fab small class="deep-orange deep-orange--text lighten-5 mr-2" @click="save">
                    <v-icon small>mdi-checkbox-marked-circle-outline</v-icon>
                  </v-btn>
                </template>
                <span>{{ $t('add_to_collection') }}</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" fab small color="deep-orange lighten-5 deep-orange--text" @click="copy">
                    <v-icon small>mdi-content-copy</v-icon>
                  </v-btn>
                </template>
                <span>{{ $t('use_now') }}</span>
              </v-tooltip>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="py-1">
          <my-tag-list-item-widget v-for="(tag, i) in item.tags" :key="i" :item="tag" />
        </v-col>
      </v-row>
    </div>
    <v-divider class="mt-4 mx-6" />
    <div class="px-6">
      <v-row align-md="center">
        <v-col cols="12" md="8" class=" d-flex align-center">
          <my-user-info-widget v-if="item.user" size="small" :item="item.user" />
        </v-col>
        <v-col cols="12" md="4" class="text-md-right pr-3 align-center d-flex justify-md-end">
          <div>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span class="d-block body-2 mb-2 text--secondary" v-html="$tc('html.views_count', item.views_count)" />
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span class="d-block body-2 mb-2 text--secondary" v-html="$tc('html.copies_count', item.copies_count)" />
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span class="d-block body-2 text--secondary" v-html="$tc('html.comments_count', item.comments_count)" />
          </div>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.pos-relative {
  .code-btn-container{
    position: absolute;
    bottom: -20px;
    right: 16px;
    z-index: 3;
  }
  .hover {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    cursor: pointer;
    border-radius: 10px!important;
    background-color: transparent;
  }
  .code-lang-container{
    position: absolute;
    top: 2px;
    right: 10px;
    z-index: 3;
  }
  .bottom-faded {
    position: absolute;
    width: 100%;
    z-index: 1;
    top: 70%;
    bottom: 0;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9));
    border-radius: 0 0 10px 10px;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import Highlight from 'highlight.js/lib/index'
import MyUserInfoWidget from '@/components/user/MyUserInfoWidget'
import MyTagListItemWidget from '@/components/tag/MyTagListItemWidget'

export default {
  components: {
    MyUserInfoWidget,
    MyTagListItemWidget
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    flat: {
      type: Boolean,
      default: false
    },
    marginBotton: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters(['vscode'])
  },
  methods: {
    parseLang (v) {
      const lang = (v.language || '').toLowerCase()
      return this.hasLang(lang) ? lang : null
    },
    hasLang (v) {
      return Highlight.listLanguages().includes(v)
    },
    save () {
      this.vscode.postMessage({ action: 'save', snippet: this.item })
    },
    copy () {
      this.vscode.postMessage({ action: 'copy', snippet: this.item })
    },
    show () {
      this.vscode.postMessage({ action: 'show', snippet: this.item })
    }
  }
}
</script>
