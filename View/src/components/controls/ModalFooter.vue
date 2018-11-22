<template>
    <div id="footer" class="el-dialog__footer ">
        <div  class="dialog-footer">
            <slot/>
        </div>
    </div>
</template>

<script>
export default {
    name:"ModalFooter"
}
</script>

<style lang="less">
#footer{
    &.el-dialog__footer {
        padding: 10px 0px 20px 0px;
        text-align: right;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
}
</style>
