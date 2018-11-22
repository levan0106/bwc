<template>
    <div :class="controlClass">
        <label :class="labelClass">{{label}}</label>
        <div :class="descriptionClass"><slot/></div>
    </div>
</template>

<script>
export default {
    name:"FormControl",
    props:{
        label:{
            type:String || Object
        },
        border:{
            default:false,
            type:Boolean
        },
        inline:{
            default:false,
            type:Boolean
        }
    },
    data(){
        return({
            controlClass:this.border?"form-control border":"form-control",
            labelClass:this.inline?"control-label inline":"control-label",
            descriptionClass:this.inline?"control-description inline":"control-description"
        })
    }
}
</script>

<style lang="less">
    .form-control{
        padding: 0;
        .control-label{
            text-align: right;
            font-size: 14px;
            color: #606266;
            line-height: 40px;
            padding: 0 12px 0 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            &.inline{
                float: left;
            }
        }
        .control-description{
            font-weight: bold;
            &.inline{
                float: left;
                min-height: 40px;
                vertical-align: middle;
                line-height: 40px;
            }
        }
        &.border{
            border:1px solid #eaeae9;
            padding: 0 10px 10px;
        }
    }
</style>
