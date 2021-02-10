<template>
    <div>
        <vca-number
            ref="crm_id"
            errorMsg="Bitte crm id angeben"
            placeholder="Crm Id"
            v-model.trim="crm_id"
            :rules="$v.create.crm_id">
        </vca-number>
        <vca-input
            ref="app_name"
            errorMsg="Bitte app name angeben"
            placeholder="App Name"
            v-model.trim="create.name"
            :rules="$v.create.name">
        </vca-input>
        <vca-input
            ref="redirect_url"
            errorMsg="Description"
            placeholder="Description"
            v-model="create.description"
            :rules="$v.create.description">
        </vca-input>
        <vca-field-row>
            <vca-input-date v-model="start_time" errorMsg="Enter date" :rules="$v.create.start_time" format="dd.mm.yyyy" placeholder="Select Date"/>
            <vca-input-date v-model="end_time" errorMsg="Enter date" :rules="$v.create.end_time" format="dd.mm.yyyy" placeholder="Select Date"/>
        </vca-field-row>
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
    computed: {
        create: {
            get () {
                return this.$store.state.campaign.create
            },
            set (value) {
                this.$store.commit('campaign/create', value)
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
                var date = new Date(this.$store.state.campaign.create.start_time * 1000)
                console.log(date)
                return date
            },
           set (value) {
                var date = new Date(value)
                date = date / 1000
                this.$store.commit('campaign/start_time', Math.round(date))
            }
        },
       end_time: {
            get () {
                var date = new Date(this.$store.state.campaign.create.start_time * 1000)
                console.log(date)
                return date
            },
            set (value) {
                var date = new Date(value)
                date = date / 1000
                this.$store.commit('campaign/end_time', Math.round(date))
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
