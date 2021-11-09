<template>
    <div class="content-text">
        <vca-card>
            <h2>{{ $t('page.email') }}</h2>


            <vca-tabs>
                <vca-tab :title="$t('email.jobs.title')" selected="true">

                    <vca-accordion :header="$t('email.jobs.insert')">
                        <div slot="body">
                            <InsertJob/>
                        </div>
                    </vca-accordion>


                    <vca-accordion :header="$t('email.jobs.list')">
                        <div slot="body">

                            <JobList/>


                            <vca-popup v-if="current!=null" :show="current!=null" :title="$t('event.popup.edit', {0: current.name})" @close="setCurrent()">
                                <JobUpdate />
                            </vca-popup>
                        </div>
                    </vca-accordion>


                </vca-tab>
                <vca-tab :title="$t('email.addresses.title')">

                    <vca-accordion :header="$t('email.addresses.isert')">
                        <div slot="body">
                            <InsertEmail />
                        </div>
                    </vca-accordion>
                        
                </vca-tab>
            </vca-tabs>

            
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
    },
    methods: {
        setCurrent() {
            this.$store.commit("mail/job/current", null)
        }
    }
}

</script>

