<template>
    <vca-card>
        <h2>{{ $t('page.email') }}</h2>
        <JobList/>
        <JobUpdate v-if="current!=null"/>
    </vca-card>
</template>
<script>
import JobList from '@/components/mail/JobList'
import JobUpdate from '@/components/mail/JobUpdate'
import { mapGetters } from 'vuex'
export default {
    name: 'Applications',
    components: {
        JobList, JobUpdate
    },
    computed: {
        ...mapGetters({
            current: 'mail/job/current'
        })
    },
    created () {
        this.$store.dispatch({ type: "mail/job/list"})
    }
}

</script>

