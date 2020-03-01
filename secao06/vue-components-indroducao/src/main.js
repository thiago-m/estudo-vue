import Vue from 'vue'

import App from './App.vue'

// Componente Global
// import AppHeader from './AppHeader.vue'
// Vue.component('app-header', AppHeader)

new Vue({
  render: h => h(App)
}).$mount('#app')
