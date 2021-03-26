<template>
    <div>
        <navbar></navbar>
        <sidebar v-model="isExpand" :section="section"></sidebar>
        <div class=" box-inside">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import navbar from "../components/ele-navbar"
import sidebar from "../components/ele-sidebar"
export default {
    props:['section'],
    data() {
        return {
            isExpand:false
            
        }
    },
    components:{
        navbar,
        sidebar
    }
}
</script>
<style>
.box-inside{
    padding-left: 65px;
    padding-top:90px;
}
</style>