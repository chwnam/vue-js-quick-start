<template>
    <div class="main">{{ msg }}</div>
</template>
<script>
export default {
    name: 'child-two',
    data() {
        return {
            msg: 'Child2'
        }
    }
}
</script>
<style scoped>
.main {
    border: solid 1px black;
    background-color: aqua;
}
</style>