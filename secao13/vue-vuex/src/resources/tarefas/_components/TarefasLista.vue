<template>
    <div>

        <div class="row">
            <div class="col-sm-10">
                <h1 class="font-weight-light">Lista de Tarefas</h1>
            </div>
            <div class="col-sm-2">
                <button 
                    class="btn btn-primary float-right" 
                    @click="exibirFormularioCriarTarefa">
                        <i class="fa fa-plus mr-2"></i>
                        <span>Criar</span>
                </button>
            </div>
        </div>

        <h3 class="font-weight-light mt-4">A Fazer ({{ tarefasAFazer.length }})</h3>

        <ul class="list-group" v-if="tarefasAFazer.length > 0">
            <TarefasListaIten
                v-for="tarefa in tarefasAFazer"
                :key="tarefa.id"
                :tarefa="tarefa"
                @editar="selecionarTarefaParaEdicao" 
                @concluir="concluirTarefa({tarefa: $event})"
                @deletar="confirmarRemocao"/>
        </ul>

        <p v-else>Nenhuma tarefa a fazer.</p>

        <h3 class="font-weight-light mt-4">Concluídas ({{ $store.getters['tarefas/totalDeTarefasConcluidas'] }})</h3>

        <ul class="list-group" v-if="totalDeTarefasConcluidas > 0">
            <TarefasListaIten
                v-for="tarefa in tarefasConcluidas"
                :key="tarefa.id"
                :tarefa="tarefa"
                @editar="selecionarTarefaParaEdicao" 
                @concluir="concluirTarefa({tarefa: $event})"
                @deletar="confirmarRemocao"/>
        </ul>

        <p v-else>Nenhuma tarefa concluída.</p>

        <TarefaSalvar
            v-if="exibirFormulario"
            @salvar="salvarTarefa" />

        <div class="alert alert-danger" v-if="erro">{{erro.message}}</div>

    </div>
</template>

<script>

import {createNamespacedHelpers} from 'vuex'

import register from './../_store/register'
import TarefaSalvar from './TarefaSalvar.vue'
import TarefasListaIten from './TarefasListaIten.vue'

const {mapState, mapActions, mapGetters} = createNamespacedHelpers('tarefas')

export default {
    components: {
        TarefaSalvar,
        TarefasListaIten
    },
    data() {
        return {
            exibirFormulario: false
        }
    },
    computed: {
        ...mapState(['erro', 'tarefaSelecionada']),
        ...mapGetters([
            'tarefasAFazer', 
            'totalDeTarefasConcluidas',
            'boasVindas'
        ]),
        tarefasConcluidas() {
            return this.$store.getters['tarefas/tarefasConcluidas']
        }
    },
    created() {
        // this.$store.dispatch('listarTarefas', {
        //     tarefas: [
        //         { id: 1, titulo: 'Aprender Vue', concluido: true },
        //         { id: 2, titulo: 'Aprender Vue Router', concluido: true },
        //         { id: 3, titulo: 'Aprender Vuex', concluido: false }
        //     ]
        // })
        register(this.$store)
        this.listarTarefas()
    },
    methods: {
        ...mapActions([
            'listarTarefas',
            'concluirTarefa',
            'criarTarefa',
            'editarTarefa',
            'deletarTarefa',
            'selecionarTarefa',
            'resetTarefaSelecionada'
        ]),
        confirmarRemocao(tarefa) {
            const confirmar = window.confirm(`Deseja deletar a tarefa: "${tarefa.titulo}?`)
            if(confirmar) {
                this.deletarTarefa({tarefa})
            }
        },
        exibirFormularioCriarTarefa(event) {
            if (this.tarefaSelecionada) {
                this.resetTarefaSelecionada()
                return
            }
            this.exibirFormulario = !this.exibirFormulario
        },
        async salvarTarefa(event) {
            switch(event.operacao) {
                case 'criar':
                    await this.criarTarefa({tarefa: event.tarefa})
                    break
                case 'editar':
                    await this.editarTarefa({tarefa: event.tarefa})
                    break
            }
            this.resetar()
        },
        selecionarTarefaParaEdicao(tarefa) {
            this.exibirFormulario = true
            this.selecionarTarefa({tarefa})
        },
        resetar() {
            this.exibirFormulario = false
            this.resetTarefaSelecionada()
        }
    }
}
</script>
