<template>
    <vca-card>
        <InsertApp/>
        <ListApps/>
        <UpdateApp v-if="current!=null"/>
    </vca-card>
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

