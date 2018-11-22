<template>
<span class="input-action">
    <input type="text" 
    v-model="displayValue"
    class="el-input__inner"
    @blur="onBlur" 
    @focus="onFocus"
    @change="onChange"
    @keyup.enter="saveData"
    :disabled="disabled"
    />
    <!-- <el-button >{{buttonLabel}}</el-button> -->
    <span  v-if="showButton && (isInputActive || done)" class="action-btn" :class="done?'action-done':''" @click="saveData">
        <i v-if="loading" class="el-icon-loading"></i>
        <i v-else-if="done" class="el-icon-check"></i>
        <span v-else>{{buttonLabel}}</span>
    </span>
</span>
</template>

<script>
export default {
    name:"InputAction",
    props:{
        id:{

        },
        value:{
            type:String|Number
        },
        buttonLabel:{
            type:String,
            default:'Enter'
        },
        type:{
            type:String
        },
        showButton:{
            type:Boolean,
            default:true
        },
        disabled:{

        }
    },
    data(){
        return({
            //value:this.model,
            isInputActive:false,
            loading:false,
            done:false,
            digit:0
        })
    },
    computed:{
        displayValue: {
            get: function() {
                if (this.isInputActive) {
                    //console.log(this.value)
                    // Cursor is inside the input field. unformat display value for user
                    return this.value == null || isNaN(this.value/1)? 0: this.value.toString()
                } else {
                    this.digit = this.type == 'currency'?2:0
                    // User is not modifying now. Format display value for user interface
                    let value = isNaN(this.value/1)? 0 :(this.value/1).toFixed(this.digit).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
                    return this.type == 'currency' ? '$' + value : value
                }
            },
            set: function(modifiedValue) {
                // Recalculate value after ignoring "$" and "," in user input
                let newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ""))
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
        saveData(){
            this.isInputActive = true
            if(!this.done){
                this.loading=true
                this.$emit('save-data',this.id, this.value)
                setTimeout(()=>{
                    this.loading=false
                    this.done=true
                },200)
                setTimeout(()=>{
                    //this.isInputActive=false
                    this.done=false
                },500)
            }
        },
        onBlur(){
            setTimeout(()=>{ 
                this.isInputActive = false
                this.done = false
            },50)
        },
        onFocus(){
            this.isInputActive = true
            this.done=false
        },
        onChange(){
            this.$emit('change',this.id, this.value)
        }
    }
}
</script>

<style lang="less">
    .input-action{
        display:flex;
        position: relative;
        .action-btn{
            min-width: 29px;
            line-height: 40px;
            background: #3a8ee6;
            border-radius: 0 5px 5px 0;
            padding: 0 3px;
            color: #ffffff;
            cursor: pointer;
            position: absolute;
            right: 0;
            font-size: 12px;
            text-align: center;
            &:hover{
                background: #66b1ff
            }
        }
        .action-done{
            background: #67c23a;
            pointer-events: none;
        }
    }
</style>
