<template>
    <div class="vca-input-checkbox" :class="{error: hasError}">
        <label class="container">
            <input type="checkbox" :id="id" :value="cont" v-model="checkedArray" @change="change">
            <span class="checkmark"></span>
            <slot></slot>
        </label>
        <span class="error-msg" v-if="hasError">{{ errorMsg }}</span>
    </div>
</template>
<script>
export default {
    name: 'VcaCheckboxSelect',
    props: {
        id: {
            type:String,
            default: ""
        },
        value: {
            type: Array,
            default: function() {
                return []
            }
        },
        cont: {
            type: String,
            default: ""
        },
        errorMsg: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: 'please fill'
        },
        rules: {
            type: Object,
            default: null
        }
    },
    data(){
        return {
            checkedArray: [],
            hasError: false
        }
    },
    methods: {
        change (e) {
            this.$emit('input',  e.target.checked)
        },
        // validate form via vuelidate
        validate () {
            // if validate is set
            if (this.rules !== null) {
                if (this.rules.$invalid) {
                    this.hasError = true
                } else {
                    this.hasError = false
                }
            }
        }
    }
}
</script>
