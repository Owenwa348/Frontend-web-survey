<script setup>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps({
  v1Data: {
    type: Object,
    default: () => ({
      labels: ['ทำแล้ว', 'ยังไม่ได้ทำ'],
      datasets: [{
        data: [70, 30],
        backgroundColor: ['#10b981', '#ef4444'],
        borderWidth: 2,
        borderColor: '#ffffff',
      }]
    })
  },
  v2Data: {
    type: Object,
    default: () => ({
      labels: ['ทำแล้ว', 'ยังไม่ได้ทำ'],
      datasets: [{
        data: [50, 50],
        backgroundColor: ['#3b82f6', '#f59e0b'],
        borderWidth: 2,
        borderColor: '#ffffff',
      }]
    })
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: { size: 12, weight: '500' },
        padding: 20,
        usePointStyle: true,
        color: '#374151',
      },
    },
    tooltip: {
      backgroundColor: 'rgba(17, 24, 39, 0.95)',
      titleColor: '#f9fafb',
      bodyColor: '#f3f4f6',
      cornerRadius: 8,
      padding: 12,
    }
  },
  cutout: '65%',
  elements: {
    arc: {
      borderRadius: 4,
    }
  },
}
</script>

<template>
  <div class="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-lg border border-slate-200 p-8">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-slate-800 tracking-tight">เปอร์เซ็นต์การทำแบบประเมิน</h2>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <!-- V1 Chart -->
      <div class="bg-white rounded-lg p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
        <div class="text-center mb-6">
          <h3 class="text-xl font-semibold text-slate-800 capitalize">Verte Smart Solution</h3>
        </div>
        <div class="relative w-72 h-72 mx-auto">
          <Doughnut :data="v1Data" :options="chartOptions" />
          <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span class="text-3xl font-bold text-slate-800 leading-none">{{ v1Data.datasets[0].data[0] }}%</span>
            <span class="text-sm text-slate-600 font-medium uppercase tracking-wide mt-1">Complete</span>
          </div>
        </div>
      </div>

      <!-- V2 Chart -->
      <div class="bg-white rounded-lg p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
        <div class="text-center mb-6">
          <h3 class="text-xl font-semibold text-slate-800 capitalize">Verte Security</h3>
        </div>
        <div class="relative w-72 h-72 mx-auto">
          <Doughnut :data="v2Data" :options="chartOptions" />
          <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span class="text-3xl font-bold text-slate-800 leading-none">{{ v2Data.datasets[0].data[0] }}%</span>
            <span class="text-sm text-slate-600 font-medium uppercase tracking-wide mt-1">Complete</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Mobile responsive adjustments */
@media (max-width: 767px) {
  .w-72 {
    width: 16rem;
  }
  
  .h-72 {
    height: 16rem;
  }
  
  .text-3xl {
    font-size: 1.75rem;
  }
}
</style>