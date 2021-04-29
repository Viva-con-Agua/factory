<template>
    <div>
        <vca-number
            ref="crm_id"
            :errorMsg="$t('event.insert.crm_id.error')"
            :placeholder="$t('event.insert.crm_id.placeholder')"
            :max="Infinity"
            v-model.trim="crm_id"
            :rules="$v.create.crm_id">
        </vca-number>
        <vca-input
            ref="app_name"
            :errorMsg="$t('event.insert.name.error')"
            :placeholder="$t('event.insert.name.placeholder')"
            v-model.trim="create.name"
            :rules="$v.create.name">
        </vca-input>
        <vca-textarea
            ref="redirect_url"
            :errorMsg="$t('event.insert.description.error')"
            :placeholder="$t('event.insert.description.placeholder')"
            v-model="create.description"
            :rules="$v.create.description">
        </vca-textarea>
        <vca-field-row>
            <vca-input-date v-model="start_time" :errorMsg="$t('event.insert.start_time.error')" :rules="$v.create.start_time" format="dd.MM.yyyy" :placeholder="$t('event.insert.start_time.placeholder')"/>
            <vca-input-date v-model="end_time" :errorMsg="$t('event.insert.end_time.error')" :rules="$v.create.end_time" format="dd.MM.yyyy" :placeholder="$t('event.insert.end_time.placeholder')"/>
        </vca-field-row>
        <vca-checkbox v-model="create.private" >
            <span v-html="$t('event.insert.private.placeholder')"></span><br/>
        </vca-checkbox>

        <vca-dropdown v-model="event_type" :options="event_types" :title="$t('event.insert.type.title')" :placeholder="$t('event.insert.type.placeholder')" label=""/>

        <button 
               class="vca-button-small"
               @click.self.prevent="validate">
            Submit
        </button>
    </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
    name: 'InsertApp',
    data() {
        return {
            event_types: [
                {"title":"Run4WATER", "label":"Run4WATER", "subtitle": this.$t('event.insert.type.option.run') ,"value":"run"},
                {"title":"Ride4WATER", "label":"Ride4WATER", "subtitle": this.$t('event.insert.type.option.ride'),"value":"ride"}
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
                return this.event_types.find(el => el.value == this.$store.state.campaign.create.type)
            },
            set (value) {
                this.$store.commit('campaign/type', value[0].value)
            }
        },
        crm_id: {
            get () {
                return this.$store.state.campaign.create.crm_id.toString()  
            },
            set (value) {
                this.$store.commit('campaign/crm_id', value)
            }
        },
        start_time: {
            get () {
                return this.$store.state.campaign.create.start_time
            },
           set (value) {
                this.$store.commit('campaign/start_time', value)
            }
        },
       end_time: {
            get () {
                return this.$store.state.campaign.create.end_time
            },
            set (value) {
                this.$store.commit('campaign/end_time', value)
            }
        }
    },
    validations: {
        create: {
            crm_id: { required},
            name: { required },
            description: { required },
            start_time: { required },
            end_time: {required}
        }
    },
    methods: {
        validate() {
            if (this.$v.$invalid) {
                this.$refs.app_name.validate()
                this.$refs.redirect_url.validate()
                this.$refs.logout_url.validate()
            } else {
                this.submit()
            }
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
