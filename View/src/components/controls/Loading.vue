<template>
<div class=" el-loading-parent--relative">
    <slot></slot>
    <div class="el-loading-mask" v-if="isLoading">
        <div class="el-loading-spinner" :class="positionIcon=='top'?'loading-icon-top':''">
            <svg viewBox="25 25 50 50" class="circular">
                <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
            </svg>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name:"Loading",
    props:{
        loading:{
            type:Boolean,
            default:true
        },
        positionIcon:{
            type:String,
            default:'center'
        }
    },
    computed:{
        isLoading(){
            return this.loading
        }
    }
}
</script>

<style lang="less">
    .loading-icon-top{
        top: 10% !important;
    }
</style>
