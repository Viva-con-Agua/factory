<template>
    <div class="content-text">
        <vca-card>
            <h1 v-if="user">{{ $t('overview.welcome', {0: user.display_name}) }}</h1>
            <h1 v-else>{{ $t('overview.welcome', {0: ""}) }}</h1>
        </vca-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Overview',
    computed: {
        ...mapGetters({
            user: 'user/profile/current'
        })
    }
}
</script>
