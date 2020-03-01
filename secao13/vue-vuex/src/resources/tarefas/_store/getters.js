export default {
    tarefasConcluidas: (state, getters, rootState, rootGetters) => {
        return state.tarefas.filter(t => t.concluido)
    },
    tarefasAFazer: state => state.tarefas.filter(t => !t.concluido),
    totalDeTarefasConcluidas: (state, getters) => getters.tarefasConcluidas.length,
    buscarTarefaPorId: state => id => state.tarefas.find(t => t.id === id),
    boasVindas: (state, getters, rootState, rootGetters) => {
        console.log('State Global: ', rootState.usuario)
        console.log('Getter Global: ', rootGetters.mensagemBoasVindas)
        return rootGetters.mensagemBoasVindas
    }
}