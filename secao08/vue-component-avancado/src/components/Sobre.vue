<template>
    <div>
        <h2>Sobre</h2>

        <p v-if="autor">Autor: {{autor}}</p>
        <input type="text" name="" id="" v-model="autor">
    </div>
</template>

<script>
export default {
    data(){
        return {
            autor: ''
        }
    },
    created() {
        this.autor = 'created'
    },
    destroyed() {
        this.autor = 'Destroyed!'    
    },
    activated() {
        this.autor = 'Activated!'
    },
    deactivated() {
        this.autor = 'Deactivated!'
    }
}
</script>