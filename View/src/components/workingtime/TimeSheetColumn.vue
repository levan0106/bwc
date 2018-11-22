<template>
    <div class="input-number">
        <input type="text" 
        v-model="data.Value"
        class="input__inner"
        :disabled="data.Approved"
        @change="onChange"/>
    </div>
</template>

<script>
export default {
    name:"TimeSheetColumn",
    props: ['data'],
	methods:{
		onChange(element){
            this.data.Value = Number(element.srcElement.value).toFixed(1)
			let item = this.data
			//item.Value = (Number(element.srcElement.value) * 1).toFixed(1).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
			this.$emit('change',item)
		},
	}
}
</script>
<style lang="less">
</style>
