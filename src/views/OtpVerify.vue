<template>
  <div class="p-6 max-w-md mx-auto">
    <h1>OTP Verification</h1>
    <p>สำหรับอีเมล: {{ email }}</p>
    <input v-model="otp" placeholder="Enter OTP" class="border p-2 w-full mt-2" />
    <button @click="verify" class="mt-4 px-4 py-2 bg-green-500 text-white">Verify</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const email = route.query.email;
const otp = ref('');

const verify = async () => {
  const res = await fetch('http://localhost:3000/auth/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp: otp.value }),
  });

  const data = await res.json();

if (data.success) {
  localStorage.setItem('access_token', data.token);
  router.push('/assessment');
} else {
    alert('OTP ไม่ถูกต้อง');
  }
};
</script>
