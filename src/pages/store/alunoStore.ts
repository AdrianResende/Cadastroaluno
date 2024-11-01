import { defineStore } from 'pinia';

interface Aluno {
  nome: string;
  email: string;
  cpf: string;
}

export const useAlunoStore = defineStore('alunos', {
  state: () => ({
    alunos: [] as Aluno[],
  }),

  getters: {
    totalAlunos(state): number {
      return state.alunos.length;
    },
  },

  actions: {
    addAluno(aluno: Aluno) {
      this.alunos.push(aluno);
    },
    removeAluno(cpf: string) {
      this.alunos = this.alunos.filter(aluno => aluno.cpf !== cpf);
    },
    editAluno(updatedAluno: Aluno) {
      const index = this.alunos.findIndex(aluno => aluno.cpf === updatedAluno.cpf);
      if (index !== -1) {
        this.alunos[index] = updatedAluno;
      }
    },
  },
});
