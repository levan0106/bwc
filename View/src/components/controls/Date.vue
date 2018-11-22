<template>
<div>
    <span v-if="slotPassed">
    <i  class="el-icon-time"></i>
	<span style="margin-left: 10px"><slot/></span>
    </span>
    <span v-else>-</span>
</div>
</template>

<script>
export default {
name:"Date",
props:["value"],
computed: {
  slotPassed() {
    return !!this.$slots.default[0].text.length
  }
}
}
</script>

<style>

</style>
