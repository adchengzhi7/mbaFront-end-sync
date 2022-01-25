<template>
    <div>
        <customTable>
            <template #caption>
                <caption>
                    <span v-if="unreviewPoints">
                        {{filterData.length}} of {{unreviewPoints.length }}
                    </span>
                </caption>
            </template>
            <template #thead>
                <tr>
                    <th :key="th.key" v-for="th in thead" @click ="sortSelector(th.id,th.isSort)"  scope="col">
                        <span :class="{'title-green':sortBy == th.id}">
                            {{th.title}}
                            <i v-if="sortBy == th.id && isReverse== false" class="fas fa-sort-down"></i>
                            <i v-else-if="sortBy == th.id && isReverse== true" class="fas fa-sort-up"></i>
                            <span v-else-if="!th.isSort"></span>
                            <i v-else class="fas fa-sort"></i>
                        </span>

                    </th>
                </tr>
            </template>
            <template #tbody>
                <tr class="bg-shadow-hover rounded" :key="item.id" v-for="item in filterData">
                    <th class="align-middle" scope="row">{{item.id}}</th>
                    <td class="align-middle" v-html="highlightMatches(item.name)"></td>
                    <td class="align-middle" v-html="highlightMatches(item.stuId)"></td>
                    <td >
                        <div class="font-weight-bold" v-html="highlightMatches(item.section)"></div>
                        <div class="d-flex">

                            <div class="small text-muted" v-html="highlightMatches(item.sectionTitle)"></div>
                            <div class="small text-muted"  v-if ="item.englishCredit!= null" > -{{item.englishCredit}}分</div>
                        </div>
                    </td>
                    <td class="align-middle" v-html="highlightMatches(splitAndJoin(item.semester))"></td>
                    <td class="align-middle small text-muted"> {{dateShow(item.date)}}</td>
                    <td  class="align-middle"> <router-link :to="{name:'TaStudentPage',query: { stuId: item.stuId }}">查看</router-link></td>

                </tr>
                <template v-if="unreviewPoints">
                    <tr  v-if="unreviewPoints.length > pageSize" >
                        <td :colspan="thead.length+2" class="bg-shadow-hover pointer text-center" @click.prevent="loadMore">
                            <a class="btn" @click.prevent="loadMore">查看更多</a>
                        </td>
                    </tr>

                </template>
            </template>
        </customTable>
        
    </div>
</template>
<script>
import customTable from "./tmp-table";
import {mapGetters ,mapActions} from "vuex";

export default {
    props:["filter"],
    components:{
        customTable
    },
    mounted() {
        this.getUnreviewPoint()
    },
    methods: {
        ...mapActions({
            getUnreviewPoint:'userPoint/getUnreviewPoint'
        }),
        sortSelector(selected,isSort){
            let vm = this;
                if(isSort){
                    vm.sortBy = selected;
                    vm.isReverse = !vm.isReverse;
                }else{
                    vm.sortBy = "";
                }
        },
        highlightMatches(text){
            const matchExists = text.toString().toLowerCase().includes(this.filter.toLowerCase());
            if (!matchExists) return text;

            const re = new RegExp(this.filter,'ig');
            return text.toString().replace(re,matchedText => `<strong class="text-success">${matchedText}</strong>`)
        },
        loadMore:function() {
            // if((this.currentPage*this.pageSize) < this.nameList.length) this.currentPage++;
            this.pageSize = this.pageSize+  10
        },
    
        splitAndJoin(str){
           if(str != "00"){
                const year = str.slice(0,3)
                const smester = str.slice(3,4)
                return year + "/"+smester
            }
            return "-"
         },
         dateShow(date){
             let gotDate =new Date(date);
             gotDate.setHours(gotDate.getHours() - 8);
             let today = new Date()
             const diffTimeStamp = (today.getTime()- gotDate.getTime())+8
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
    computed:{
        ...mapGetters({
            unreviewPoints:'userPoint/unreviewPoints'
        }),
        prevPageStatus(){
            let vm =this;
            if(vm.unreviewPoints){
                const totalPage =vm.unreviewPoints.length/vm.pageSize
                return Math.ceil(totalPage)
            }
            return 0
            
        },
        filterData(){
            let vm =this;
            const filterToLower = vm.filter.toString().toLowerCase();
            const unreviewPoints = vm.unreviewPoints;
            
            if(unreviewPoints){
            const arrayList =unreviewPoints.map((item)=>{
                return Object(item)
            })
            const filterList=arrayList.filter(row => {
            const name = row.name.toString().toLowerCase();
            const stuId = row.stuId.toString().toLowerCase();
            const section = row.section.toString().toLowerCase();
            const sectionTitle = row.sectionTitle.toString().toLowerCase();
            const semester = row.semester.toString().toLowerCase();
            return stuId.includes(filterToLower) || name.includes(filterToLower) || sectionTitle.includes(filterToLower) || section.includes(filterToLower) || semester.includes(filterToLower)

            })
            return filterList.sort(function(a, b) {
                if (!vm.isReverse) {
                return a[vm.sortBy] - b[vm.sortBy];
                } else {
                return b[vm.sortBy] - a[vm.sortBy];
                }
                }).filter((row, index) => {
                let start = (this.currentPage-1)*this.pageSize;
                let end = this.currentPage*this.pageSize;
                if(index >= start && index < end) return true;
                });
            }
            return null
         }   

    },
    data() {
        return {
            sortBy :'semester',
            isReverse:'false',
            pageSize:10,
            currentPage:1,
            thead:
            [
            {key:'th01',id:"id",title:"#",isSort:true},
            {key:'th02',id:"name",title:"姓名",isSort:false},
            {key:'th03',id:"stuId",title:"學號",isSort:true},
            {key:'th04',id:"section",title:"項目",isSort:false},
            {key:'th05',id:"semester",title:"學期",isSort:true},
            ],
             nameList:[
                {id:"1",name:"李組長",stuId:"10540591",section:"國際交換或雙聯學位",sectionTitle:"SKEMA Business School",semester:"1091",date:"2021-03-24 17:10:00",point:"1",status:"1"},
                {id:"2",name:"吳組長",stuId:"10540592",section:"國際交換或雙聯學位",sectionTitle:"SKEMA Business School",semester:"1082",date:"2021-03-22 22:30:00",point:"3",status:"2"},
                {id:"3",name:"成組長",stuId:"10540593",section:"英語檢定",sectionTitle:"TOEFL PBT",semester:"1081",date:"2021-02-22 22:30:00",point:"0",status:"2"},
                {id:"4",name:"成組長",stuId:"10540593",section:"英語檢定",sectionTitle:"TOEFL PBT",semester:"1081",date:"2021-02-22 22:30:00",point:"0",status:"2"},

            ]
            

            
        }
    },
    
}
</script>
<style scoped>
.table td, .table th {
    border-top: 0px !important;
    border-bottom-width:0px !important;
    
}
.table {
    border-collapse: separate;
    border-spacing: 0px 0.5rem;
}
.table thead th {
    border-bottom: 0px;
    font-weight:900px;
    font-size: 14px;
    color:#c0c0c0;
}
table tbody tr:hover {
    background-color:var(--hoverBgColor);

}

a{
    color:var(--green);
    font-weight:900;
}


</style>