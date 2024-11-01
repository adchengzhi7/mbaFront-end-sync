<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <!-- Dropdown to select field for targeted search -->
             <div class="d-flex col-10">
                <select v-model="selectedField" class="form-control form-select w-25">
                    <option value="">所有欄位</option>
                    <option value="log_type">操作類型</option>
                    <option value="user_id">使用者ID</option>
                    <option value="student_id">學生ID</option>
                    <option value="points_id">點數ID</option>
                    <option value="ip_address">IP 位址</option>
                    <option value="device_info">設備資訊</option>
                    <option value="previous_data">修改前資料</option>
                    <option value="updated_data">修改後資料</option>
                    <option value="added_data">新增資料</option>
                    <option value="export_params">匯出參數</option>
                </select>

                <!-- Search bar -->
                <input
                    class="form-control w-50"
                    v-model="filter"
                    placeholder="輸入查詢的關鍵字"
                    type="text"
                />
            </div>

            <button @click="exportLogs" class="btn btn-primary">
                匯出日誌資料 <i class="fas fa-cloud-download-alt"></i>
            </button>
        </div>
        
        <customTable>
            <template #thead>
                <tr>
                    <th></th>
                    <th v-for="th in thead" :key="th.key" @click="sortSelector(th.id, th.isSort)" scope="col">
                        <span :class="{ 'title-green': sortBy === th.id }">
                            {{ th.title }}
                            <i v-if="sortBy === th.id && !isReverse" class="fas fa-sort-down"></i>
                            <i v-else-if="sortBy === th.id && isReverse" class="fas fa-sort-up"></i>
                        </span>
                    </th>
                </tr>
            </template>
            <template #tbody>
                <tr v-for="(log, index) in sortedLogs" :key="log.log_id" class="bg-shadow-hover rounded">
                    <td>{{ index + 1 }}</td>
                    <td>{{ log.log_type }}</td>
                    <td>
                        <router-link :to="`/ta/student?stuId=${log.user_id}`">{{ log.user_id }}</router-link>
                    </td>
                    <td>
                        <router-link :to="`/ta/student?stuId=${log.student_id}`">{{ log.student_id }}</router-link>
                    </td>
                    <td>{{ formatDate(log.action_time) }}</td>
                    <td><button @click="showDetails(log)" class="btn btn-primary">查看詳情</button></td>
                </tr>
            </template>
        </customTable>
    </div>
</template>

<script>
/* global hljs */
import customTable from "./tmp-table";
import { mapGetters, mapActions } from "vuex";
import Swal from "sweetalert2";

