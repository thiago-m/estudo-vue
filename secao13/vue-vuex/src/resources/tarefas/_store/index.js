import getters from './getters' 
import actions from './actions' 
import mutations from './mutations'

const state = {
    tarefas: [],
    tarefaSelecionada: undefined,
    error: undefined
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}