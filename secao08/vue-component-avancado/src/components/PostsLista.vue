<template>
    <div>
        <h2>
            Lista de Posts
        </h2>
        <PostListaIten
            v-for="post in posts"
            :key="post.id"
            :post="post"
        >
            <slot :meuPost="post">
            </slot>
        </PostListaIten>
    </div>
</template>

<script>

import PostListaIten from './PostListaIten.vue'

export default {
    props: {
        posts: {
            type: Array,
            required: true
        }
    },
    components: {
        PostListaIten
    }
}
</script>