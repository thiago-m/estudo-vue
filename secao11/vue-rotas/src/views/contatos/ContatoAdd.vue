<template>
    <div>
        <h3 class="font-weight-light">Novo Contato</h3>
        <form @submit.prevent="salvar">
            <div class="form-group">
                <label>Nome</label>
                <input 
                    type="text" 
                    class="form-control"
                    placeholder="Insira o nome"
                    v-model="contato.nome"
                >
            </div>
            <div class="form-group">
                <label>Email</label>
                <input 
                    type="email" 
                    class="form-control"
                    placeholder="Insira o email"
                    v-model="contato.email"
                >
            </div>
            <button 
                type="button"
                class="btn btn-secondary mt-4 mr-2 mb-4"
                @click="$router.back()">
                    Voltar
            </button>
            <button 
                type="submit"
                class="btn btn-success mt-4 mb-4">
                    Salvar
            </button>
        </form>
    </div>
</template>

<script>

import EventBus from '@/event-bus'

export default {
    props: ['id'],
    data(){
        return {
            contato: {
                id: 0,
                nome: '',
                email: ''
            },
            cancel: true
        }
    },
    beforeRouteEnter(to, from, next) {
        console.log('beforeRouteEnter')
        next(vm => {
            vm.contato.id = EventBus.gerarId() + 1
        })        
    },
    beforeRouteLeave(to, from, next) {
        console.log('beforeRouteLeave')
        this.cancel ? next(window.confirm('Deseja mesmo sair?')) : next()
    }, 
    methods: {
        salvar(){
            EventBus.addContato(this.contato)
            this.cancel = false
            this.$router.push('/contatos')
        }
    }
}
</script>