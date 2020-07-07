<template>
    <div class="d-inline-block">
        <v-tooltip :bottom="bottom" :top="!bottom">
            <template v-slot:activator="{ on }">
                <v-btn v-if="embed" :small="small" :disabled="loading" v-on="on" text :class="voteUpBtnColor" @click="vote('up')">
                    <v-icon :small="small" class="mr-1">mdi-thumb-up-outline</v-icon> {{ item.votes_up_count }}
                </v-btn>
                <v-btn v-else :small="small" :disabled="loading" v-on="on" text :color="voteUpBtnColor" @click="vote('up')">
                    <v-icon :small="small" class="mr-1">mdi-thumb-up-outline</v-icon> {{ item.votes_up_count }}
                </v-btn>
            </template>
            <span>{{ $t('this_is_important') }}</span>
        </v-tooltip>
        <v-tooltip :bottom="bottom" :top="!bottom">
            <template v-slot:activator="{ on }">
                <v-btn v-if="embed" :small="small" :disabled="loading" v-on="on" text :class="voteDownBtnColor" @click="vote('down')">
                    <v-icon :small="small" class="mr-1">mdi-thumb-down-outline</v-icon> {{ item.votes_down_count }}
                </v-btn>
                <v-btn v-else :small="small" :disabled="loading" v-on="on" text :color="voteDownBtnColor" @click="vote('down')">
                    <v-icon :small="small" class="mr-1">mdi-thumb-down-outline</v-icon> {{ item.votes_down_count }}
                </v-btn>
            </template>
            <span>{{ $t('this_is_not_important') }}</span>
        </v-tooltip>
    </div>
</template>

<style lang="scss">
.lighten-white-5 {
    background-color: rgba($color: #fff, $alpha: .1)
}
.lighten-deep-orange-5 {
    background-color: rgba($color: #fbe9e7, $alpha: .9)
}
</style>

<script>
import { mapGetters } from 'vuex'
import { 
    INCREMENT_VOTE_UP,
    INCREMENT_VOTE_DOWN
} from '@/store/mutations.type'
import {
    SAVE,
} from '@/store/actions.type'

export default {
    props: {
        item: Object,
        embed: {
            type: Boolean,
            default: false,
        },
        small: {
            type: Boolean,
            default: false,
        },
        bottom: {
            type: Boolean,
            default: true,
        },
        doneCallback: Function,
        parentName: String // The parent module name
    },
    data () {
        return {
            loading: false
        }
    },
    computed: {
        ...mapGetters(["vscode"]),
        ...mapGetters('user', ['authUser']),
        voteUpBtnColor () {
            if (this.embed) {
                return this.item.user_voted_up ? 'lighten-deep-orange-5 deep-orange--text' : 'lighten-white-5 white--text'
            }
            return this.item.user_voted_up ? 'deep-orange' : 'grey darken-1'
        },
        voteDownBtnColor () {
            if (this.embed) {
                return this.item.user_voted_down ? 'lighten-deep-orange-5 deep-orange--text' : 'lighten-white-5 white--text'
            }
            return this.item.user_voted_down ? 'deep-orange' : 'grey darken-1'
        }
    },
    methods: {
        vote (type) {
            
            if (!this.authUser.is_moderator && 
                (('review' === this.parentName && !this.authUser.can_vote_on_review) || 
                ('up' === type && !this.authUser.can_vote_up) || 
                ('down' === type && !this.authUser.can_vote_down))) {
                this.vscode.postMessage({ action: 'alert', type: 'error', message: this.$t('do_not_have_right_to_perform') })
                return
            }

            if(!this.item.user_voted) {
                this.loading = true
                this.$store
                    .dispatch(`vote/${SAVE}`, { [this.parentName]: this.item.id, type: type })
                    .then(() => {
                        if (undefined === this.doneCallback) {
                            this.$store.commit(`${this.parentName}/${'up' == type ? INCREMENT_VOTE_UP : INCREMENT_VOTE_DOWN}`, this.item)
                        } else {
                            this.doneCallback()
                        }
                        this.vscode.postMessage({ action: 'alert', type: 'success', message: this.$t('you_voted_succesfully') })
                    })
                    .catch(e => {
                        this.vscode.postMessage({ action: "alert", type: "error", message: e.response.data.errors.snippet.join(", ") })
                    })
                    .finally(() => {
                        this.loading = false
                    })
            } else {
                this.vscode.postMessage({ action: 'alert', type: 'error', message: this.$t('you_already_voted') })
            }
        }
    }
}
</script>