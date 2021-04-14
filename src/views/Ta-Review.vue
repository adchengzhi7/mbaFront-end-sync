
<template>
  <div > 
     <div class="partTop mt-0 mt-md-5">
       <div class="row m-0 mb-3">
         <div class="col d-none d-sm-block d-xl-block"></div>
         <div class="col-12 col-xl-9 col-md-9  col-sm-10 col-xs-12 ">
            <input class="form-control" v-model="filter" placeholder="輸入查詢的姓名、學號" type="text"  >
         </div>
         <div class="col d-none d-sm-block d-xl-block"></div>
       </div>
       <div class="row m-0 ">
         <div class="col d-none d-sm-block d-xl-block"></div>
         <div class="col-12 col-xl-9 col-md-9  col-sm-10 col-xs-12 ">
            <tables class="overflow-auto" :filter= "filter"></tables>
         </div>
        
         <div class="col d-none d-sm-block d-xl-block"></div>
       </div>
     </div>
  </div>
</template>

<script>
import tables from "../components/ele-tableTA-review"

export default {

  components:{
    tables,
  },

  computed:{
    unReviewListLimited(){
      let vm = this;

      return vm.unReviewList.filter((row, index) => {
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
      if(index >= start && index < end) return true;
    })
    }
  },
  methods: {
    
  },
data() {
    return {
      filter:"",
      currentPage:1,
      pageSize:5,
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
