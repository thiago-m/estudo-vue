<template>
  <div id="app" class="container">

    <h1>Components Dinâmicos</h1>

    <button @click="componentSelecionado = 'Home'">Home</button>
    <button @click="componentSelecionado = 'PostsLista'">Posts</button>
    <button @click="componentSelecionado = 'Sobre'">Sobre</button>
    <button @click="componentSelecionado = 'Assincrono'">Assincrono</button>
    <button @click="componentSelecionado = 'Contato'">Contato</button>

    <keep-alive :max="2">
      <component
        :is="componentSelecionado"
        v-bind="propsAtuais"
      />
    </keep-alive>

  </div>
</template>

<script>

import Home from './components/Home.vue'
import PostsLista from './components/PostsLista.vue'
import Sobre from './components/Sobre.vue'

const Contato = {
  render: h => h({
    name: 'ContatoComponet',
    template: '<h2>Component Anonimo</h2>'
  })
}

export default {
  components: {
    Assincrono: () => ({
      component: new Promise((resolve /*,reject*/) => {
        setTimeout(() => {
          resolve(import('./components/Assincrono.vue'))
          // reject('Falha carregamento')
        }, 2000)
      }),
      loading: {template: '<p>Carregando...</p>'},
      error: {template: '<p>Erro ao carregar component</p>'},
      delay: 200,
      timeout: 3000
    }),
    Home,
    PostsLista,
    Sobre,
    Contato
  },
  data(){
    return {
      componentSelecionado: 'Home',
      posts: [
        { id:1, titulo:'começando no Vue', conteudo:'Components são uma das peças mais importantes no Vue', autor:'Thiago Marciel' },
        { id:1, titulo:'Distribuindo conteúdo com Slots', conteudo:'Slots podems er usados como repositórios de código HTML', autor:'Thiago Marciel' }
      ]
    }
  },
  computed: {
    propsAtuais() {
      return this.componentSelecionado === 'PostsLista'
      ? { posts: this.posts }
      : {}
    }
  }
}
</script>

<style scoped>
  .container{
    max-width: 1200px;
    margin: auto;
  }
</style>