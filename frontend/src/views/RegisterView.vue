<template>
  <form @submit.prevent="onRegister" class="register-form">
    <h2 class="register-title">Register</h2>
    <input v-model="name" type="text" placeholder="Name" class="register-input" required />
    <input v-model="email" type="email" placeholder="Email" class="register-input" required />
    <input
      v-model="password"
      type="password"
      placeholder="Password"
      class="register-input"
      required
    />
    <button type="submit" class="register-btn">Register</button>
    <div v-if="error" class="register-error">{{ error }}</div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const auth = useAuthStore()
const router = useRouter()

async function onRegister() {
  try {
    await auth.register({ name: name.value, email: email.value, password: password.value })
    router.push({ name: 'home' })
  } catch (e) {
    error.value = 'Registration failed'
  }
}
</script>
<style scoped>
.register-form {
  @apply flex flex-col gap-4 max-w-sm w-full p-6 bg-white rounded-lg shadow h-fit;
}
.register-title {
  @apply text-2xl font-bold text-center text-indigo-700 mb-2;
}
.register-input {
  @apply border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400;
  @apply text-gray-900 placeholder-gray-400 bg-white;
}
.register-btn {
  @apply bg-indigo-600 text-white rounded px-4 py-2 font-semibold hover:bg-indigo-700 transition;
}
.register-error {
  @apply text-red-500 text-center mt-2;
}
</style>
