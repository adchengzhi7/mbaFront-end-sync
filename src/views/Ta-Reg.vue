<template>
  <div > 
     <div class="partTop">
       <div class="row">
         <div class="col"></div>
         <div class="col-9">
           <reg-selection :isTA="isTA"></reg-selection>
         </div>
         <div class="col"></div>
       </div>
     </div>
  </div>
</template>

<script>
import RegSelection from"../components/ele-Regselection"
export default {

  components:{
    RegSelection
  },
  computed:{
    
  },
  methods: {
    
  },
data() {
    return {
      isTA:true,
      selectedUser:'105306030',
      section:[{
        id:"S01",
        title:"學分查詢",
        icon:"fas fa-search",
        router:"Student"
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
<style scoped>


</style>>
