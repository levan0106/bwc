<template>
    <a @click="doLogout"> Logout</a>
</template>

<script>
export default {
    name:"Logout",
    methods:{
        doLogout(){
            localStorage.clear();
            this.$store.dispatch("clearCurrentUser")
            window.location.href = this.$store.getters.rootUrl + "/login";
        }
    }
}
</script>
