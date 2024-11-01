<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator';
import Table from '@/components/Table/Table.vue';
import Dialog from '../Dialog/Dialog.vue';

interface Aluno {
  nome: string;
  email: string;
  cpf: string;
}

@Component({
  name: 'CardTable',
  components: {
    Table,
    Dialog
  },
})
export default class CardTable extends Vue {
  isDialogOpen = false;
  dialogButtonLabel = '';
  selectedAluno: Aluno | null = null;

  openDialogForAction(actionType: 'adicionar' | 'editar', aluno?: Aluno) {
    this.isDialogOpen = true;
    this.dialogButtonLabel = actionType === 'adicionar' ? 'Adicionar' : 'Atualizar';
    this.selectedAluno = aluno || null;
  }

  closeDialog(isOpen: boolean) {
    this.isDialogOpen = isOpen;
    if (!isOpen) {
      this.selectedAluno = null;
    }
  }

  handleEditButtonClick(aluno: Aluno) {
    this.openDialogForAction('editar', aluno);
  }
}
</script>

<template>
  <v-card class="border mb-4" flat>
    <div class="d-flex justify-space-between">
      <CardTitle title="Alunos" />
      <v-card-title>
        <v-btn @click="openDialogForAction('adicionar')">Adicionar aluno</v-btn>
      </v-card-title>
    </div>
    <Table @edit="handleEditButtonClick" />
  </v-card>

  <Dialog v-model="isDialogOpen" width="600px" @close="closeDialog" :buttonLabel="dialogButtonLabel"
    :aluno="selectedAluno" />
</template>
