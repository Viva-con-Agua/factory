<template>
    <div>
        <vca-input
            ref="name"
            :errorMsg="$t('email.jobs.insert.error.name')"
            :placeholder="$t('email.jobs.insert.placeholder.name')"
            v-model.trim="create.name"
            :title="$t('email.jobs.insert.title.name')"
            :rules="$v.create.name">
        </vca-input>
        <vca-input
            ref="case"
            :errorMsg="$t('email.jobs.insert.error.case')"
            :placeholder="$t('email.jobs.insert.placeholder.case')"
            v-model.trim="create.case"
            :title="$t('email.jobs.insert.title.case')"
            :rules="$v.create.case">
        </vca-input>
        <vca-input
            ref="scope"
            :errorMsg="$t('email.jobs.insert.error.scope')"
            :placeholder="$t('email.jobs.insert.placeholder.scope')"
            v-model.trim="create.scope"
            :title="$t('email.jobs.insert.title.scope')"
            :rules="$v.create.scope">
        </vca-input>
        <vca-dropdown :placeholder="$t('email.jobs.insert.placeholder.email_id')" />

        <div class="vca-row">
                          
        </div>
        <button class="vca-button" @click.self.prevent="validate">{{ $t('actions.create') }}</button>
    </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
    name: 'InsertJob',
    computed: {
        create: {
            get () {
                return this.$store.state.mail.job.create
            },
            set (value) {
                this.$store.commit('mail/job/create', value)
            }
        }
    },
    validations: {
        create: {
            name: { required },
            case: { required },
            scope: { required },
            template: { required },
            email_id: { required }
        }
    },
    methods: {
        validate() {
            if (this.$v.$invalid) {
                this.$refs.name.validate()
                this.$refs.case.validate()
                this.$refs.scope.validate()
            } else {
                this.submit()
            }
        },
        submit() {
            this.$store.dispatch({type: 'mail/job/add'})
                .then(() => {
                    this.$emit('success')
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }


}
</script>
