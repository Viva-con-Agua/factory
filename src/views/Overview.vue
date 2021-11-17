<template>
    <div class="content-text">
        <vca-card>
            <h1> Overview Factory</h1>
            <h2>{{ user }}</h2>
        </vca-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Overview',
    computed: {
        ...mapGetters({
            user: 'session/user'
        })
    }
}
</script>
