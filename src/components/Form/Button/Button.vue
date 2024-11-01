<script lang="ts">
import { Vue, Component, Prop } from 'vue-facing-decorator';


@Component({
  name: "Button"
})
export default class Button extends Vue {
  @Prop({ default: "Button" }) name!: string;
}
</script>

<template>
  <v-btn> {{ name }}</v-btn>
</template>
