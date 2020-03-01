import Vue from 'vue'

export default new Vue({
    data: {
        autenticado: false,
        contatos: [
            { id: 1, nome: 'Isaac Newton', email: 'isaac@gmail.com' },
            { id: 2, nome: 'Albert Einstein', email: 'einsten@gmail.com' },
            { id: 3, nome: 'Stephen Hawking', email: 'stephen@gmail.com' }
        ],
        id: 3
    },
    created(){
        this.$on('autenticar', (autenticado) => {
            this.autenticado = autenticado
        })
    },
    methods: {
        buscarContato(id){
            return Object.assign({}, this.contatos.find(c => c.id === id))
        },
        editarContato(contato){
            const indice = this.contatos.findIndex(c => c.id === contato.id)
            this.contatos.splice(indice, 1, contato)
        },
        gerarId(){
            this.id++
            return this.id
        },
        addContato(contato) {
            this.contatos.push(contato)
        },
        excluir(id){
            const indice = this.contatos.findIndex(c => c.id === id)
            this.contatos.splice(indice, 1)
        }
    }
})