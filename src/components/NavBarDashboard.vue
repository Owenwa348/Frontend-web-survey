<template>
  <div class="min-h-screen bg-[#0A2A3A] text-white">
    <!-- Navbar -->
    <nav class="bg-gradient-to-r from-[#06202B] to-[#0A2A3A] shadow-lg border-b border-gray-700 sticky top-0 z-50 backdrop-blur-sm">
      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo + Toggle -->
          <div class="flex items-center">
            <button @click="sidebarOpen = !sidebarOpen" class="mr-4 lg:hidden p-2 rounded-lg hover:bg-white/10">
              <span class="block w-5 h-0.5 bg-white mb-1"></span>
              <span class="block w-5 h-0.5 bg-white mb-1"></span>
              <span class="block w-5 h-0.5 bg-white"></span>
            </button>
            <router-link to="/" class="flex items-center">
              <img src="/logoandname.png" alt="Logo" class="h-10 w-auto drop-shadow-lg" />
            </router-link>
          </div>

          <!-- Right: Notifications + Avatar -->
          <div class="flex items-center space-x-3">
            <button class="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg relative group">
              <Bell class="w-5 h-5 group-hover:animate-pulse" />
              <span class="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-lg animate-pulse">
                3
              </span>
            </button>
            <div class="w-8 h-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm font-bold ring-2 ring-white/20">
              JD
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Overlay for mobile -->
    <div v-if="sidebarOpen" @click="sidebarOpen = false" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"></div>

    <!-- Sidebar -->
    <aside :class="['lg:translate-x-0 fixed lg:static inset-y-0 right-0 z-40 w-72 transition-all duration-300 ease-out', sidebarOpen ? 'translate-x-0' : 'translate-x-full']">
      <div class="h-full bg-gradient-to-b from-[#06202B] via-[#0A2A3A] to-[#06202B] backdrop-blur-lg border-l border-white/10 shadow-2xl p-4 space-y-2">
        <template v-for="item in navItems" :key="item.id">
          <!-- Menu without children -->
          <button
            v-if="!item.children"
            @click="selectTab(item.id)"
            :class="getClass(item.id)"
          >
            <component :is="item.icon" class="w-5 h-5 mr-3" />
            {{ item.label }}
          </button>

          <!-- Menu with children (Dropdown) -->
          <div v-else>
            <button @click="toggleExpand(item.id)" :class="getClass(item.id, true)">
              <component :is="item.icon" class="w-5 h-5 mr-3" />
              {{ item.label }}
              <ChevronDown class="ml-auto w-4 h-4 transition-transform" :class="{ 'rotate-180': expandedMenu === item.id }" />
            </button>

            <div v-if="expandedMenu === item.id" class="ml-6 mt-1 space-y-1">
              <button
                v-for="sub in item.children"
                :key="sub.id"
                @click="selectTab(sub.id)"
                :class="getClass(sub.id)"
              >
                • {{ sub.label }}
              </button>
            </div>
          </div>
        </template>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { Bell, Home, BarChart3, Users, Settings, ChevronDown } from 'lucide-vue-next';

const props = defineProps({ activeTab: String });
const emit = defineEmits(['update:activeTab']);

const sidebarOpen = ref(false);
const expandedMenu = ref(null);

const toggleExpand = (id) => {
  expandedMenu.value = expandedMenu.value === id ? null : id;
};

const selectTab = (id) => {
  emit('update:activeTab', id);
  sidebarOpen.value = false;
};

const navItems = [
  { id: 'dashboard', icon: Home, label: 'Dashboard' },
  {
    id: 'analytics',
    icon: BarChart3,
    label: 'Analytics',
    children: [
      { id: 'PositionResults', label: 'ผลการประเมินแยกตามหน่วยงาน' },
      { id: 'analytics-by-unit', label: 'ผลประเมินตามข้อคำถาม' },

    ],
  },
  { id: 'users', icon: Users, label: 'Users' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

const getClass = (id, isParent = false) =>
  [
    'w-full flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 group relative',
    props.activeTab === id
      ? 'bg-gradient-to-r from-[#7AE2CF] to-[#5DD4C1] text-black shadow-md scale-105'
      : 'text-gray-300 hover:bg-white/10 hover:text-white',
    isParent && 'justify-between',
  ];
</script>

<style scoped>
/* Optional smooth animation */
nav button {
  animation: slideIn 0.3s ease-out forwards;
}
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
