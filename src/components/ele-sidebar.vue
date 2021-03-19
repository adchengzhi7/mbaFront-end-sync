<template >
       <div scroll="no" class=" bg-shadow" :class="{'closebar':!sidebarIsExpand,'sidebar':sidebarIsExpand}" 
       @mouseleave="sidebarIsExpand=false"
       @mouseenter="sidebarIsExpand=true">
         <div class="m-top text-left h-100 ">
           <div class="section-height">

           <div class="section" :key="item.id" v-for="item in section" :class="{'section-active':currentRouteName == item.router}" >
             <span class="p-4">
             <i :class="item.icon"></i>
             </span>
             <span v-show="sidebarIsExpand">{{item.title}}</span>
           </div>
           </div>

           <div class="logout">
             <div class="dropdown-divider divider"></div>
             <div >
               <div class="section"  >
             <span class="p-4">
              <i class="far fa-arrow-alt-circle-left"></i>
             </span>
             <span v-show="sidebarIsExpand">登出</span>
           </div>
             </div>
           </div>
         </div>
       </div>
</template>
<script>
    export default {
      props:['modelValue','section'],  
  computed:{
    sidebarIsExpand:{
      get(){
        return this.modelValue
      },
      set(val){
        this.$emit('update:modelValue',val)

      }
    },
    currentRouteName() {
        return this.$route.name;
    }
  },
      data() {
        return {
        }
      },
       
    }
</script>
<style scoped>
.divider{
  margin: 0 25px;
}
.logout{
    height: 15%;

}
.section-height{
  height: 80%;
}
.section{
  padding:15px 0;
  color:#c0c0c0;
  font-weight: 900;
}
.section:hover{
    color: #38b269;
    background-color: rgba(0,0,0,0.12);
}
.section-active{
    color: #38b269;
}
.m-top{
  margin-top: 90px;
}
.bg-shadow {
    box-shadow: 0 5px 10px rgba(154,160,185,0.05), 0 15px 40px rgba(166,173,201,0.2);
}
.closebar{
 width:65px;
  height: 100%;
  position: fixed;
}
.sidebar{
  width:25%;
  height: 100%;
  position: fixed;
  z-index: 2;
}

</style>