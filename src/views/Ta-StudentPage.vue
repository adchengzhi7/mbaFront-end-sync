<template>
  <div > 
     <student-page :userData="userData" :isTA="isTA"></student-page>
  </div>
</template>

<script>
import studentPage from "../components/tmp-studentPage"
export default {

  components:{
    studentPage,
  },
  
  methods: {
    
  },
data() {
    return {
      isTA:true,
      userData:{
        name:"李正治",
        stuId:"105306030",
        points:[
          {
            type:"",
            point:"1"
          },{
            type:"",
            point:"1"
          },
        ]
      },
      
   
      
    }
  },

}
</script>
<style scoped>



</style>>
