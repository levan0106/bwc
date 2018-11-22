<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:"LayoutLogin",    
    created(){        
        this.$store.dispatch('setAuthenticate','false');
        // disable session warning 
        this.$store.dispatch('enableSessionWarning',false);
    },
}
</script>
