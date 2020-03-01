import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import vuelidate from '@/plugins/vuelidate'
import vuetify from '@/plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuelidate,
  vuetify,
  render: h => h(App)
}).$mount('#app')
