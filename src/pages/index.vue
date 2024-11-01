<template>
  <v-app>
    <v-main>
      <v-container>
        <CardTable />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { CardTable } from '@/components/Card';

@Component({
  name: 'PageHome',
  components: {
    CardTable,
  },
})
export default class AlunoComponent extends Vue {

}
</script>
