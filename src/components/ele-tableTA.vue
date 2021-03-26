<template>
    <div>
        <customTable>
            <template #caption>
                <caption>
                    <span>
                        {{filterData.length}} of {{nameList.length }}
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
                            #
                            <i v-if="sortBy =='id' && isReverse== false" class="fas fa-sort-down"></i>
                            <i v-else-if="sortBy == 'id' && isReverse== true" class="fas fa-sort-up"></i>
                            <i v-else class="fas fa-sort"></i>
                        </span>

                    </th>
                    <th  scope="col">姓名</th>
                    <th @click ="sortBy = 'last',isReverse = !isReverse " scope="col">
                        <span :class="{'title-green':sortBy =='last'}">
                            學號
                            <i v-if="sortBy =='last' && isReverse== false" class="fas fa-sort-down"></i>
                            <i v-else-if="sortBy == 'last' && isReverse== true" class="fas fa-sort-up"></i>
                            <i v-else class="fas fa-sort"></i>
                        </span>
                    </th>
                    <th @click ="sortBy = 'handle',isReverse = !isReverse, sortHandle= !sortHandle" scope="col">
                        <span :class="{'title-green':sortBy =='handle'}">登記點數
                        <i v-if="sortBy =='handle' && isReverse== false" class="fas fa-sort-down"></i>
                        <i v-else-if="sortBy == 'handle' && isReverse== true" class="fas fa-sort-up"></i>
                        <i v-else class="fas fa-sort"></i>
                        </span> 
                        </th>
                    <th></th>
                </tr>
            </template>
            <template #tbody>
                <tr class="bg-shadow-hover rounded" :key="item.id" v-for="item in filterData">
                    <th scope="row">{{item.id}}</th>
                    <td   v-html="highlightMatches(item.first)"></td>
                    <td  v-html="highlightMatches(item.last)"></td>
                    <td  v-html="highlightMatches(item.handle)"></td>
                    <td> <router-link :to="{name:'TaStudentPage'}">查看</router-link></td>
                </tr>
            </template>
        </customTable>
    </div>
</template>
<script>
import customTable from "./tmp-table"
export default {
    props:["filter"],
    components:{
        customTable
    },
    methods: {
        highlightMatches(text){
      const matchExists = text.toLowerCase().includes(this.filter.toLowerCase());
      if (!matchExists) return text;

      const re = new RegExp(this.filter,'ig');
      return text.replace(re,matchedText => `<strong class="text-success">${matchedText}</strong>`)
    },
    nextPage:function() {
      if((this.currentPage*this.pageSize) < this.nameList.length) this.currentPage++;
    },
    prevPage:function() {
      if(this.currentPage > 1) this.currentPage--;
    }
    },
    computed:{
        prevPageStatus(){
            let vm =this;
            const totalPage =vm.nameList.length/vm.pageSize
            return Math.ceil(totalPage)
        },
        filterData(){
            let vm =this;
            const filterToLower = vm.filter.toString().toLowerCase();
            const filterList=vm.nameList.filter(row => {
                const first = row.first.toString().toLowerCase();
                const last = row.last.toString().toLowerCase();
                const handle = row.handle.toString().toLowerCase();

                return last.includes(filterToLower) || first.includes(filterToLower) || handle.includes(filterToLower)

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

    },
    data() {
        return {
            sortBy :'first',
            isReverse:'false',
            sortId:true,
            sortLast:false,
            sortHandle:false,
            pageSize:10,
            currentPage:1,
            nameList:[
                {
                    id:"1",
                    first:"李政治",
                    last:"10540592",
                    handle:"5"
                },
                {
                    id:"2",
                    first:"黃昏後",
                    last:"106301042",
                    handle:"4"
                },
                {
                    id:"3",
                    first:"Aarry",
                    last:"107932087",
                    handle:"1"
                },
                {
                    id:"4",
                    first:"ok",
                    last:"112932098",
                    handle:"2"
                },
                {
                    id:"5",
                    first:"Aarry",
                    last:"119932098",
                    handle:"4"
                },{
                    id:"6",
                    first:"Aarry",
                    last:"119932098",
                    handle:"4"
                },{
                    id:"7",
                    first:"Aarry",
                    last:"119932098",
                    handle:"4"
                }
            ]
        }
    },
    
}
</script>
<style scoped>
.table td, .table th {
    border-top: 0px !important;
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