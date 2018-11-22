<template>
    <bwc-layout menu-id="Category/create" title="Edit Category"
    :bread-crumb="breadCrumb" 
    back-to="/Category/list"
    back-to-label="Category list">
        <bwc-roller-blind-form-create :id="id" :data="data" v-if="data.CategoryCode.indexOf('ROLLERBLIND') !== -1"></bwc-roller-blind-form-create>
        <bwc-zip-screen-form-create :id="id" :data="data" v-else-if="data.CategoryCode.indexOf('ZIPSCREEN') !== -1"></bwc-zip-screen-form-create>
        <bwc-fly-screen-form-create :id="id" :data="data" v-else-if="data.CategoryCode.indexOf('FLYSCREEN') !== -1"></bwc-fly-screen-form-create>
        <bwc-security-fly-door-form-create :id="id" :data="data" 
        v-else-if="data.CategoryCode.indexOf('SECURITY') !== -1 || data.CategoryCode.indexOf('FLYDOOR') !== -1"></bwc-security-fly-door-form-create>
        <bwc-rs-form-create :id="id" :data="data" v-else-if="data.CategoryCode.indexOf('RS') !== -1"></bwc-rs-form-create>
        <bwc-category-form-create :id="id" :data="data" v-else></bwc-category-form-create>
    </bwc-layout>
</template>

<script>
import BwcCategoryFormCreate from "@/components/category/CategoryFormCreate.vue";
import BwcRollerBlindFormCreate from "@/components/category/CategoryFormCreate.RollerBlind.vue";
import BwcZipScreenFormCreate from "@/components/category/CategoryFormCreate.ZipScreen.vue";
import BwcFlyScreenFormCreate from "@/components/category/CategoryFormCreate.FlyScreen.vue";
import BwcSecurityFlyDoorFormCreate from "@/components/category/CategoryFormCreate.Security.FlyDoor.vue";
import BwcRsFormCreate from "@/components/category/CategoryFormCreate.RS.vue";

export default {
    name:"CategoryCreate",
    props:['id'],
    components:{
        BwcCategoryFormCreate,
        BwcRollerBlindFormCreate,
        BwcZipScreenFormCreate,
        BwcFlyScreenFormCreate,
        BwcSecurityFlyDoorFormCreate,
        BwcRsFormCreate
    },
    data(){
        return({
            breadCrumb:[{href:'/',name:'Home'},
                        {href:'/Category/list',name:'Category'},
                        {href:'',name:'update'}
                        ]
        })
    },
    computed:{
        data(){
            return this.$store.getters['category/info']
        }
    },
    created(){        
        this.$store.dispatch('category/pullInfo',this.id)
    },
}
</script>

