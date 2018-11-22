<template>
    <tr v-if="index==1" class="first"> 
        <slot></slot>
    </tr>
    <tr v-else> 
        <slot></slot>
    </tr>
</template>

<script>
export default {
    name:"TableRow",
    props: ['index']
}
</script>

