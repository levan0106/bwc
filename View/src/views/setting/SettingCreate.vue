<template>
    <bwc-layout menu-id="setting" title="Edit setting"
    :bread-crumb="breadCrumb" 
    back-to-label="setting list">        
        <bwc-setting-form-create :id="id" :data="data"></bwc-setting-form-create>
    </bwc-layout>
</template>

<script>
import BwcSettingFormCreate from "@/components/setting/SettingFormCreate.vue";

export default {
    name:"SettingCreate",
    components:{
        BwcSettingFormCreate
    },
    data(){
        return({
            breadCrumb:[{href:'/',name:'Home'},
                        {href:'',name:'setting'}
                        ]
        })
    },
    computed:{
        data(){
            return this.$store.getters['setting/info']
        }
    },
    created(){        
        this.$store.dispatch('setting/pullInfo')
    },
}
</script>

