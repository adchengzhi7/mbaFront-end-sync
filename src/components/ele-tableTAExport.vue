<template>
    <div v-if="sortData.data.length > 0">
      
        <button  @click="exportTableData" class="btn btn-success m-3"><i class="fas fa-save"></i> 匯出 CSV</button>
        <customTable clsss="responsive-table">
            <template #thead>
                <tr>
                    <th></th>
                    <th :class="th.class" :key="th.key" v-for="th in thead" @click="sortSelector(th.id, th.isSort)" scope="col">
                        <span :class="{ 'title-green': sortBy === th.id }">
                            {{ th.title }}
                            <i v-if="sortBy === th.id && isReverse === false" class="fas fa-sort-down"></i>
                            <i v-else-if="sortBy === th.id && isReverse === true" class="fas fa-sort-up"></i>
                            <span v-else-if="!th.isSort"></span>
                            <i v-else class="fas fa-sort"></i>
                        </span>
                    </th>
                </tr>
            </template>
            <template #tbody>
                <tr v-for="(item, index) in sortData.data" :key="'THT' + index" class="bg-shadow-hover rounded">
                    <td></td>
                    <td>{{ item.points_type }}</td>
                    <td>{{ item.points_title }}</td>
                    <td>{{ item.points_regYear }}</td>
                    <td>{{ item.points_regSemester }}</td>
                    <td>{{ item.points_credit }}</td>
                    <td>{{ item.points_status }}</td>
                    <td>{{ item.points_stuid }}</td>
                    <td>{{ item.usersDetails_cName }}</td>
                    <td>{{ item.points_regTime }}</td>
                    <td>{{ item.points_englishCredit || '-' }}</td>
                    <td>{{ item.points_englishCredit_date || '-' }}</td>
                    <td>{{ item.points_scholarshipHours || '-' }}</td>
                </tr>
            </template>
        </customTable>
    </div>
</template>

<script>
import customTable from "./tmp-table";
import { mapGetters } from "vuex";

export default {
    name: "exporttable",
    components: {
        customTable
    },
    methods: {
        sortSelector(selected, isSort) {
            if (isSort) {
                this.sortBy = selected;
                this.isReverse = !this.isReverse;
            } else {
                this.sortBy = "";
            }
        },
        exportTableData() {
            let vm = this;
            const headers = this.thead.map(th => `"${th.title}"`); // 包裹標題在雙引號內
            const rows = this.sortData.data.map(item => [
                item.points_type,
                item.points_title,
                item.points_regYear,
                item.points_regSemester,
                item.points_credit,
                item.points_status,
                item.points_stuid,
                item.usersDetails_cName,
                item.points_regTime,
                item.points_englishCredit || 'N/A',
                item.points_englishCredit_date || 'N/A',
                item.points_scholarshipHours || 'N/A'
            ]);

            let csvContent = headers.join(",") + "\n";
            rows.forEach(rowArray => {
                // 對每個欄位進行處理，去掉換行符並用雙引號包裹
                let row = rowArray.map(value => {
                    // 確保每個欄位用雙引號包裹，並去除內容中的換行符
                    const sanitizedValue = ('' + value).replace(/\r?\n|\r/g, " "); // 將換行符替換為空格
                    return `"${sanitizedValue.replace(/"/g, '""')}"`; // 將雙引號轉義並包裹整個欄位
                }).join(",");
                csvContent += row + "\n";
            });

            // 添加 UTF-8 BOM 以確保 Excel 正確顯示編碼
            const bom = "\uFEFF";
            const blob = new Blob([bom + csvContent], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            // 使用 `this.sortData` 或其他數據項作為檔案名稱的一部分
            const currentYear = vm.sortData.data[0]?.points_regYear + "年度" || '未知學年';
            const timestamp = new Date().toLocaleDateString("zh-TW", { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
            const filename = `資料匯出_${currentYear}_${timestamp}.csv`;

            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        formatDate(dateString) {
            if (!dateString) return "N/A";
            const date = new Date(dateString);
            return date.toLocaleDateString("zh-TW", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });
        },
    },
    computed: {
        ...mapGetters({
            exportData: "userPoint/exportData"
        }),
        sortData() {
            if (!this.exportData || !Array.isArray(this.exportData.data)) {
                return { data: [] };  // 預設為空數組，防止未定義錯誤
            }
            
            // 如果需要進行進一步的轉換或映射，確保 data 是有效數組後再操作
            return {
                data: this.exportData.data.map(item => ({
                    ...item,
                    points_type: this.pointsTypeMap[item.points_type] || item.points_type,
                    points_status: this.pointsStatusMap[item.points_status] || item.points_status,
                    points_regTime: this.formatDate(item.points_regTime)
                }))
            };
        }
    },
    data() {
        return {
            pointsTypeMap: {
                1: "國際交換或雙聯學位",
                2: "國內外企業實習",
                3: "國內外研習課程",
                4: "商業競賽",
                5: "國際志工",
                6: "企業專案研討",
                7: "中英語檢定",
                8: "獎學金服務時數"
            },
            pointsStatusMap: {
                1: "未審核",
                2: "已審核"
            },
            thead: [
                { key: "th02", class:"column8p", id: "points_type", title: "項目類別", isSort: false },
                { key: "th03", class:"column-title ", id: "points_title", title: "項目", isSort: false },
                { key: "th04", class:"", id: "points_regYear", title: "學年", isSort: false },
                { key: "th05", class:"", id: "points_regSemester", title: "學期", isSort: false },
                { key: "th06", class:"", id: "points_credit", title: "點數", isSort: true },
                { key: "th07", class:"column8p", id: "points_status", title: "狀態", isSort: true },
                { key: "th08", class:"column8p", id: "points_stuid", title: "學號", isSort: false },
                { key: "th09", class:"column8p", id: "usersDetails_cName", title: "姓名", isSort: false },
                { key: "th10", class:"", id: "points_regTime", title: "登入時間", isSort: false },
                { key: "th11", class:"", id: "points_englishCredit", title: "中英文檢定等級/分數", isSort: false },
                { key: "th12", class:"", id: "points_englishCredit_date", title: "中英文檢定核發日期", isSort: false },
                { key: "th13", class:"", id: "points_scholarshipHours", title: "獎助學金服務時數", isSort: false }
            ],
            sortBy: "points_stuid",
            isReverse: false
        };
    }
};
</script>

<style scoped>
.column8p{
    width: 10%;
      word-wrap: break-word; /* 在長內容處自動換行 */
}
.column-title {
  width: 20%; /* 調整項目名稱欄的寬度 */
  word-wrap: break-word; /* 在長內容處自動換行 */
}
.btn-success{
    background-color: var(--green) !important;
    border: 0px !important;
    box-shadow: 0px 8px 41px rgba(0, 159, 64, 0.25) !important;
    padding: 10px 60px !important;
    border-radius: 15px !important;
    font-weight: 700 !important;
}
.table td,
.table th {
    border-top: 0px !important;
    border-bottom-width: 0px !important;
}
.table {
    border-collapse: separate;
    border-spacing: 0px 0.5rem;
}
.table thead th {
    border-bottom: 0px;
    font-weight: 900;
    font-size: 14px;
    color: #c0c0c0;
}
.table tbody tr:hover {
    background-color: var(--hoverBgColor);
}
</style>