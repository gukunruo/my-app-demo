<template>
  <div>
    <input type="file" @change="handleFileChange" accept=".xlsx, .xls" />
    <button @click="downloadFile" :disabled="!cleanedData">Download Cleaned File</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';

const cleanedData = ref(null);

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      // Assuming the data is in the first sheet
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { defval: '' });
      // Filter out rows where all cells are empty
      cleanedData.value = jsonData.filter(row => Object.values(row).some(cell => cell !== ''));
    };
    reader.readAsArrayBuffer(file);
  }
}

function downloadFile() {
  if (cleanedData.value) {
    const worksheet = XLSX.utils.json_to_sheet(cleanedData.value);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'CleanedData');
    XLSX.writeFile(workbook, 'cleaned_data.xlsx');
  }
}
</script>

<style scoped>
</style>
