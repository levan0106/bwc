<template>
    <td :class="data.Column == 1?'first':''">
		
		<i v-if="rowEnd" class="el-icon-close row-end" @click="removeRow"></i>
		<i v-if="columnEnd" class="el-icon-close column-end" @click="removeColumn"></i>

		<!-- <el-input disabled v-if="readOnly" 
		v-model="data.Value" 
        size="small" 
		popper-class="input"></el-input> -->
		<span v-if="readOnly">{{data.Value}}</span>
		
		<textarea v-else
  		rows="1"
		v-model="data.Value" 
		size="small" 
		class="input"
		:price-column="data.Column"
		:price-row="data.Row"
		@change="onChange"
		@paste="onpaste"
		@keyup.up="keyUp"
		@keyup.down="keyDown"
		@keyup.left="keyLeft"
		@keyup.right="keyRight"/>
	</td>
</template>

<script>
export default {
    name:"TableColumn",
    props: ['data','readOnly','rowEnd','columnEnd'],
	methods:{
		onpaste(val){			
			setTimeout(_=>{
				this.$emit('on-paste',val.srcElement.value, this.data.Row, this.data.Column)
			}, 10);
		},
		onChange(val){
			//console.log(val.srcElement.value)
			let item = this.data
			item.Value = val.srcElement.value
			this.$emit('on-change',item)
		},
		removeColumn(){
			this.$emit('remove-column')
		},
		removeRow(){
			this.$emit('remove-row')
		},
		keyUp(e){
			let field = {
				Row: this.data.Row - 1,
				Column: this.data.Column
			}
			this.$emit('move-cursor',field)
		},
		keyDown(e){
			let field = {
				Row: this.data.Row + 1,
				Column: this.data.Column
			}
			this.$emit('move-cursor',field)
		},
		keyLeft(e){
			let position = e.target.selectionStart
			let moveKey = this.data.Row > 0 && position == 0
			if(moveKey){
				let field = {
					Row: this.data.Row,
					Column: this.data.Column - 1
				}
				this.$emit('move-cursor',field)
			}
		},
		keyRight(e){
			let length = e.srcElement.value.length
			let position = e.target.selectionStart
			let moveKey = position >= length
			if(moveKey){
				let field = {
					Row: this.data.Row,
					Column: this.data.Column + 1
				}
				this.$emit('move-cursor',field)
			}
		}
	}
}
</script>
<style lang="less">
	textarea.input{
		-webkit-appearance: none;
		background-color: #fff;
		background-image: none;
		/* border-radius: 4px; */
		border: none;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		color: #606266;
		display: inline-block;
		font-size: inherit;
		/* line-height: 35px; */
		outline: 0;
		/* padding: 0 5px; */
		-webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
		transition: border-color .2s cubic-bezier(.645,.045,.355,1);
		width: 100%;
		min-width: 70px;
		text-align: center;
		resize: none;
		
		&[price-row='1']
		,&[price-column='1']{
			font-weight: 700;
		}
	}
</style>
