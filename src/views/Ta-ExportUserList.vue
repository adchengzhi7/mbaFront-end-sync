<template>
  <div > 
     <div class="row">
       <div class="col"></div>
       <div class="col-10">
         <export-form :isTA="isTA" ></export-form>
         <div class="cusTable2">
           <customTable>   </customTable>
         </div>

       </div>
       <div class="col"></div>
     </div>
  </div>
</template>

<script>
import exportForm from "../components/ele-exportForm"
import customTable from "../components/ele-tableTAExport"

export default {
  
  components: {
    exportForm,customTable
  },
  computed: {
  },
  methods: {
    
  },
data() {
    return {
      isTA: true,  
    }
  },

}
</script>
<style scoped>
.cusTable2{
  margin-top:20px;
}


</style>>
