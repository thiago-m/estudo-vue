import Vue from 'vue'
import VueRouter from 'vue-router'

import EventBus from './event-bus'

const Contatos = () => import(/* webpackChunkName: "contatos" */ './views/contatos/Contatos.vue')
const ContatosHome = () => import(/* webpackChunkName: "contatos" */ './views/contatos/ContatosHome.vue')
const ContatoDetalhes = () => import(/* webpackChunkName: "contatos" */ './views/contatos/ContatoDetalhes.vue')
const ContatoEditar = () => import(/* webpackChunkName: "contatos" */ './views/contatos/ContatoEditar.vue')
const addContato = () => import(/* webpackChunkName: "contatos" */ './views/contatos/ContatoAdd.vue')

Vue.use(VueRouter)

const extrairParametroId = route => ({
  id: +route.params.id
})

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {path: '/home', component: () => import('./views/Home.vue')},
    {path: '/login', component: () => import('./views/login/Login.vue')},
    {path: '/', redirect: '/contatos'},
    // {path: '/', redirect: to => { return '/contatos' } },
    {path: '/addContato', component: addContato, meta: { requerAutenticacao: true }},
    {
      path: '/contatos', 
      alias: ['/meus-contatos', '/lista-contatos'],
      component: Contatos,
      props: (route) => {
        const busca = route.query.busca
        return busca ? {busca} : {}
      },
      children: [
        {
          path: ':id(\\d+)', 
          component: ContatoDetalhes, 
          name: 'contato',
          props: extrairParametroId,
          meta: { requerAutenticacao: true }
        },
        {
          // path: ':id(\\d+)/editar/:opcional?', 
          // path: ':id(\\d+)/editar/:zaroOuMais*', 
          // path: ':id(\\d+)/editar/:umOuMais+',
          path: ':id(\\d+)/editar',
          meta: { requerAutenticacao: true },
          beforeEnter(to, from, next) {
            console.log('beforeEnter')
            next() // continuar
            // next(true) //continuar
            // next(false) // bloquear
            // next('/contatos') // redirect
            // next({name: 'contatos'}) // redirecionar
            // next(new Error('Permissões insuficientes')) // bloqueia e gera erro no console
          }, 
          components: {
            default: ContatoEditar
          }, 
          props: {
            default: extrairParametroId
          }
        },
        {path: '', component: ContatosHome},
        { path: '*', component: () => import('./views/contatos/Erro404Contatos.vue') }
      ]
    },
    { path: '*', component: () => import('./views/Erro404.vue') }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('beforeEach')
  console.log('Requer Autenticação?', to.meta.requerAutenticacao)
  const estaAutenticado = EventBus.autenticado
  if(to.matched.some(rota => rota.meta.requerAutenticacao)) {
    if(!estaAutenticado) {
      next({
        path: '/login',
        query: {redirecionar: to.fullPath}
      })
      return
    }
  }
  next()
})

router.beforeResolve((to, from, next) => {
  console.log('beforeResolve')
  next()
})

router.afterEach((to, from) => {
  console.log('afterEach')
})

router.onError( error => {
  console.log(error)
} )

export default router