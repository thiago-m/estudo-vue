<template>
    <div>
        <labeL> {{ customLabel }} </labeL>
        <input 
            :class="inputClasses"
            v-bind="this.$attrs"
            type="range"
            :value="value"
            @input="atualizar">
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        label: String,
        value: [Number, String],
        inputClasses: [String, Object, Array]
    },
    computed: {
        customLabel() {
            return `${this.label} (R$ ${this.value || this.$attrs.min})`
        }
    },
    methods: {
        atualizar(event) {
            const valor = event.target.value
            this.$emit('input', valor)
        }
    }
}
</script>