<template>
    <div id="error-page">
        <h1>ERROR</h1>
        <p>Oops, Error {{id}} please call administrator to get support.</p>
        <router-link :to="{name:'home'}">
            Go to Bwc system
        </router-link>
    </div>
</template>

<script>
export default {
    name:"PageError",
    props:['id']
}
</script>

<style lang="less">
    #error-page{
        text-align: center;
        padding: 50px;
        h1,h2,h3{            
            font-size: 60px;
        }
    }
</style>
