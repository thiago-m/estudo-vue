<template>
    <div>
        <h1> {{ titulo }} </h1>
        <input v-model="titulo">
    </div>
</template>

<script>
    export default {
        data: () => {
            return {
                titulo: "Olá Vue.js"
            }
        }   
    }
</script>