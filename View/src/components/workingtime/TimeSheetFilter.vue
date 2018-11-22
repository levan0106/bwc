<template>
  <el-row style="display:flex">	
    <el-col :span="8"></el-col>	
    <el-col :span="8">
        <el-row :gutter="20" class="filter-panel">	
            <el-col :span="12" class="block">
                <span class="demonstration">Select Month</span>
                <el-date-picker
                v-model="filter.date"                
                type="month"
                placeholder="Pick a month">
                </el-date-picker>
            </el-col>
            <el-col :span="12" class="block button-panel">
                    <el-button type="primary" icon="el-icon-search" :disabled="isDisable" @click="doSearch">Search</el-button>
            </el-col>
        </el-row>
    </el-col>	
    <el-col :span="8"></el-col>	
		
	</el-row>
</template>

<script>
export default {
    name:"TimeSheetFiltering",
    data(){
        return({          	
			filter:{
				date:Date()
			}
        })
	},
	computed:{
		isDisable(){
			return this.filter.date == '' || this.filter.date == null? true:false
		}
	},
    methods:{
        doSearch(){
			this.$emit('doSearch',this.filter.date);
		}
    }
}
</script>
<style lang="less">
	
	.block {
        text-align: center;
        -ms-flex: 1;
        flex: 1;
	}
	
	.demonstration {
		display: block;
		color: #8492a6;
		font-size: 14px;
		margin-bottom: 20px;
	}
	.filter-panel{
        display: flex;
        padding: 20px !important;
        border: 1px solid #c0c4cc;
		.button-panel{
			    margin: auto auto 0;
		}
	}
</style>

