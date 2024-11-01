<script lang="ts">
import { Vue, Component, Prop } from 'vue-facing-decorator';
import { useAlunoStore } from '@/pages/store/alunoStore';

interface Aluno {
  nome: string;
  email: string;
  cpf: string;
}

@Component({
  name: "Table",
  emits: ['close', 'edit'],
})
export default class Table extends Vue {
  @Prop() readonly nameButton!: string;

  alunoStore = useAlunoStore();
  dialogOpen = false;
  alunoData: Aluno = { nome: '', email: '', cpf: '' };
  isValidName = false;
  isValidEmail = false;
  isValidCpf = false;

  get alunos() {
    return this.alunoStore.alunos;
  }

  openDialogForAction(action: string, aluno: Aluno): void {
    this.dialogOpen = true;
    this.alunoData = { ...aluno };
    this.$emit('close', true);
    this.$emit('edit', action);
  }

  resetFormFields(): void {
    this.alunoData = { nome: '', email: '', cpf: '' };
    this.isValidName = false;
    this.isValidEmail = false;
    this.isValidCpf = false;
  }

  deleteAlunoByCpf(cpf: string): void {
    this.alunoStore.removeAluno(cpf);
  }

  saveUpdatedAluno(): void {
    this.alunoStore.editAluno({ ...this.alunoData });
    this.resetFormFields();
    this.$emit('close', false);
  }
}
</script>

<template>
  <v-table>
    <thead>
      <tr>
        <th>Nome</th>
        <th>Email</th>
        <th>CPF</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="aluno in alunos" :key="aluno.cpf">
        <td>{{ aluno.nome }}</td>
        <td>{{ aluno.email }}</td>
        <td>{{ aluno.cpf }}</td>
        <td>
          <v-btn color="primary" @click="openDialogForAction(aluno)">Editar</v-btn>
          <v-btn color="error" @click="deleteAlunoByCpf(aluno.cpf)">Excluir</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
