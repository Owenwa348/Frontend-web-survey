<script setup>
import SalesBarChart from '../components/SalesBarChartDB.vue';
import StackedBarChart from "../components/StackedBarChartDB.vue";
import PieChart from '../components/PieChartDB.vue';
import { DollarSign, ShoppingCart, Users, Activity } from 'lucide-vue-next';
</script>

<template>
  <div class="space-y-8">
    <div class="bg-white rounded-xl shadow-sm border p-6">
      <PieChart />
    </div>
    <div class="bg-white rounded-xl shadow-sm border p-6">
      <SalesBarChart />
    </div>

    <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
      <StackedBarChart/>
    </div>
    
  </div>
</template>
