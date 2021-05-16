<template>
    <div>
        <vca-number
            ref="crm_id"
            :errorMsg="$t('event.insert.error.crm_id')"
            :placeholder="$t('event.insert.placeholder.crm_id')"
            :max="Infinity"
            :min="1"
            v-model.trim="current.crm_id"
            :rules="$v.current.crm_id">
        </vca-number>
        <vca-input
            ref="name"
            :errorMsg="$t('event.insert.error.name')"
            :placeholder="$t('event.insert.placeholder.name')"
            v-model.trim="current.name"
            :rules="$v.current.name">
        </vca-input>
        <vca-input
            ref="title"
            :errorMsg="$t('event.insert.error.title')"
            :placeholder="$t('event.insert.placeholder.title')"
            v-model.trim="current.title"
            :rules="$v.current.title">
        </vca-input>
        <vca-textarea
            ref="description"
            :errorMsg="$t('event.insert.error.description')"
            :placeholder="$t('event.insert.placeholder.description')"
            v-model="current.description"
            :rules="$v.current.description">
        </vca-textarea>
        <vca-field-row>
            <vca-input-date first ref="start_time" v-model="current.start_time" :errorMsg="$t('event.insert.error.start_time')" :rules="$v.current.start_time" format="dd.MM.yyyy" :placeholder="$t('event.insert.placeholder.start_time')"/>
            <vca-input-date last ref="end_time" v-model="current.end_time" :errorMsg="$t('event.insert.error.end_time')" :rules="$v.current.end_time" format="dd.MM.yyyy" :placeholder="$t('event.insert.placeholder.end_time')"/>
        </vca-field-row>
        <vca-checkbox v-model="current.private" >
            <span v-html="$t('event.insert.placeholder.private')"></span><br/>
        </vca-checkbox>

        <vca-dropdown ref="type" v-model="event_type" :options="event_types" :title="$t('event.insert.type.title')" :placeholder="$t('event.insert.placeholder.type')" label=""/>

        <button 
               class="vca-button-small"
               @click.self.prevent="validate">
            Submit
        </button>
    </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
//import ImageUpload from '@/components/campaign/ImageUpload.vue'
export default {
    name: 'UpdateApp',
    components: {
  //      ImageUpload
    },
    data() {
        return {
            event_types: [
                {"title":"Run4WATER", "label":"Run4WATER", "subtitle": this.$t('event.insert.type.option.run') ,"value":"run"},
                {"title":"Ride4WATER", "label":"Ride4WATER", "subtitle": this.$t('event.insert.type.option.ride'),"value":"ride"}
            ]

        }
    },
    computed: {
        current: {
            get () {
                return this.$store.state.campaign.current
            },
            set (value) {
                this.$store.commit('campaign/current', value)
            }
        },
        event_type: {
            get () {
                return [this.event_types.find(el => el.value == this.$store.state.campaign.current.type)]
            },
            set (value) {
                this.$store.commit('campaign/updatetype', value[0].value)
            }
        }
    },
    validations: {
        current: {
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
            this.$store.dispatch({type: 'campaign/update'})
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
