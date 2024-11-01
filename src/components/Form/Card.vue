<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator';


@Component({
  name: "Card"
})
export default class Card extends Vue {
}
</script>

<template>
  <v-dialog>
    <v-card>
      <v-card-title>
        <slot name="title"></slot>
      </v-card-title>
      <v-card-text>
        <slot name="content"></slot>
      </v-card-text>
      <v-card-actions>
        <slot name="actions"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
