<script setup>
import { ref, defineAsyncComponent } from 'vue';
import NavWithSidebar from '../components/NavBarDashboard.vue';

const activeTab = ref('dashboard');

const getCurrentView = () => {
  switch (activeTab.value) {
    case 'dashboard':
      return defineAsyncComponent(() => import('../views/DashboardView.vue'));
    case 'PositionResults':
      return defineAsyncComponent(() => import('../views/PositionResults.vue'));
    case 'analytics-by-unit':
      return defineAsyncComponent(() => import('./QuestionResults.vue'));
    case 'users':
      return defineAsyncComponent(() => import('./Dashboard/UsersView.vue'));
    case 'settings':
      return defineAsyncComponent(() => import('../views/SettingsView.vue'));
    default:
      return null;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex">
    <NavWithSidebar :active-tab="activeTab" @update:activeTab="activeTab = $event" />
    <main class="flex-1 p-6">
      <component :is="getCurrentView()" />
    </main>
  </div>
</template>
