<template>
    <div>
        <app-header />
        <ContadorInfo />
        <Contador></Contador>
    </div>
</template>

<script>

import AppHeader from './components/shared/AppHeader.vue'
import Contador from './components/contador/Contador.vue'
import ContadorInfo from './components/contador/ContadorInfo.vue'

export default {
  components: {
    AppHeader, // <- isso é o mesmo que isso -> 'AppHeader': AppHeader,
    Contador, // <- isso é o mesmo que isso -> 'app-contador': AppContador
    ContadorInfo
  }
}
</script>
