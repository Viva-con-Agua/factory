<template>
    <div>
        <vca-number
            ref="crm_id"
            :errorMsg="$t('events.insert.error.crm_id')"
            :placeholder="$t('events.insert.placeholder.crm_id')"
            :max="Infinity"
            :min="1"
            v-model.trim="create.crm_id"
            :rules="$v.create.crm_id">
        </vca-number>
        <vca-input
            ref="name"
            :errorMsg="$t('events.insert.error.name')"
            :placeholder="$t('events.insert.placeholder.name')"
            v-model.trim="create.name"
            :rules="$v.create.name">
        </vca-input>
        <vca-input
            ref="title"
            :errorMsg="$t('events.insert.error.title')"
            :placeholder="$t('events.insert.placeholder.title')"
            v-model.trim="create.title"
            :rules="$v.create.title">
        </vca-input>
        <vca-textarea
            ref="description"
            :errorMsg="$t('events.insert.error.description')"
            :placeholder="$t('events.insert.placeholder.description')"
            v-model="create.description"
            :rules="$v.create.description">
        </vca-textarea>
        <vca-field-row>
            <vca-input-date first ref="start_time" v-model="create.start_time" :errorMsg="$t('events.insert.error.start_time')" :rules="$v.create.start_time" format="dd.MM.yyyy" :placeholder="$t('events.insert.placeholder.start_time')"/>
            <vca-input-date last ref="end_time" v-model="create.end_time" :errorMsg="$t('events.insert.error.end_time')" :rules="$v.create.end_time" format="dd.MM.yyyy" :placeholder="$t('events.insert.placeholder.end_time')"/>
        </vca-field-row>
        <vca-checkbox v-model="create.private" >
            <span v-html="$t('events.insert.placeholder.private')"></span><br/>
        </vca-checkbox>

        <vca-dropdown ref="type" v-model="event_type" :options="event_types" :title="$t('events.insert.type.title')" :placeholder="$t('events.insert.placeholder.type')" label=""/>

        <button class="vca-button" @click.self.prevent="validate">{{ $t('actions.create') }}</button>
    </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
//import ImageUpload from '@/components/campaign/ImageUpload.vue'
import VcaInputDate from '@/../../vca-ui/src/form/VcaDate.vue'

export default {
    name: 'InsertCampaign',
    components: {
  //      ImageUpload
        VcaInputDate
    },
    data() {
        return {
            event_types: [
                {"title":"Run4WATER", "label":"Run4WATER", "subtitle": this.$t('events.insert.type.option.run') ,"value":"run"},
                {"title":"Ride4WATER", "label":"Ride4WATER", "subtitle": this.$t('events.insert.type.option.ride'),"value":"ride"}
            ]

        }
    },
    computed: {
        create: {
            get () {
                return this.$store.state.campaign.create
            },
            set (value) {
                this.$store.commit('campaign/create', value)
            }
        },
        event_type: {
            get () {
                let ev = this.event_types.find(el => el.value == this.$store.state.campaign.create.type)
                return ev ? [ev] : []
            },
            set (value) {
                this.$store.state.campaign.create.type = value[0].value
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
        setHeaderImage(e) {
            this.headerImage = e
        },
        setContentImage(e) {
            this.contentImage = e
        },
        submit() {
            this.$store.dispatch({type: 'campaign/add'})
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
