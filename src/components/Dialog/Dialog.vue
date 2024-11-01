<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-facing-decorator';
import { useAlunoStore } from '@/pages/store/alunoStore';

interface Aluno {
  nome: string;
  email: string;
  cpf: string;
}

@Component({
  emits: ['close'],
})
export default class Dialog extends Vue {
  @Prop({ type: String, required: true }) readonly buttonLabel!: string;
  @Prop({ type: Object, required: true }) readonly aluno!: Aluno | null;

  nameAluno: string = '';
  emailAluno: string = '';
  cpfAluno: string = '';
  alunos: Aluno[] = [];
  alunoStore = useAlunoStore();
  isEditMode = false;
  isFormValid: boolean = false;

  nomeRules = [(value: string) => !!value || 'Nome é obrigatório'];
  emailRules = [
    (value: string) => !!value || 'E-mail é obrigatório',
    (value: string) => /.+@.+\..+/.test(value) || 'E-mail deve ser válido'
  ];
  cpfRules = [
    (value: string) => !!value || 'CPF é obrigatório',
    (value: string) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value) || 'CPF deve ser válido'
  ];

  @Watch('aluno', { deep: true })
  onAlunoPropChange(selectedAluno: Aluno | null) {
    if (selectedAluno) {
      this.populateFormFields(selectedAluno);
      this.isEditMode = true;
    } else {
      this.resetFormFields();
      this.isEditMode = false;
    }
  }
  rules = "cpfRules"
  closeDialog() {
    this.$emit('close', false);
    this.resetFormFields();
  }

  saveOrUpdateAluno(): void {
    const alunoData: Aluno = {
      nome: this.nameAluno,
      email: this.emailAluno,
      cpf: this.cpfAluno
    };

    if (this.isEditMode) {
      this.alunoStore.editAluno(alunoData);
    } else {
      this.alunoStore.addAluno(alunoData);
    }

    this.resetFormFields();
    this.$emit('close', false);
  }

  populateFormFields(aluno: Aluno): void {
    this.nameAluno = aluno.nome;
    this.emailAluno = aluno.email;
    this.cpfAluno = aluno.cpf;
  }

  resetFormFields(): void {
    this.nameAluno = '';
    this.emailAluno = '';
    this.cpfAluno = '';
    this.isEditMode = false;
  }
}
</script>

<template>
  <v-dialog width="600px">
    <v-card>
      <v-card-text>
        <v-form v-model="isFormValid">
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="nameAluno" label="Nome" :rules="nomeRules" />
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="emailAluno" label="Email" :rules="emailRules" />
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="cpfAluno" label="CPF" :rules="cpfRules" :disabled="isEditMode" />
            </v-col>
          </v-row>
        </v-form>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="outlined" @click="closeDialog">Cancelar</v-btn>
          <v-btn color="success" @click="saveOrUpdateAluno" :disabled="!isFormValid" variant="outlined">
            {{ buttonLabel }}
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