export default {
    name: "LogTable",
    components: {
        customTable
    },
    data() {
        return {
            sortBy: "action_time", // Set initial sort column to action_time
            isReverse: true, // Start with descending order for time
            filter: "", // Search bar input
            selectedField: "", // Dropdown selection for search field
            thead: [
                { key: "th01", id: "log_type", title: "操作類型", isSort: true },
                { key: "th02", id: "user_id", title: "使用者ID", isSort: true },
                { key: "th03", id: "student_id", title: "學生ID", isSort: true },
                { key: "th04", id: "action_time", title: "操作時間", isSort: true },
                { key: "th05", id: "details", title: "操作細節", isSort: false }
            ],
            logTypeMapping: {
                login: "登入",
                add_student: "新增學生",
                edit_student: "編輯學生",
                add_points: "新增點數",
                update_points: "更新點數",
                update_point_status: "點數狀態更新",
                add_admin: "新增助教",
                export_data: "匯出資料"
            }
        };
    },
    computed: {
    ...mapGetters({
        logs: "log/allLogs"
    }),
    sortedLogs() {
        if (!this.logs) return []; // 確保 logs 存在，否則回傳空陣列

        const searchText = this.filter.toLowerCase();

        const filteredLogs = this.logs
            .map(log => ({
                ...log,
                log_type: this.logTypeMapping[log.log_type] || log.log_type
            }))
            .filter(log => {
                // If selectedField is specified, search only in that field
                if (this.selectedField) {
                    const fieldValue = log[this.selectedField];
                    return fieldValue && fieldValue.toString().toLowerCase().includes(searchText);
                }

                // If no specific field is selected, search across all fields
                return Object.values(log).some(value =>
                    value && value.toString().toLowerCase().includes(searchText)
                );
            });

        return filteredLogs.sort((a, b) => {
            if (this.isReverse) {
                return a[this.sortBy] > b[this.sortBy] ? -1 : 1;
            } else {
                return a[this.sortBy] < b[this.sortBy] ? -1 : 1;
            }
        });
    }
},
    methods: {
        ...mapActions({
            fetchAllLogs: "log/getAllLogs"
        }),
        sortSelector(selected, isSort) {
            if (isSort) {
                this.sortBy = selected;
                this.isReverse = !this.isReverse;
            }
        }, showDetails(log) {
            // 遞歸排序 JSON 對象的鍵，保證比較時順序一致
            const sortJsonKeys = (json) => {
                if (typeof json !== "object" || json === null) return json;
                if (Array.isArray(json)) return json.map(sortJsonKeys);
                return Object.keys(json)
                    .sort()
                    .reduce((result, key) => {
                        result[key] = sortJsonKeys(json[key]);
                        return result;
                    }, {});
            };

           

            Swal.fire({
                title: "操作細節",
                html: `
                    <div style="text-align: left; font-family: monospace;">
                        <p><strong>IP 位址:</strong> ${log.ip_address || '-'}</p>
                        <p><strong>設備資訊:</strong> ${log.device_info || '-'}</p>
                        <hr>
                        <p><strong>點數ID:</strong> ${log.points_id || '-'}</p>
                        <hr>
                        <p><strong>修改前資料:</strong><pre><code id="json-previous-data" class="json"></code></pre></p>
                        <p><strong>修改後資料:</strong><pre><code id="json-updated-data" class="json"></code></pre></p>
                        <hr>
                        <p><strong>新增資料:</strong><pre><code id="json-added-data" class="json"></code></pre></p>
                        <hr>
                        <p><strong>匯出參數:</strong><pre><code id="json-export-params" class="json"></code></pre></p>
                    </div>
                `,
                confirmButtonText: "關閉",
                confirmButtonColor: "#38b269",
                didOpen: () => {
                   

                    // 使用 highlight.js 顯示 JSON 資料
                    const highlightJson = (elementId, jsonString) => {
                        const element = document.getElementById(elementId);
                        element.textContent = JSON.stringify(sortJsonKeys(JSON.parse(jsonString || '{}')), null, 2) || '-';
                        hljs.highlightElement(element);
                    };

                    highlightJson('json-previous-data', JSON.parse(log.previous_data));
                    highlightJson('json-updated-data', JSON.parse(log.updated_data));
                    highlightJson('json-added-data', JSON.parse(log.added_data));
                    highlightJson('json-export-params', JSON.parse(log.export_params));
                }
            });
        },
        formatDate(dateString) {
            if (!dateString) return "-";
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
        exportLogs() {
            const headers = this.thead.map(th => th.title);
            const rows = this.logs.map(log => [
                log.log_type,
                log.user_id,
                log.student_id || '-',
                log.points_id || '-',
                log.ip_address || '-',
                this.formatDate(log.action_time),
                log.device_info || '-',
                log.previous_data || '-',
                log.updated_data || '-',
                log.added_data || '-',
                log.export_params || '-'
            ]);

            let csvContent = headers.join(",") + "\n";
            rows.forEach(rowArray => {
                let row = rowArray.join(",");
                csvContent += row + "\n";
            });

            const bom = "\uFEFF";
            const blob = new Blob([bom + csvContent], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", `日誌匯出_${new Date().toLocaleDateString()}.csv`);
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    },
    mounted() {
        this.fetchAllLogs(); // 載入組件時自動獲取所有日誌
    }
};
</script>

<style scoped>
.btn-success {
    background-color: var(--green) !important;
    border: 0 !important;
    box-shadow: 0 8px 41px rgba(0, 159, 64, 0.25) !important;
    padding: 10px 60px !important;
    border-radius: 15px !important;
    font-weight: 700 !important;
}
.table td,
.table th {
    border-top: 0 !important;
    border-bottom-width: 0 !important;
}
.table {
    border-collapse: separate;
    border-spacing: 0 0.5rem;
}
.table thead th {
    border-bottom: 0;
    font-weight: 900;
    font-size: 14px;
    color: #c0c0c0;
}
.table tbody tr:hover {
    background-color: var(--hoverBgColor);
}
</style>