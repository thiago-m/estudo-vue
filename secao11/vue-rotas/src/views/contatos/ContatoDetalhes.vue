<template>
    <div v-if="contato">
        <h3 class="font-weight-light">Nome: {{ contato.nome }}</h3>
        <p>Email: {{contato.email}}</p>
        <button 
            class="btn btn-secondary mr-2" 
            @click="$router.back()">
                Voltar
        </button>
        <router-link 
            class="btn btn-primary mr-2"
            :to="`/contatos/${id}/editar`"> 
                Editar 
        </router-link>
        <button 
            class="btn btn-danger mr-2" 
            @click="excluir">
                Excluir
        </button>
    </div>
</template>

<script>

import EventBus from '@/event-bus'

export default {
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data(){
        return {
            contato: undefined
        }
    },
    created(){
        this.contato = EventBus.buscarContato(this.id)
    },
    // beforeRouteEnter(to, from, next){
    //     next(vm => {
    //         // vm.contato = EventBus.buscarContato(vm.id)
    //         vm.contato = EventBus.buscarContato(+to.params.id)
    //     })
    // },
    beforeRouteUpdate(to, from, next) {
        this.contato = EventBus.buscarContato(+to.params.id)
        console.log('beforeRouteUpdate')
        next()    
    },
    methods: {
        excluir(){
            EventBus.excluir(this.id)
            this.$router.push('/contatos')
        }
    }
}
</script>