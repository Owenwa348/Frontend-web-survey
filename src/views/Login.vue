<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">เข้าสู่ระบบ</h1>
        <p class="text-gray-600">
          {{ step === 'email' ? 'กรุณากรอกอีเมลตามที่ระบุไว้' : 'Enter verification code' }}
        </p>
      </div>

      <!-- Email Step -->
      <div v-if="step === 'email'" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            อีเมลของคุณ
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            required
          />
        </div>
        
        <button
          @click="handleLogin"
          :disabled="!email"
          class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          ยืนยัน
        </button>
      </div>

      <!-- OTP Step -->
      <div v-if="step === 'otp'" class="space-y-6">
        <div>
          <label for="otp" class="block text-sm font-medium text-gray-700 mb-2">
            Verification Code
          </label>
          <input
            id="otp"
            v-model="otp"
            type="text"
            placeholder="Enter 6-digit code"
            maxlength="6"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-center text-2xl tracking-widest"
            required
          />
          <p class="text-sm text-gray-500 mt-2">
            We sent a code to {{ email }}
          </p>
        </div>
        
        <div class="space-y-3">
          <button
            @click="handleOtp"
            :disabled="!otp || otp.length < 6"
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Verify Code
          </button>
          
          <button
            @click="step = 'email'"
            class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            ← Back to Email
          </button>
        </div>
      </div>

      <!-- Success State (if token exists) -->
      <div v-if="token" class="text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Login Successful!</h3>
        <p class="text-gray-600">Redirecting you now...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const email = ref('')
const otp = ref('')
const token = ref('')
const step = ref('email') // 'email' | 'otp'
const router = useRouter()

const handleLogin = async () => {
  try {
    const res = await axios.post('http://localhost:3000/auth/login', { email: email.value })
    if (res.data.redirect === 'dashboard') {
      localStorage.setItem('access_token', res.data.token);
      router.push('/dashboard');
    } else if (res.data.redirect === 'otp') {
      step.value = 'otp'
    }
  } catch (err) {
    alert('Email ไม่ถูกต้อง หรือเกิดข้อผิดพลาด')
    console.error(err)
  }
}

const handleOtp = async () => {
  try {
    const res = await axios.post('http://localhost:3000/auth/verify-otp', {
      email: email.value,
      otp: otp.value,
    })
    if (res.data.redirect === 'assessment') {
      localStorage.setItem('access_token', res.data.token);
      router.push('/assessment')
    }
  } catch (err) {
    alert('OTP ไม่ถูกต้อง')
    console.error(err)
  }
}
</script>
