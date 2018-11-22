<template>
<bwc-timer-warning> 
    <div :id="id">
        <slot/>
    </div>
</bwc-timer-warning> 
</template>

<script>

import BwcTimerWarning from '@/components/timer/Warning.vue'

export default {
    name:"Layout",
    components:{        
        BwcTimerWarning
    },
    props:{
        menuId:{
            type:String
        },
        id:{
            type:String
        },
        title:{
            type:String
        },
        breadCrumb:{
            type:Array
        },
        backTo:{
            type:String
        },
        backToLabel:{
            type:String
        }
    },
    beforeMount(){
        this.$store.dispatch('setActiveMenu',this.menuId);
        // enable session warning 
        this.$store.dispatch('enableSessionWarning',true);
    },
    mounted(){
        this.$store.dispatch('setTitle',this.title);
        this.$store.dispatch('setBreadCrumb',this.breadCrumb);
        if(this.backTo == null){
            this.$store.dispatch('clearBackTo');
        }else{
            this.$store.dispatch('setBackTo',{to:this.backTo,label:this.backToLabel});
        }
        
    }
}
</script>

