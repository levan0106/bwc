<template>
<div class="el-input-number" :class="controlClass">
    <span v-if="showControls" role="button" class="el-input-number__decrease" @click="decreaseNumber"><i class="el-icon-arrow-down"></i></span>
    <span v-if="showControls" role="button" class="el-input-number__increase" @click="increaseNumber"><i class="el-icon-arrow-up"></i></span>
    <input type="text" 
     v-model="displayValue"
     @blur="isInputActive = false" 
     @focus="isInputActive = true"
     class="el-input__inner"
     :disabled="disable"
     @change="onchange"/>
</div>
</template>

<script>
export default {
    name:"InputNumber",
    props: {
        value:{
        },
        digit:{
            type:Number,
            default:0
        },
        controlsPosition:{
            type:String,
            default:''
        },
        showControls:{
            type:Boolean,
            default:true
        },
        disable:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            isInputActive: false
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
                    return this.value == null || isNaN(this.value/1)? 0: this.value.toString()
                } else {
                    // User is not modifying now. Format display value for user interface
                    let value = isNaN(this.value/1)? 0 :(this.value/1).toFixed(this.digit).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
                    return value
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
    },
    methods:{
        decreaseNumber(){
            const value = this.displayValue
            this.displayValue = typeof(value) == 'number'? value : parseFloat(value.replace(/[^\d\.]/g, "")) - 1
            //raise event change
            this.$emit('change',this.displayValue)
        },
        increaseNumber(){
            const value = this.displayValue
            this.displayValue = typeof(value) == 'number'? value : parseFloat(value.replace(/[^\d\.]/g, "")) + 1
            //raise event change
            this.$emit('change',this.displayValue)
        },
        onchange(element){
            this.$emit('change',element.srcElement.value)
        }
    }
}
</script>

<style lang="less">
.el-input-number.is-controls-right{
    .el-input__inner{
        text-align: left;
    }
}
</style>
