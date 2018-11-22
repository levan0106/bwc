<template>
    <div id="title" :class="noPadding?'no-padding':''">
        <span>
            <slot></slot>
        </span>
    </div>
</template>

<script>
export default {
    name:"Title",
    props:{
        noPadding:{
            type:Boolean,
            default:false
        }
    }
}
</script>

<style lang="less">
    @border-color:#B3C0D1;
    #title{
        margin: 15px 0;
        font-size: 18px;
        border-bottom: 2px solid @border-color;
        &.no-padding{
            margin:0px !important
        }
        span{
                //border-bottom: 5px solid;
                line-height: 32px;
        }
    }
</style>
