<template>
<div class="partTop">
   <!-- loading 畫面 -->
   <div v-if="isLoading" class="loading-overlay">
      <div class="spinner-border text-success" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <!-- 學年篩選 -->
    <div class="row m-0 mt-3 mb-2 mt-md-5 mb-md-4">
      <div class="col-12 col-xl-9 col-md-9 col-sm-10 col-xs-12 align-self-center">
        <div class="d-flex">
          <div class="text-start align-self-center">
            <h5 class="font-weight-boldest m-0">同學學號年份篩選</h5>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-0">
      <div class="col input-col">
        <select
          class="form-control"
          v-model="yearSelected"
          @blur="yearBlured = true"
          :class="{'is-invalid': isYearInvalid}"
        >
          <option value="none" disabled>選擇學年</option>
          <option :id="'year'+year" :key="'year'+year" v-for="year in getYear" :value="year">{{ year }} 學年</option>
        </select>
        <div class="text-start invalid-feedback">請選擇學年</div>

      </div>
    </div>

    <!-- 點數驗證狀態篩選 -->
    <div class="row m-0 mt-3 mb-2 mt-md-5 mb-md-4">
      <div class="col-12 col-xl-9 col-md-9 col-sm-10 col-xs-12 align-self-center">
        <div class="d-flex">
          <div class="text-start align-self-center">
            <h5 class="font-weight-boldest m-0">點數驗證狀態篩選</h5>
            <div v-if="isStatusInvalid" class="text-start invalid-feedback d-block">請選擇狀態</div>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-0">
      <div class="col input-col d-flex">
        <div class="form-check form-check-inline">
          <input type="checkbox" class="radio-hidden form-check-input" id="statusOptionAll" :checked="statusOption.includes('1') && statusOption.includes('2')" @change="handleStatusSelectAll" />
          <label class="form-check-label" :class="{'btn btn-primary': statusOption.includes('1') && statusOption.includes('2'), 'btn btn-outline-secondary': !statusOption.includes('1') || !statusOption.includes('2')}" for="statusOptionAll">全部</label>
        </div>
        <div class="form-check form-check-inline">
          <input type="checkbox" class="radio-hidden form-check-input" id="statusOptionApproved" value="2" v-model="statusOption" />
          <label class="form-check-label" :class="{'btn btn-primary': statusOption.includes('2'), 'btn btn-outline-secondary': !statusOption.includes('2')}" for="statusOptionApproved">已審核</label>
        </div>
        <div class="form-check form-check-inline">
          <input type="checkbox" class="radio-hidden form-check-input" id="statusOptionPending" value="1" v-model="statusOption" />
          <label class="form-check-label" :class="{'btn btn-primary': statusOption.includes('1'), 'btn btn-outline-secondary': !statusOption.includes('1')}" for="statusOptionPending">未審核</label>
        </div>
      </div>
    </div>

    <!-- 選擇要匯出的項目 -->
    <div class="row m-0 mt-3 mb-2 mt-md-5 mb-md-4">
      <div class="col-12 col-xl-9 col-md-9 col-sm-10 col-xs-12 align-self-center">
        <div class="d-flex">
          <div class="text-start align-self-center">
            <h5 class="font-weight-boldest m-0">選擇要匯出的項目</h5>
            <div v-if="isPointTypeInvalid" class="text-start invalid-feedback d-block">請選擇要匯出的項目</div>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-0">
      <div class="col input-col d-flex flex-wrap">
        <div class="form-check form-check-inline" v-for="option in exportOptions" :key="option.value">
          <input
            type="checkbox"
            :id="option.value"
            :value="option.value"
            v-model="selectedExportOptions"
            @change="handleSelectAll(option.value)"
            class="radio-hidden form-check-input checkbox-hidden"
          />
          <label class="btn" :class="{'btn-primary': selectedExportOptions.includes(option.value), 'btn-outline-secondary': !selectedExportOptions.includes(option.value)}" :for="option.value">{{ option.label }}</label>
        </div>
      </div>
    </div>

    <div class="row m-0 text-start">
      <div class="mt-3" >
        <button class="btn btn-success btn-lg" @click.prevent="submit">
          <i class="fas fa-search"></i>  匯出資料

        </button>
      </div>
    </div>
