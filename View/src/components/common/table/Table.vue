<template>
<div id="table">
	<div :class="readOnly?'auto-height':''">
		<bwc-loading :loading="loading" :position-icon="positionIcon">
		<table class="el-table">
			<tbody>
				<bwc-row v-for="row in rows" :index="row" :key="row">
					<bwc-column v-for="column in columns" 
					:key="column+row+'_key'"
					:data="getItem(row,column)"
					:read-only="readOnly || (column == 1 && row == 1)"
					:row-end="rows == row && column == 1 && row > 5 && !readOnly"
					:column-end="columns == column && row == 1 && column > 5 && !readOnly"
					@on-change="onChange"
					@on-paste="onPaste"
					@remove-row="removeRow"
					@remove-column="removeColumn"
					@move-cursor="moveCursor" >
					</bwc-column>
				</bwc-row>
			</tbody>
		</table>
		</bwc-loading>
	</div>
	<el-row v-if="!readOnly">
		<el-button type="default" icon="el-icon-plus" @click="addRow"> row</el-button>
		<el-button type="default" icon="el-icon-plus" @click="addColumn"> column</el-button>
	</el-row>
</div>
</template>

<script>
import BwcColumn from '@/components/common/table/TableColumn.vue'
import BwcRow from '@/components/common/table/TableRow.vue'

export default {
	name:'Table',
	components:{
		BwcColumn,
		BwcRow
	},
	props:['data','totalRow','totalColumn','description','readOnly','loading','positionIcon'],
	data(){
		return({
			items:[],
			rows:this.totalRow ,
			columns:this.totalColumn
		})
	},
	watch:{
		data(values){
			this.generateData()
		},
	},
	methods:{
		moveCursor(item){
			let input = document.querySelectorAll("[price-column='"+item.Column+"'][price-row='"+item.Row+"']")[0]
			if(input != undefined){
				input.focus()
				input.select()
			}
		},
		onPaste(data,row, column){
			//alert(data)
			let self = this
			let startRow = row
			let startColumn = column
			let rows = data.trim().split("\n");
			//debugger
			for(var y in rows) {
				let cells = rows[y].split("\t");
				for(var x in cells) {					
					let objIndex = self.items.findIndex((obj => obj.Row == startRow && obj.Column == startColumn));
					//console.log(objIndex)
					if(objIndex != null && objIndex >= 0){						
						self.items[objIndex].Value = cells[x]
					}
					startColumn++
				}
				//encre row
				startRow++
				//resest columnn
				startColumn = column
			}

		},
		onChange(data){
			this.$emit('on-change',this.items)
		},
		generateData(){

			var self = this;
			self.items=[{
						Row : 1,
						Column:1,
						Value :this.description,
						Index:0
					}]
			//console.log("rows: " + this.rows)
			this.rows = this.totalRow
			//console.log("row: " + this.totalRow)
			for (let index = 1; index < this.rows; index++) {
				
				var items=self.items.filter(i => i.Row == index).map(function(item,idx){
					var itemValue = self.data.filter(function(i){
										return i.Row == index + 1 && i.Column == item.Column
									});
					
					var	newItem={
							Row : index + 1,
							Column:item.Column,
							Value :itemValue.length > 0? itemValue[0].Value:'',
							Index:idx,
						};
					return newItem;
				});
				
				//update value for new items
				var newData= self.items.concat(items);	
				//update list items
				self.items = newData;
			}
			
			//console.log("columns: " + this.columns)
			this.columns = this.totalColumn
			//console.log("column: " + this.totalColumn)
			for (let index = 1; index < this.columns; index++) {
				
				var items=self.items.filter(i => i.Column == index).map(function(item,idx){
			
					var itemValue = self.data.filter(function(i){
										return i.Column == index + 1 && i.Row == item.Row
									});
					
					var	newItem={
							Row : item.Row,
							Column:index + 1,
							Value :itemValue.length > 0? itemValue[0].Value:'',
							Index:idx,
						};
					return newItem;
				});
				//update value for new items
				var newData= self.items.concat(items);	
				//update list items
				self.items = newData;
			}	
		},		
		getItem(row,column){
			var item =  this.items.filter(function(item){
				return item.Row == row && item.Column == column;
			});
			if(item[0] == undefined)
			{
				//console.log(row +"-"+column + "-"+this.rows);
				return {Row:row,Column:column,Value:''}
			}
			return item[0];
		},
		addRow(callBackfunc){
			
			var self=this;
			// inscrease row
			self.rows ++;
			// coppy list items
			var items=self.items.filter(i => i.Row === self.rows - 1).map(function(item,index){
			
				var newItem={
						Row : self.rows,
						Column:item.Column,
						Value :'',
						Index:index,
					};
				return newItem;
			});
			//update value for new items
			var newData= self.items.concat(items);	
			//update list items
			self.items = newData;
			
			//raise event change to parent
			this.onChange(self.items)

			if(typeof callBackfunc == "function")
				callBackfunc();
		},
		removeRow(){
			var self=this;
			// descrease row
			self.rows --;
			var items=self.items.filter(function(item){
				return item.Row <=self.rows
			})
			self.items  = items
			//raise event change to parent
			this.onChange(self.items)
		},
		removeColumn(){
			var self=this;
			// descrease column
			self.columns --;
			var items=self.items.filter(function(item){
				return item.Column <= self.columns
			})
			self.items  = items
			//raise event change to parent
			this.onChange(self.items)
		},
		addColumn(callBackfunc){			
			var self=this;
			// inscrease column
			self.columns ++;
			
			// coppy list items
			var items=self.items.filter(i => i.Column === self.columns - 1).map(function(item,index){
			
				var newItem={
						Row : item.Row,
						Column:self.columns,
						Value :'',
						Index:index,
					};
				return newItem;
			});
			
			// merge new items into list
			var newData= self.items.concat(items);	
			//update list items
			self.items = newData;
			//raise event change to parent
			this.onChange(self.items)
			
			if(typeof callBackfunc == "function")
				callBackfunc();
		},
	}
}
</script>

<style lang="less">
#table{
	>div{
		overflow: auto;
		max-height: 400px;
		&.auto-height{
			//max-height: 100%;
		}
	}
	.el-input__inner {
		min-width: 70px;
		max-width: 150px;
		&:disabled{
			color: #4368b3;
		}
	}
	.first input.el-input__inner {
		border-color: #272727;
    	font-weight: bold;
	}
	.el-table td, .el-table th.is-leaf {
		border-bottom: none;
		//padding: 5px 0;
		padding: 5px;
		min-width: 50px;
		border: 1px solid #d5d6d8;
	}
	td{
		position: relative;
	}
	i.el-icon-close {
		position: absolute;
		left: 0px;
		z-index: 100034;
		color: red;
		font-weight: bold;
		cursor: pointer;
	}
}
</style>
