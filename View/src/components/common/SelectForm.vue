<template>
    <div >
        <el-form>
            <el-form-item :label="label" :label-width="labelWidth">
                <el-select v-model="model"
                filterable remote reserve-keyword
                :loading="loading"
                :remote-method="getData"
                @change="onChange"
                @blur="onBlur"
                :class="textBoxClass"
                v-focus
                placeholder="Enter a value">
                    <el-option
                    v-for="item in data"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>                
    </div>
</template>

<script>
export default {
    name:"SelectForm",
    props:['data','label','labelWidth',"textBoxClass"],
    data(){
        return({
            loading:false,
            //formLabelWidth: '150px',
            model:''
        })
    },
    methods:{
        getData(query) {
                    this.loading = true;
                     this.$emit('get-data',query);

                    setTimeout(() => {
                        this.loading = false;                        
                    }, 200);
            },
        onChange(val){
            this.$emit('change',val);
        },
        onBlur(val){
            this.$emit('blur',val);
        }
    }
}
</script>

<style lang="less">

</style>
