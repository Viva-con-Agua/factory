<template>
    <div class="content-text">
        <vca-card>
            <h2>{{ $t('page.email') }}</h2>
            <vca-accordion :header="$t('email.addresses.title')">
                <div slot="body">
                    <InsertEmail />
                    
                </div>
            </vca-accordion>
            <vca-accordion :header="$t('email.jobs.title')">
                <div slot="body">
                    <InsertJob/>
                    <JobList/>
                    <JobUpdate v-if="current!=null"/>
                </div>
            </vca-accordion>
        </vca-card>
    </div>
</template>
<script>
import InsertEmail from '@/components/mail/InsertEmail'
import InsertJob from '@/components/mail/InsertJob'
import JobList from '@/components/mail/JobList'
import JobUpdate from '@/components/mail/JobUpdate'
import { mapGetters } from 'vuex'
export default {
    name: 'Applications',
    components: {
        JobList, JobUpdate, InsertJob, InsertEmail
    },
    computed: {
        ...mapGetters({
            current: 'mail/job/current'
        })
    },
    created () {
        this.$store.dispatch('mailView')
    }
}

</script>

