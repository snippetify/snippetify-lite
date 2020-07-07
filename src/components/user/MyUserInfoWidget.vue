<template>
  <v-list-item class="pl-1">
    <v-list-item-avatar color="deep-orange lighten-5" :size="avatarSize[size]" class="rounded-lg align-self-start">
      <v-img v-if="size == 'small'" :src="(item.avatar || {}).medium" alt="avatar...">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <span class="body-1 deep-orange--text font-weight-bold text-uppercase">
              {{ item.username.charAt(0) }}
            </span>
          </v-row>
        </template>
      </v-img>
      <v-img v-if="size == 'medium'" :src="(item.avatar || {}).large" alt="avatar...">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <span class="body-1 deep-orange--text font-weight-bold text-uppercase">
              {{ item.username.charAt(0) }}
            </span>
          </v-row>
        </template>
      </v-img>
      <v-img v-if="size == 'large'" :src="(item.avatar || {}).large" alt="avatar...">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <span class="body-1 deep-orange--text font-weight-bold text-uppercase">
              {{ item.username.charAt(0) }}
            </span>
          </v-row>
        </template>
      </v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="blue--text font-weight-bold" :class="titleSize[size]">
        {{ item.username }}
      </v-list-item-title>
      <v-list-item-subtitle class="caption dark-grey--text">
        <span class="font-weight-bold">{{ item.diamonds_count }}</span> <v-icon small color="deep-orange lighten-2" class="mr-1">
          mdi-diamond
        </v-icon>
        <span class="font-weight-bold">{{ item.rubis_count }}</span> <v-icon small color="green lighten-2" class="mr-1">
          mdi-rhombus
        </v-icon>
        <span class="font-weight-bold">{{ item.saphirs_count }}</span> <v-icon small color="purple lighten-2">
          mdi-circle
        </v-icon>
      </v-list-item-subtitle>
      <v-list-item-subtitle v-if="item.address" class="caption text--secondary">
        <v-icon small class="text-secondary mr-1">
          mdi-map-marker
        </v-icon>
        {{ item.address }}
      </v-list-item-subtitle>
      <v-list-item-subtitle v-if="item.skills && item.skills.length > 0" class="caption text--secondary">
        <v-icon small class="text-secondary mr-1">
          mdi-code-braces
        </v-icon>
        {{ item.skills.map(v => v.name).join(', ') }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    size: {
      type: String,
      default: 'medium',
      validator: v => ['small', 'medium', 'large'].includes(v)
    }
  },
  data () {
    return {
      avatarSize: { small: 48, medium: 64, large: 100 },
      titleSize: { small: 'body-2', medium: 'body-1', large: 'title' }
    }
  }
}
</script>
