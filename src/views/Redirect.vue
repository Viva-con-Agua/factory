<template>
    <div></div>
</template>
<script>
export default {
    name: 'Redirect',
    created () {
        window.location.href = 'http://localhost:8080/#/login?scope=factory'
    }
}
</script>
