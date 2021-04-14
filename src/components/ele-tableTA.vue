<template>
    <div>
        <customTable>
            <template #caption>
                <caption>
                    <span v-if ="studentList">
                        {{filterData.length}} of {{studentList.length }}
                    </span>
                    <span style="float:right">

                        <button class="btn btn-light" @click="prevPage" :disabled="currentPage == 1" ><i class="fas fa-arrow-left"></i></button>
                        <button class="btn btn-light" @click="nextPage" :disabled="currentPage == prevPageStatus" ><i class="fas fa-arrow-right"></i></button>
                    </span>
                </caption>
            </template>
            <template #thead>
                  <tr>
                    <th @click ="sortBy = 'id',isReverse = !isReverse"  scope="col">
                        <span :class="{'title-green':sortBy =='id'}">

                        </span>

                    </th>
                    <th  scope="col">姓名</th>
                    <th @click ="sortBy = 'stuId',isReverse = !isReverse " scope="col">
                        <span :class="{'title-green':sortBy =='stuId'}">
                            學號
                            <i v-if="sortBy =='stuId' && isReverse== false" class="fas fa-sort-down"></i>
                            <i v-else-if="sortBy == 'stuId' && isReverse== true" class="fas fa-sort-up"></i>
                            <i v-else class="fas fa-sort"></i>
                        </span>
                    </th>
                    <th @click ="sortBy = 'totalPoint',isReverse = !isReverse, sorttotalPoint= !sorttotalPoint" scope="col">
                        <span :class="{'title-green':sortBy =='totalPoint'}">登記點數
                        <i v-if="sortBy =='totalPoint' && isReverse== false" class="fas fa-sort-down"></i>
                        <i v-else-if="sortBy == 'totalPoint' && isReverse== true" class="fas fa-sort-up"></i>
                        <i v-else class="fas fa-sort"></i>
                        </span> 
                        </th>
                    <th></th>
                </tr>
            </template>
            <template #tbody>
                <tr class="bg-shadow-hover rounded" :key="'THT'+index" v-for="(item,index) in filterData">
                    <th scope="row">{{}}</th>
                    <td   v-html="highlightMatches(item.cName)"></td>
                    <td  v-html="highlightMatches(item.stuId)"></td>
                    <td  v-html="highlightMatches(item.totalPoint)"></td>
                    <td> <router-link :to="{name:'TaStudentPage',query: { stuId: item.stuId }}">查看</router-link></td>
                </tr>
            </template>
        </customTable>
    </div>
</template>
<script>
import customTable from "./tmp-table"
export default {
    props:["filter","studentList"],
    components:{
        customTable
    },
    methods: {
        highlightMatches(text){
      const matchExists = text.toString().toLowerCase().includes(this.filter.toLowerCase());
      if (!matchExists) return text;

      const re = new RegExp(this.filter,'ig');
      return text.toString().replace(re,matchedText => `<strong class="text-success">${matchedText}</strong>`)
    },
    nextPage:function() {
      if((this.currentPage*this.pageSize) < this.studentList.length) this.currentPage++;
    },
    prevPage:function() {
      if(this.currentPage > 1) this.currentPage--;
    }
    },
    computed:{
        prevPageStatus(){
            let vm =this;
            if(vm.studentList){
                const totalPage =vm.studentList.length/vm.pageSize
                return Math.ceil(totalPage)
            }
            return 0
        },
        filterData(){
            let vm =this;
            const filterToLower = vm.filter.toString().toLowerCase();
            const studentList = vm.studentList;
           
            
            if(studentList){
                const arrayList =studentList.map((item)=>{
                   return Object(item)
                })
                const filterList=arrayList.filter((row) => {
                const cName = row.cName.toString().toLowerCase();
                const stuId = row.stuId.toString().toLowerCase();
                const totalPoint = row.totalPoint.toString().toLowerCase();

                return stuId.includes(filterToLower) || cName.includes(filterToLower) 
                || totalPoint.includes(filterToLower)

                })
                return filterList.sort(function(a, b) {
                        if (!vm.isReverse) {
                        return a[vm.sortBy] - b[vm.sortBy];
                        } else {
                        return b[vm.sortBy] - a[vm.sortBy];
                        }
                    })
                .filter((row, index) => {
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
            sortBy :'cName',
            isReverse:'false',
            sortId:true,
            sortstuId:false,
            sorttotalPoint:false,
            pageSize:10,
            currentPage:1,
           
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