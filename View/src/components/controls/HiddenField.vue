<template>
    <el-input type="text" v-model="inputValue" class="hide" disabled/>
</template>

<script>
export default {
    name:"HidenField",
    props:['value'],
    computed:{
        inputValue: {
            get: function() {
                return this.value
            },
            set: function(value) {
                this.$emit('input', value)
            }
        }
}
    }

</script>

<style lang="less">
.hide{
    display: none !important;
}
</style>
