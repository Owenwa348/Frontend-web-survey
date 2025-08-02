<template>
  <div class="bg-white rounded-xl shadow p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Stacked Bar Chart</h3>
    <Bar v-if="chartData" :data="formattedChartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Bar } from 'vue-chartjs'
import { computed } from 'vue'

ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
)

const props = defineProps({
  chartData: Object, // ต้องเป็น { labels: [], datasets: [ { data: [] } ] }
})

// 🎯 สีตามระดับคะแนน (1–5)
const levelColors = {
  1: '#7B341E',   // น้ำตาลเข้ม
  2: '#E53E3E',   // แดง
  3: '#ED8936',   // ส้ม
  4: '#ECC94B',   // เหลือง
  5: '#38A169'    // เขียว
}

// 🎯 สร้าง datasets แยกแต่ละคะแนน
const formattedChartData = computed(() => {
  if (!props.chartData || !props.chartData.labels || !props.chartData.datasets?.length) return {}

  const rawData = props.chartData.datasets[0].data // รับชุดเดียวก่อน เช่น 'ปัจจุบัน'
  const labels = props.chartData.labels
  const stacks = [1, 2, 3, 4, 5]

  // แปลงข้อมูลเป็นจำนวนของแต่ละคะแนนในแต่ละ label
  const grouped = stacks.map(level => ({
    label: `คะแนน ${level}`,
    data: labels.map((_, idx) =>
      rawData.reduce((count, entry) => {
        return count + (entry[idx] === level ? 1 : 0)
      }, 0)
    ),
    backgroundColor: levelColors[level],
    stack: 'stack1'
  }))
  

  return {
    labels,
    datasets: grouped
  }
})


const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top'
    },
    datalabels: {
      color: '#fff',
      anchor: 'center',
      align: 'center',
      font: {
        weight: 'bold',
        size: 10
      },
      formatter: value => value > 0 ? value : ''
    }
  },
  scales: {
    x: {
      stacked: true
    },
    y: {
      stacked: true,
      beginAtZero: true
    }
  }
}
</script>
