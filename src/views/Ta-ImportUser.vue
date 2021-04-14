<template>
  <div > 
     <read-csv ></read-csv>
     <div></div>
     <div class="row">
       <div class="col"></div>
       <div class="col-8">
        
        <customTable :filter="filter" >   </customTable>
       </div>
       <div class="col"></div>
     </div>
  </div>
</template>

<script>
import readCsv from "../components/ele-readCsv"
import customTable from "../components/ele-tableTAImport"

export default {

  components:{
    readCsv,customTable
  },
  computed: {
  },
  methods: {
    
  },
data() {
    return {
      filter:"",
       
    }
  },

}
</script>
<style scoped>



</style>>
