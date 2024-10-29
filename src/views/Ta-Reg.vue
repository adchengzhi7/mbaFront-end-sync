<template>
  <div > 
     <div class="partTop">
       <div class="row">
         <div class="col"></div>
         <div class="col-9">
           <reg-selection :isTA="isTA"  :isSub="isSub"></reg-selection>
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

     isSub() {
      let vm = this;
      // 確認 studentData 存在並檢查 type 是否為 -1
      if (vm.$store.state.student.studentData && vm.$store.state.student.studentData.type === -1) {
        return true;
      } else {
        return false;
      }
    }
     
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
