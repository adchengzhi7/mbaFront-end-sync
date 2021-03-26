<template>
  <div > 
    <register-form :isTA="isTA" :userData="userData" ></register-form>
  </div>
</template>

<script>
  import registerForm from '../components/ele-registerForm'
export default {

  components:{
    registerForm
  },
  mounted() {

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
