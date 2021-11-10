<template>
    <div>
        <vca-input
            ref="name"
            :errorMsg="$t('company.insert.error.name')"
            :placeholder="$t('company.insert.placeholder.name')"
            v-model.trim="create.name"
            :rules="$v.create.name">
        </vca-input>

        <vca-input
            ref="country"
            :errorMsg="$t('company.insert.error.country')"
            :placeholder="$t('company.insert.placeholder.country')"
            v-model.trim="create.country"
            :rules="$v.create.country">
        </vca-input>

        <vca-input
            ref="country"
            :errorMsg="$t('company.insert.error.country')"
            :placeholder="$t('company.insert.placeholder.country')"
            v-model.trim="create.country"
            :rules="$v.create.country">
        </vca-input>
        <vca-input
            ref="country"
            :errorMsg="$t('company.insert.error.country')"
            :placeholder="$t('company.insert.placeholder.country')"
            v-model.trim="create.country"
            :rules="$v.create.country">
        </vca-input>
        
        <vca-field-row>
            <vca-input-date first ref="start_time" v-model="create.start_time" :errorMsg="$t('company.insert.error.start_time')" :rules="$v.create.start_time" format="dd.MM.yyyy" :placeholder="$t('company.insert.placeholder.start_time')"/>
            <vca-input-date last ref="end_time" v-model="create.end_time" :errorMsg="$t('company.insert.error.end_time')" :rules="$v.create.end_time" format="dd.MM.yyyy" :placeholder="$t('company.insert.placeholder.end_time')"/>
        </vca-field-row>
        <vca-checkbox v-model="create.private" >
            <span v-html="$t('company.insert.placeholder.private')"></span><br/>
        </vca-checkbox>

        <vca-dropdown ref="type" v-model="create.type" :options="company_types" :title="$t('company.insert.type.title')" :placeholder="$t('company.insert.placeholder.type')" label=""/>

        <button class="vca-button" @click.self.prevent="validate">{{ $t('actions.create') }}</button>
    </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
//import ImageUpload from '@/components/campaign/ImageUpload.vue'
export default {
    name: 'InsertCompany',
    components: {
  //      ImageUpload
    },
    data() {
        return {}
    },
    computed: {
        create: {
            get () {
                return this.$store.state.company.create
            },
            set (value) {
                this.$store.commit('company/create', value)
            }
        }
    },
    validations: {
        create: {
            crm_id: { required },
            name: { required },
            title: { required },
            description: { required },
            start_time: { required },
            end_time: { required },
            type: { required }
        }
    },
    methods: {
        validate() {
            if (this.$v.$invalid) {
                alert("")
                this.$refs.crm_id.validate()
                this.$refs.name.validate()
                this.$refs.title.validate()
                this.$refs.description.validate()
                this.$refs.start_time.validate()
                this.$refs.end_time.validate()
                this.$refs.type.validate()
            } else {
                this.submit()
            }
        },
        submit() {
            this.$store.dispatch({type: 'company/add'})
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
