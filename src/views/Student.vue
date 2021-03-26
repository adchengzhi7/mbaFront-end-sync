<template>
  <div > 
   <page :section="section">
     <router-view></router-view>
   </page>
  </div>
</template>

<script>
import page from "../components/tmp-page"

export default {

  components:{
    page,
  },
  

data() {
    return {
      section:[{
        id:"S01",
        title:"學分查詢",
        icon:"fas fa-search",
        router:"StudentDash"
      },
      {
        id:"S02",
        title:"登錄點數",
        icon:"far fa-plus-square",
        router:"StudentReg"
      }],
      
    }
  },

}
</script>
<style>

</style>