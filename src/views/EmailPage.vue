<template>
    <vca-card>
        <JobList/>
    </vca-card>
</template>
<script>
import JobList from '@/components/mail/JobList'
//import { mapGetters } from 'vuex'
export default {
    name: 'Applications',
    components: {
        JobList
    },
/*    computed: {
        ...mapGetters({
            current: 'app/current'
        })
    },*/
    created () {
        this.$store.dispatch({ type: "mail/job/list"})
    }
}

</script>

