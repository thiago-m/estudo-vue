<template>
    <div>
        <div class="row">
            <div class="col-sm-10">
                <h1 class="font-weight-light">Lista de Tarefas</h1>
            </div>
            <div class="col-sm-2">
                <button 
                    class="btn btn-primary float-right"
                    @click="exibirFormCriar"
                >
                    <i class="fa fa-plus mr-2"></i>
                    <span>Criar</span>
                </button>
            </div>
        </div>


        <ul class="list-group" v-if="tarefasOrdenadas.length > 0">
            <TarefasListaIten
                v-for="tarefa in tarefasOrdenadas"
                :key="tarefa.id"
                :tarefa="tarefa" 
                @editar="selecionarTarefaEdicao"
                @deletar="deletarTarefa"
                @concluir="editarTarefa"/>
        </ul>

        <p v-else>Nenhuma tarefa criada.</p>

        <TarefaSalvar 
            v-if="exibirFormulario"
            :tarefa="tarefaSelecionada"
            @criar="criarTarefa"
            @editar="editarTarefa"/>

    </div>
</template>

<script>

import axios from '@/axios'

import TarefaSalvar from './TarefaSalvar.vue'
import TarefasListaIten from './TarefasListaIten.vue'

export default {
    components: {
        TarefaSalvar,
        TarefasListaIten
    },
    data() {
        return {
            tarefas: [],
            exibirFormulario: false,
            tarefaSelecionada: undefined
        }
    },
    computed: {
        tarefasOrdenadas() {
            return this.tarefas.slice().sort((t1, t2) => {
                if(t1.concluido === t2.concluido){
                    return t1.titulo < t2.titulo
                        ? -1
                        : t1.titulo > t2.titulo
                            ? 1
                            : 0
                }
                return t1.concluido - t2.concluido
            })
        }
    },
    created(){
        axios.get(`/tarefas`)
            .then((response) => {
                console.log('GET /tarefas', response)
                this.tarefas = response.data
            }, error => {
                console.log('Error capturado no then: ', error)
                return Promise.reject(error)
            })
    },
    methods: {
        criarTarefa(tarefa) {
            axios.post(`/tarefas`, tarefa)
                .then( response => {
                    console.log('POST /tarefas', response)
                    this.tarefas.push(response.data)
                    this.resetar()
                })
            // axios.request({
            //     method: "POST",
            //     baseURL: config.apiUrl,
            //     url: '/tarefas',
            //     data: tarefa
            // }).then( response => {
            //     console.log('POST /tarefas', response)
            //     this.tarefas.push(response.data)
            //     this.resetar()
            // })
        },
        exibirFormCriar() {
            if(this.tarefaSelecionada){
                this.tarefaSelecionada = undefined
                return
            }            
            this.exibirFormulario = !this.exibirFormulario
        },
        async deletarTarefa(tarefa) {
            const confirm = window.confirm('Deseja mesmo DELETAR essa tarefa: "'+tarefa.titulo+'"?')
            if(confirm) {
                // axios.delete(`/tarefas/${tarefa.id}`)
                //     .then( response => {
                //         console.log(`DELETE /tarefas/${tarefa.id}`, response)
                //         const indice = this.tarefas.findIndex(t => t.id === tarefa.id)
                //         this.tarefas.splice(indice, 1)
                //     })
                const response = await axios.delete(`/tarefas/${tarefa.id}`)
                console.log(`DELETE /tarefas/${tarefa.id}`, response)
                const indice = this.tarefas.findIndex(t => t.id === tarefa.id)
                this.tarefas.splice(indice, 1)
            }
        },
        editarTarefa(tarefa) {
            axios.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(response => {
                    console.log('PUT /tarefas/'+tarefa.id, response)
                    const indice = this.tarefas.findIndex(t => t.id === tarefa.id)
                    this.tarefas.splice(indice, 1, tarefa)
                    this.resetar()
                })
            
        }, 
        resetar() {
            this.tarefaSelecionada = undefined
            this.exibirFormulario = false
        },
        selecionarTarefaEdicao(tarefa) {
            this.tarefaSelecionada = tarefa
            this.exibirFormulario = true
        }
    }
}
</script>
