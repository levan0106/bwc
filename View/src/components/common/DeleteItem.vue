<template>
    <el-popover
        placement="top"
        width="160"
        v-model="isDelete">
        <p>Are you sure to delete this?</p>
        <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="isDelete = false">cancel</el-button>
            <el-button type="primary" size="mini" @click="doDelete">confirm</el-button>
        </div>			
        <el-button type="text" :class="icon" slot="reference" :disabled="disabled">
            <slot/>
        </el-button>
    </el-popover>
</template>

<script>
import functions from '@/plugin/function'

export default {
    name:"DeleteItem",
    props:['deleteId',"icon","disabled"],
    data(){
        return({
            isDelete:false
        })
    },
    methods:{
        doDelete(){
            this.isDelete=false;
            this.$emit('do-delete',this.deleteId)
            //show message
            functions.$this = this
            functions.message.success()
        }
    }
}
</script>

<style>

</style>
