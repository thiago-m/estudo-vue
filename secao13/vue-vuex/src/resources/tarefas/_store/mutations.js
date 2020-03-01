import {
    CRIAR_TAREFAS,
    EDITAR_TAREFAS,
    DELETAR_TAREFA,
    LISTAR_TAREFAS,
    TAREFA_SELECIONADA,
    SETAR_ERROR
} from './mutation-types'

export default {
    [CRIAR_TAREFAS]: (state, {tarefa}) => {
        state.tarefas.push(tarefa)
    },
    [EDITAR_TAREFAS]: (state, {tarefa}) => {
        const indice = state.tarefas.findIndex(t => t.id === tarefa.id)
        state.tarefas.splice(indice, 1, tarefa)
    },
    [DELETAR_TAREFA]: (state, {tarefa}) => {
        const indice = state.tarefas.findIndex(t => t.id === tarefa.id)
        state.tarefas.splice(indice, 1)

    },
    [LISTAR_TAREFAS]: (state, {tarefas}) => {
        state.tarefas = tarefas
    },
    [TAREFA_SELECIONADA]: (state, {tarefa}) => {
        state.tarefaSelecionada = tarefa
    },
    [SETAR_ERROR]: (state, {erro}) => {
        state.erro = erro
    }
}