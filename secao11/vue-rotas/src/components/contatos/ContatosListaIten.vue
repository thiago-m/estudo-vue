<template>
    <li>
        <span> {{ contato.nome }} </span>
        <router-link 
            class="btn btn-info btn-sm float-right"
            :to="{path: `/contatos/${contato.id}`}"
        >
            Detalhes
        </router-link>
        <!-- <button
            class="btn btn-info btn-sm float-right"
            @click="verDetalhes">
                Detalhes
        </button> -->
    </li>
</template>

<script>
export default {
    props: {
        contato: {
            type: Object,
            required: true
        }
    }, 
    methods: {
        verDetalhes(event) {
            // this.$router.push(`/contatos/${this.contato.id}`)
            // this.$router.push({path: `/contatos/${this.contato.id}`})
            // this.$router.replace({path: `/contatos/${this.contato.id}`})
            // this.$router.push({name: 'contatos', params: {id: this.contato.id} })
        }
    }
}
</script>