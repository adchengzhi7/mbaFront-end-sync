
<template>
  <div > 
   <page :section="section">
      <router-view></router-view>
   </page> 
  </div>
</template>

<script>
import page from "../components/tmp-page"
import {mapGetters} from 'vuex'

export default {

  components:{
    page,
  },
  computed:{
    ...mapGetters({
      token:'auth/token',
   })
  },

  
  data() {
      return {
        isLoading: false, // 加入 loading 狀態
        section:[{
          id:"S01",
          title:"快速查詢",
          icon:"fas fa-search",
          router:"TaDash"
        },
        {
          id:"S02",
          title:"待審核",
          icon:"fas fa-exclamation-triangle",
          router:"TaReview"
        },
        {
          id:"S03",
          title:"匯入名單",
          icon:"fas fa-file-import",
          router:"readCsv"
        },
        {
          id:"S04",
          title:"匯出名單",
          icon:"fas fa-file-export",
          router:"exportCsv"
        },
        {
          id:"S05",
          title:"操作LOG",
          icon:"fas fa-clipboard-list",
          router:"userLog"
        }
        ],
        
      }
  },
  watch: {
    token(newValue) {
      this.isLoading = true; // 開啟 loading
      if (newValue === null) {
      this.isLoading = false; // 開啟 loading
        this.$router.push('/');
      }
    }
  },

}
</script>
<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>
