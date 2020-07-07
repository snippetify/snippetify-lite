<template>
  <v-main>
      <v-container>
        <my-form v-if="authenticated" />
        <v-card v-else>
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
              {{ $t('not_authenticated') }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pt-6 pb-6 text-center">
                <p><v-icon x-large class="pa-6 red red--text lighten-5 rounded-circle">mdi-power-plug-off-outline</v-icon></p>
                <p class="small text--secondary font-italic">{{ $t('authenticated_required') }}</p>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="close" color="error" text depressed large>{{ $t('close') }}</v-btn>
            </v-card-actions>
        </v-card>
      </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'
import MyForm from '@/components/snippet/Form.vue'
import {
  FETCH_TYPES
} from '@/store/actions.type'

export default {
  components: {
    MyForm
  },
  computed: {
    ...mapGetters(['vscode']),
    ...mapGetters('auth', ['authenticated']),
  },
  methods: {
    close () {
      this.vscode.postMessage({ action: 'close' })
    }
  },
  mounted () {
    this.$store.dispatch(`snippet/${FETCH_TYPES}`)
  }
}
</script>
