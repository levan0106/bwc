<template>
    <el-row>
            <el-steps :active="active" finish-status="success" >
                <el-step v-for="step in steps" :title="step.Label" :key="step.Value"></el-step>			  
            </el-steps>
        </el-row>
</template>

<script>
export default {
    name:'Process',
    props:{
        active:{
            type:Number,
            default:1
        },
        steps:{
            type:Array
        }
    }
}
</script>
