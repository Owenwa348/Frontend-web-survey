<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const userId = route.params.id

const user = ref({
  name: '',
  email: '',
  password: '',
  agencyEVP: '',
  agencySVP: '',
  agencyDM: '',
  area: '',
  isActive: true,
})

// โหลดข้อมูลผู้ใช้
onMounted(async () => {
  try {
    const res = await axios.get(`/api/userlist/${userId}`)
    user.value = res.data
  } catch (err) {
    alert('ไม่สามารถโหลดข้อมูลผู้ใช้ได้')
    console.error(err)
  }
})

// ฟังก์ชันอัปเดตข้อมูล
const updateUser = async () => {
  try {
    await axios.put(`/api/userlist/${userId}`, user.value)
    alert('อัปเดตข้อมูลสำเร็จ')
    router.push('/dashboard')
  } catch (err) {
    alert('เกิดข้อผิดพลาดในการอัปเดต')
    console.error(err)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-2xl font-semibold text-gray-900 mb-2">แก้ไขข้อมูลผู้ใช้</h1>
          <p class="text-gray-600">อัปเดตข้อมูลส่วนตัวและการตั้งค่าบัญชีผู้ใช้</p>
        </div>

        <!-- Main Form Card -->
        <div class="bg-white rounded-lg shadow border">
          <form @submit.prevent="updateUser" class="divide-y divide-gray-200">
            
            <!-- Personal Information Section -->
            <div class="p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">ข้อมูลส่วนตัว</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    ชื่อ <span class="text-red-500">*</span>
                  </label>
                  <input 
                    v-model="user.name" 
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="กรอกชื่อของคุณ"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Email <span class="text-red-500">*</span>
                  </label>
                  <input 
                    v-model="user.email" 
                    type="email"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="กรอกอีเมลของคุณ"
                  />
                </div>
              </div>
              
              <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  รหัสผ่าน
                </label>
                <input 
                  v-model="user.password" 
                  type="password"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ปล่อยว่างไว้หากไม่ต้องการเปลี่ยนรหัสผ่าน"
                />
                <p class="text-xs text-gray-500 mt-1">ปล่อยว่างไว้หากไม่ต้องการเปลี่ยนรหัสผ่าน</p>
              </div>
            </div>

            <!-- Agency Information Section -->
            <div class="p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">ข้อมูลองค์กร</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    EVP
                  </label>
                  <input 
                    v-model="user.agencyEVP"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Executive Vice President"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    SVP
                  </label>
                  <input 
                    v-model="user.agencySVP"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Senior Vice President"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    DM
                  </label>
                  <input 
                    v-model="user.agencyDM"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="District Manager"
                  />
                </div>
              </div>
              
              <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  พื้นที่ (Area)
                </label>
                <input 
                  v-model="user.area"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ระบุพื้นที่ที่รับผิดชอบ"
                />
              </div>
            </div>

            <!-- Status Section -->
            <div class="p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">สถานะและสิทธิ์</h3>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  สถานะการใช้งาน
                </label>
                <select 
                  v-model="user.isActive"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option :value="true">ใช้งานได้</option>
                  <option :value="false">ปิดการใช้งาน</option>
                </select>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="px-6 py-4 bg-gray-50">
              <div class="flex gap-3">
                <button 
                  type="submit"
                  class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  บันทึกการเปลี่ยนแปลง
                </button>
                
                <router-link 
                  to="/dashboard"
                  class="bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 border border-gray-300 font-medium"
                >
                  กลับไปยังแดชบอร์ด
                </router-link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>