<template>
<div class="el-input-number" :class="controlClass">
    <span v-if="showControls" role="button" class="el-input-number__decrease"><i class="el-icon-arrow-down"></i></span>
    <span v-if="showControls" role="button" class="el-input-number__increase"><i class="el-icon-arrow-up"></i></span>
    <input type="text" 
    v-model="displayValue"
     @blur="isInputActive = false" 
     @focus="isInputActive = true"
     class="el-input__inner"
     :disabled="disabled"/>
</div>
</template>

<script>
export default {
    name:"InputCurrency",
    props: {
        value:{
        },
        digit:{
            type:Number,
            default:2
        },
        currencyPosition:{
            type:String,
            default:'left'
        },
        currency:{
            type:String,
            default:'$'
        },
        controlsPosition:{
            type:String,
            default:''
        },
        showControls:{
            type:Boolean,
            default:false
        },
        disabled:{
            type:Boolean,
            default:false
        }
    },
    data: function() {
        return {
            isInputActive: false,
        }
    },
    computed: {
        
        controlClass(){
            let className=this.controlsPosition == "right" ? 'is-controls-right':''
            return className
        },
        displayValue: {
            get: function() {
                if (this.isInputActive) {
                    // Cursor is inside the input field. unformat display value for user
                    return this.value == null || isNaN(parseFloat(this.value))? 0: this.value.toString()
                } else {
                    // User is not modifying now. Format display value for user interface
                    let value = isNaN(parseFloat(this.value))? 0 : parseFloat(this.value).toFixed(this.digit).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
                    if(this.currencyPosition === 'left'){
                        return this.currency + value
                    }else{
                        return value + " " + this.currency
                    }
                    
                }
            },
            set: function(modifiedValue) {
                // Recalculate value after ignoring "$" and "," in user input
                let value = modifiedValue
                if(typeof(value) == 'string' && modifiedValue.startsWith('0'))
                    value =  modifiedValue.substring(1,modifiedValue.length)
                    
                let newValue = typeof(value) == 'number'? value : parseFloat(value.replace(/[^0-9.-]/g, ""))
                // Ensure that it is not NaN
                if (isNaN(newValue)) {
                    newValue = 0
                }
                // Note: we cannot set this.value as it is a "prop". 
                // It needs to be passed to parent component
                // $emit the event so that parent component gets it
                this.$emit('input', newValue)
            }
        }
    }
}
</script>

<style lang="less">
.el-input-number.is-controls-right{
    .el-input__inner{
        text-align: left;
        &:disabled{
            background-color: #f5f7fa;
            border-color: #e4e7ed;
            color: #c0c4cc;
            cursor: not-allowed;
        }
    }
}
</style>
