<template>
    <div class="fileupload-container">
        <div>
            <label for="uploadFile" class="vca-button-small vca-file-input-label">{{ currentFile }}</label>
            <div v-if="filename != ''" class="cancel-button vca-file-input-label"><button @click="resetFile" class="vca-button-small button "> X</button></div>
            <input @change="fileChange" :accept="allowedFiles" type="file" id="uploadFile" class="vca-file-input" name="fileupload">
        </div>
        <div>
            <button v-if="filename != ''" class="vca-button-small vca-file-input-label" @click="upload">{{ $t('file.upload') }}</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ImageUpload',
    data() {
        return {
            filename: '',
            allowedFiles: '.jpg, .jpeg, .png, .gif'
        }
    },
    methods: {
        upload(){
            var formData = new FormData()
            var imagefile = document.querySelector('#uploadFile')
            formData.append("file", imagefile.files[0])
            this.emit("submit", formData)
        },
        fileChange(event){

            var fileData =  event.target.files[0];

            var lastDot = fileData.name.lastIndexOf('.');
            var ext = fileData.name.substring(lastDot + 1);

            var allowed = this.allowedFiles.replace(/\./g,'').split(', ')

            if (!allowed.includes(ext)) {
                this.notification({
                    title: 'messages.title.warn',
                    body: this.$t('messages.files.error.extension', {0: this.allowedFiles}),
                    type: 'warn',
                })
                this.resetFile()
                return
            }

            this.filename = fileData.name;
        },
        resetFile(){
            var imagefile = document.querySelector('#uploadFile')
            imagefile.value = ''
            this.filename= '';
        }
    },
    computed: {
        currentFile() {
            return this.filename == '' ? this.$t('file.select') : this.filename
        }
    }
}
</script>
<style lang="scss">
    .fileupload-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .vca-file-input-label {
        display: inline-block;
        margin: 5px;
        width: max-content;

        button {
            margin: auto;
        }

    }

    .vca-file-input {
        display: none;
    }
</style>
