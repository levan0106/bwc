<template>
    <span v-if="show && !(!slotPassed && excludeNullValue)" :style="'border-bottom: 3px solid ' + color"><slot/></span>
    <span v-else>
        <slot/>
    </span>
</template>

<script>
export default {
    name:"Color",
    props:{
      show:{
          type:Boolean,
          default:false
      },
      color:{
          type:String,
          default:'red'
      },
      excludeNullValue:{
          type:Boolean,
          default:true
      } 
    },
    computed: {
        slotPassed() {
            //console.log(this.$slots.default[0].text.replace(/^\s+|\s+$/g,''))
            let text = this.$slots.default[0].text.replace(/^\s+|\s+$/g,'')
            return !!text.length && text != '—'
        }   
    }
}
</script>

<style>

</style>
