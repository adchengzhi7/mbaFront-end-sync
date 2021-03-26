
<template>
  <div > 
     <div class="partTop mt-5">
       <div class="row mb-3">
         <div class="col"></div>
         <div class="col-6">
            <input class="form-control" v-model="filter" placeholder="輸入查詢的姓名、學號" type="text"  >

         </div>
         <div class="col-4"></div>
         <div class="col"></div>
       </div>
       <div class="row ">
         <div class="col"></div>
         <div class="col-6">
            <tables :filter= "filter"></tables>
         </div>
         <div class="col-4">
           <div class="d-flex flex-wrap">
             <h5 class="font-weight-bold">待審核清單</h5>
             <div >
              <span class="danger float-left badge badge-pill badge-danger ">{{unReviewList.length}}</span>

              </div>
            </div>
           <div>
             <div :key="item.id" v-for="item in unReviewListLimited" class="bg-shadow-hover review-box  pointer" @click="routerTo('TaStudentPage')">
               <div class="d-flex flex-wrap">
                 <div class="col-1  ">
                  <div class="circle small p-1"></div>
                 </div>
                 <div class="col pl-0 d-flex flex-wrap">
                   <div>
                      <div class="h5 d-flex flex-wrap m-0">
                      <div class="font-weight-bold ">{{item.user.name}}</div>
                      <div class="text-muted ">  {{  item.user.stuId}}</div>
                    </div>
                    <p class='text-muted m-0'>{{item.type}}</p>
                    <div>
                      <small class="text-muted">
                    {{  dateShow(item.date)}}
                      </small>
                    </div>
                   </div>
                   <div class="ml-auto align-self-center">
                      <button class="btn btn-outline-secondary font-weight-bold">待審核</button>
                   </div>
                    
                 </div>

               </div>
              
             </div>
             <div class="text-center ">
               <div class="m-2">
                 <router-link to="review">查看更多</router-link>
               </div>
             </div>
           </div>
         </div>
         <div class="col"></div>
       </div>
     </div>
  </div>
</template>

<script>
import tables from "../components/ele-tableTA"

export default {

  components:{
    tables,
  },

  computed:{
    unReviewListLimited(){
      let vm = this;

      return vm.unReviewList.filter((row, index) => {
        let start = (vm.currentPage-1)*vm.pageSize;
        let end = vm.currentPage*vm.pageSize;
      if(index >= start && index < end) return true;
    })
    }
  },
  methods: {
     routerTo(path){
            let vm = this;
            vm.$router.push({name:path})
        },
     dateShow(date){
             const gotDate = new Date(date);
             const today  = new Date();
             const diffTimeStamp = today.getTime()- gotDate.getTime()
             const diffMin = Math.floor(diffTimeStamp / (1000*60)) ;
             const diffTime = Math.floor(diffTimeStamp / (1000*3600)) ;
             const diffDays = Math.floor(diffTimeStamp / (1000*3600*24)) ;
             const displayDate = gotDate.getUTCFullYear()+"年" + gotDate.getUTCMonth()+"月"+ gotDate.getUTCDate()+"日  "+gotDate.getUTCHours()+":"+gotDate.getUTCMinutes()
             if(diffMin < 60){return diffMin+ "分鐘前" }
             else if(diffTime < 24){ return diffTime + "小時前"}
             else if (diffDays < 5){return diffDays+"天前"}
             else{return displayDate}
         }
  },
data() {
    return {
      filter:"",
      currentPage:1,
      pageSize:10,
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
      unReviewList:[{
        id:"UR0",
        user:{
           name:"李正治",
          stuId:"105306030",
        },
        type:"國際交換或雙聯學位",
        date:"2021-02-22  22:30:00"

      },
      {
        id:"UR1",
        user:{
           name:"李正治",
          stuId:"105306030",
        },
        type:"國際交換或雙聯學位",
        date:"2021-02-22  22:30:00"

      }
      ],
      avatarImg:"http://placehold.it/64x64",
      
    }
  },

}
</script>
<style scoped>
.avatar-box{
  margin: auto 17px;
}
.partTop{
  padding:20px;
  text-align: left;
  color :var(--color)
}

.success{
  background-color: var(--green);
  }

.content-box{
  margin: auto 0;
}
.review-box{
  padding:15px;
}
.review-box:hover{
  background-color: var(--hoverBgColor);
}
.circle.small {
  background:var(--success);
	border-radius: 50%;
	width: 5px;
	height: 5px;

}


</style>>
