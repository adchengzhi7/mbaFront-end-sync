<template>
    <div>
         <div class="d-flex mb-3">
           <div class="col-12 text-start">
              <div v-if="isTA">
                <h3 class="pointer hover" @click="$router.go(-1)">
                  <i class="fas fa-arrow-left icon-clickable"></i>
                </h3>
              </div>
              <div :class="{'ml-4':isTA}">
                  <h3 class="font-weight-boldest">  選擇登錄點數</h3>
              </div>
           </div>

           </div>
  
           <div class="row m-0">
             <div class="col-12 col-sm-6 p-1 col-md-4 p-md-3 " :key="item.id" v-for="item in sectionType" @click="toRoute(item)">
               <div class="select-box bg-shadow-hover pointer ">
                  <img class="img-fluid" :src="require(`@/assets/icon/`+item.icon+`.svg`)" alt="">
                  <h6 class="font-weight-bold">{{item.title}}</h6>
               </div>
             </div>
           </div>
        
    </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
    props:['isTA'],
    mounted() {
      let vm =this;
      if(!vm.currentRegPointUser && vm.isTA){
        vm.$router.push({ name: 'TaDash' })
      }
      if(!vm.currentRegPointUser && !vm.isTA){
        vm.$router.push({ name: 'StudentDash' })
      }
    },
    computed:{
 ...mapGetters({
      currentRegPointUser:'currentRegPointUser'
    }),
    },
    methods: {
      toRoute(item){
        let vm = this;
        if(!vm.isTA){
          vm.$router.push({ name: 'StudentRegForm', params: { type: item.type, title:item.title,icon:item.icon} })
        }else{
          vm.$router.push({ name: 'TaRegForm', params: { type: item.type, title:item.title,icon:item.icon} })
        }
      }
    },
    data() {
        return {
             sectionType:[
                {id:"ST01",title:"國際交換或雙聯學位",icon:"global",type:"1"},
                {id:"ST02",title:"國內外企業實習",icon:"intern",type:"2"},
                {id:"ST03",title:"國內外研習課程",icon:"confrence",type:"3"},
                {id:"ST04",title:"商業競賽",icon:"competition",type:"4"},
                {id:"ST05",title:"國際志工",icon:"volunteer",type:"5"},
                {id:"ST06",title:"企業專案研討",icon:"caseStudy",type:"6"},
                {id:"ST07",title:"英語檢定",icon:"english",type:"7"},
            ],
        }
    },
    
}
</script>
<style scoped>
.select-box{
  border-radius: 1.5rem !important;
  padding:15px
}
.select-box:hover{
    background-color:var(--hoverBgColor);

}
.img-fluid{
   max-width: 50%;
 }
/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
 .img-fluid{
   max-width: 50%;
 }
  
 }

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { 
   .select-box{
  border-radius: 1.5rem !important;
  padding:30px
}
.img-fluid{
   max-width: 100%;
 }
}
 
/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .select-box{
  border-radius: 1.5rem !important;
  padding:30px
}
 }

/* X-Large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
   .select-box{
  border-radius: 1.5rem !important;
  padding:30px
}
}

</style>