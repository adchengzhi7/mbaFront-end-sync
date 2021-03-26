
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
        title:"快速查詢",
        icon:"fas fa-search",
        router:"TaDash"
      },
      {
        id:"S02",
        title:"待審核",
        icon:"fas fa-exclamation-triangle",
        router:"TaReview"
      },
       {
        id:"S03",
        title:"匯入名單",
        icon:"fas fa-file-import",
        router:"readCsv"
      }
      ],
      
    }
  },

}
</script>