</div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["isTA"],
  data() {
    const date = new Date();
    const currentYear = date.getFullYear() - 1911; // 轉換成民國年
    return {
      yearSelected:  currentYear,
      yearBlured: false,
      statusOption: [],
      selectedExportOptions: [],
      formSubmitted: false,
      exportDataList:[],
      isLoading: false, // 加入 loading 狀態
      exportOptions: [
        { value: [1, 2, 3, 4, 5, 6, 7, 8], label: "全部" },
        { value: 1, label: "國際交換或雙聯學位" },
        { value: 2, label: "國內外企業實習" },
        { value: 3, label: "國內外研習課程" },
        { value: 4, label: "商業競賽" },
        { value: 5, label: "國際志工" },
        { value: 6, label: "企業專案研討" },
        { value: 7, label: "中英語檢定" },
        { value: 8, label: "獎學金服務時數" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      exportData:'userPoint/exportData',
    }),
    getYear() {
      const date = new Date();
      const year = date.getFullYear();
      const mingYear = year - 1911;
      const yearStart = mingYear - 25;
      const yearEnd = mingYear + 25;
      const yearList = [];
      for (let i = yearStart; i < yearEnd; i++) {
        yearList.push(i);
      }
      return yearList;
    },
    isYearInvalid() {
      return this.formSubmitted && (this.yearSelected === "" || this.yearSelected === "none");
    },
    isStatusInvalid() {
      return this.formSubmitted && this.statusOption.length === 0;
    },
    isPointTypeInvalid() {
      return this.formSubmitted && this.selectedExportOptions.length === 0;
    },
  },
  methods: {
    ...mapActions({ // 指定命名空間 'points'
      fetchExportData: 'userPoint/fetchExportData', // 將 fetchExportData action 映射到組件

    }),
  async submit() {
      let vm =this;
      this.formSubmitted = true;
      if (this.isYearInvalid || this.isStatusInvalid || this.isPointTypeInvalid) {
        return;
      }
      this.isLoading = true; // 開啟 loading

      const exportList = {
        yearSelected: this.yearSelected,
        pointType: this.selectedExportOptions.includes('all')
          ? this.exportOptions.slice(1).map(option => option.value)
          : this.selectedExportOptions,
        status: this.statusOption,
      };

      // 呼叫 Vuex 的 fetchExportData action
      try {
        await this.fetchExportData(exportList);
        vm.exportDataList = this.exportData;
      } catch (error) {
        console.error('Failed to fetch export data:', error);
      }finally {
        this.isLoading = false; // 關閉 loading
      }
    },
  handleStatusSelectAll() {
    // Toggle all options if "全部" is selected
    if (this.statusOption.length === 2) {
      this.statusOption = [];
    } else {
      this.statusOption = ["1", "2"];
    }
  },
  handleSelectAll(value) {
    if (value === "all") {
      if (this.selectedExportOptions.includes("all")) {
        // If "all" is already selected, deselect all
        this.selectedExportOptions = [];
      } else {
        // Select all options except "all" itself
        this.selectedExportOptions = this.exportOptions.slice(1).map(option => option.value);
        this.selectedExportOptions.push("all");
      }
    } else {
      const allIndex = this.selectedExportOptions.indexOf("all");
      if (allIndex !== -1) {
        this.selectedExportOptions.splice(allIndex, 1);
      }
    }
  },
  convertToCSV(data) {
      // 生成 CSV 標頭
      const headers = Object.keys(data[0]);
      const csvRows = [headers.join(',')];

      // 將每個資料行轉換為 CSV 格式
      data.forEach(row => {
        const values = headers.map(header => {
          const escaped = ('' + row[header]).replace(/"/g, '\\"'); // 避免雙引號衝突
          return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
      });

      return csvRows.join('\n');
    },
    downloadCSV(data) {
      // 將資料轉換為 CSV 格式
      const csvData = this.convertToCSV(data);

      // 創建 Blob 對象並設置下載鏈接
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'exportData.csv'); // 設置文件名稱
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
},
watch: {
  selectedExportOptions(newSelection) {
    if (!newSelection.includes("all") && newSelection.length === this.exportOptions.length - 1) {
      this.selectedExportOptions.push("all");
    } else if (newSelection.includes("all") && newSelection.length < this.exportOptions.length) {
      this.selectedExportOptions = newSelection.filter(option => option !== "all");
    }
  },
},
};
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
.btn-primary{
    border: 0px !important;
    box-shadow: 0px 8px 41px rgba(49,132,253, 0.25) !important;
    padding: 10px 60px !important;
    border-radius: 15px !important;
    font-weight: 700 !important;
}
.form-check {
    padding-left: 0px;
    margin: 10px 10px;
}
.radio-hidden {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
.btn-outline-secondary{
  padding: 10px 60px !important;
}

div{
  font-size:14px !important;
}
.form-control{
  font-size:14px !important;
}
h3{
  font-size: 18px !important;
}
.img-fluid {
    max-width: 80%;
    height: auto;
}
.input-col{
  margin-bottom:20px
}
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  background: transparent;
  background-image: url("../assets/icon/arrowDown.svg");
  background-repeat: no-repeat;
  background-position-x: 97%;
  background-position-y: 50%;
  border-radius: 2px;
  padding: 1rem;
  font-weight: 700;
    font-size: 18px;
}
::placeholder {
  font-weight: 700;
   color:var(--disableColor)
}
.select-default {
  font-weight: 700 !important;
   color:var(--disableColor) !important;
}
option:first-of-type {
   color:var(--disableColor)
}
.form-control.is-invalid, .was-validated .form-control:invalid {
    border: 1px solid rgba(245,81,52,0.5) !important; 
     box-shadow: 0 5px 10px rgba(245,81,52,0.05) ,
      0 15px 40px rgba(245,81,52,0.15)  !important;
    }
.form-control.is-valid, .was-validated .form-control:valid {
   border: 1px solid rgba(56, 178, 105,0.5) !important; 
     box-shadow: 0 5px 10px rgba(56, 178, 105,0.05) ,
      0 15px 40px rgba(56, 178, 105,0.15)  !important;

}
/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  div{
    font-size:14px !important;
  }
  .form-control{
    font-size:14px !important;
  }
  h3{
    font-size: 18px !important;
  }
  .img-fluid {
      max-width: 80%;
      height: auto;
  }
 }

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { 
  div{
    font-size:16px !important;
  }
  .form-control{
    font-size:18px !important;
  }
  h3{
    font-size: 28px !important;
  }
  .img-fluid {
      max-width: 100%;
      height: auto;
  }
}
 
/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  div{
    font-size:16px !important;
  }
  .form-control{
    font-size:18px !important;
  }
  h3{
    font-size: 28px !important;
  }
  .img-fluid {
      max-width: 100%;
      height: auto;
  }
 }

/* X-Large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  div{
    font-size:16px !important;
  }
  .form-control{
    font-size:18px !important;
  }
  h3{
    font-size: 28px !important;
  }
  .img-fluid {
      max-width: 100%;
      height: auto;
  }
}

</style>