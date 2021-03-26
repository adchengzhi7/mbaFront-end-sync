<template>
    <div>
         <div class="d-flex mb-3">
            <div v-if="isTA">
              <h3 class="pointer hover" @click="$router.go(-1)">
                <i class="fas fa-arrow-left icon-clickable"></i>
              </h3>
            </div>
            <div :class="{'ml-4':isTA}">
                <h3 class="font-weight-boldest">  選擇登錄點數</h3>
            </div>
           </div>
  
           <div class="row">
             <div class="col-4 p-3 " :key="item.id" v-for="item in sectionType" @click="toRoute(item)">
               <div class="select-box bg-shadow-hover pointer ">
                  <img class="img-fluid" :src="require(`@/assets/icon/`+item.icon+`.svg`)" alt="">
                  <h6 class="font-weight-bold">{{item.title}}</h6>
               </div>
             </div>
           </div>
        
    </div>
</template>
<script>
export default {
    props:['isTA'],
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
                {id:"ST01",title:"國際交換或雙聯學位",icon:"global",type:"global"},
                {id:"ST02",title:"國內外企業實習",icon:"intern",type:"intern"},
                {id:"ST03",title:"國內外研習課程",icon:"confrence",type:"confrence"},
                {id:"ST04",title:"商業競賽",icon:"competition",type:"competition"},
                {id:"ST05",title:"國際志工",icon:"volunteer",type:"volunteer"},
                {id:"ST06",title:"企業專案研討",icon:"caseStudy",type:"caseStudy"},
                {id:"ST07",title:"英語檢定",icon:"english",type:"english"},
            ],
        }
    },
    
}
</script>
<style scoped>
.select-box{
  border-radius: 1.5rem !important;
  padding:30px 30px
}
.select-box:hover{
    background-color:var(--hoverBgColor);

}

</style>