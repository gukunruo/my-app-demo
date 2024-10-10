<template>
  <div>
    <a-button type="primary" @click="exportToExcel">导出成Excel</a-button>
    <div class="ag-theme-alpine" style="width: 100%; height: 600px">
      <ag-grid-vue
        :rowData="rowData"
        :columnDefs="columnDefs"
        rowSelection="multiple"
        @grid-ready="onGridReady"
        class="ag-theme-alpine"
      >
      </ag-grid-vue>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import * as XLSX from "xlsx";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// 随机生成1万条数据
const generateRandomData = () => {
  const rowData = [];
  for (let i = 0; i < 10000; i++) {
    rowData.push({
      id: i + 1,
      name: `Name-${Math.random().toString(36).substring(7)}`,
      age: Math.floor(Math.random() * 100),
      address: `Address-${Math.random().toString(36).substring(7)}`,
      email: `user${i}@example.com`,
      phone: `123-456-7890`,
      company: `Company-${Math.random().toString(36).substring(7)}`,
      country: `Country-${Math.random().toString(36).substring(7)}`,
    });
  }
  return rowData;
};

// 设置列
const columnDefs = [
  { headerName: "ID", field: "id", sortable: true, filter: true },
  { headerName: "Name", field: "name", sortable: true, filter: true },
  { headerName: "Age", field: "age", sortable: true, filter: true },
  { headerName: "Address", field: "address", sortable: true, filter: true },
  { headerName: "Email", field: "email", sortable: true, filter: true },
  { headerName: "Phone", field: "phone", sortable: true, filter: true },
  { headerName: "Company", field: "company", sortable: true, filter: true },
  { headerName: "Country", field: "country", sortable: true, filter: true },
];

// 用 ref 来存储表格数据和 ag-Grid 实例
const rowData = ref(generateRandomData());
const gridApi = ref(null);

// ag-Grid 的 onGridReady 回调
const onGridReady = (params) => {
  gridApi.value = params.api;
  console.log("Grid is ready!", params.api);
};

// 获取当前时间并格式化字符串
const getCurrentFormattedTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
  return `${year}-${month}-${day}_${hours}:${minutes}:${seconds}:${milliseconds}`;
};

// 导出到 Excel 的函数
const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(rowData.value);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const filename = `table_data_${getCurrentFormattedTime()}.xlsx`;
  XLSX.writeFile(workbook, filename);
};
</script>

<style>
/* 添加一些基本样式 */
.ag-theme-alpine {
  height: 600px;
  width: 100%;
}
</style>
