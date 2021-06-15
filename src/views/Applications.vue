<template>
    <div class="content-text">
        <vca-card>
            <h2>{{ $t('page.apps') }}</h2>
            <InsertApp/>
            <ListApps/>
            <UpdateApp v-if="current!=null"/>
        </vca-card>
    </div>
</template>
<script>
import InsertApp from '@/components/apps/InsertApp'
import ListApps from '@/components/apps/ListApps'
import UpdateApp from '@/components/apps/UpdateApp'
import { mapGetters } from 'vuex'
export default {
    name: 'Applications',
    components: {
        InsertApp,
        ListApps,
        UpdateApp,
    },
    computed: {
        ...mapGetters({
            current: 'app/current'
        })
    },
    created () {
        this.$store.dispatch({ type: "app/list"})
    }
}

</script>

