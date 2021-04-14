<template>
  <div > 
     <div class="partTop">
       <div class="row m-0">
         <div class="col"></div>
         <div class="col-9">
           <reg-selection :isTA="isTA" ></reg-selection>
         </div>
         <div class="col"></div>
       </div>
     </div>
  </div>
</template>

<script>
import RegSelection from"../components/ele-Regselection"
import {mapGetters} from 'vuex'

export default {

  components:{
    RegSelection
  },
  computed:{
    ...mapGetters({
      userId:'auth/userId',
    }),
    
  },
  methods: {
    
  },
data() {
    return {
      isTA:false,
     
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
