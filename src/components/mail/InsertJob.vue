<template>
    <div>
        <vca-input
            ref="name"
            :errorMsg="$t('job.insert.error.name')"
            :placeholder="$t('job.insert.placeholder.name')"
            v-model.trim="create.name"
            :rules="$v.create.name">
        </vca-input>
        <vca-input
            ref="case"
            :errorMsg="$t('job.insert.error.case')"
            :placeholder="$t('job.insert.placeholder.case')"
            v-model.trim="create.case"
            :rules="$v.create.case">
        </vca-input>
        <vca-input
            ref="scope"
            :errorMsg="$t('job.insert.error.scope')"
            :placeholder="$t('job.insert.placeholder.scope')"
            v-model.trim="create.scope"
            :rules="$v.create.scope">
        </vca-input>
        <vca-dropdown :placeholder="$t('job.insert.placeholder.email_id')" />

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
