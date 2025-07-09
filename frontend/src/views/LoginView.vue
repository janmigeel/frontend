<template>
    <form @submit.prevent="onLogin" class="login-form">
      <h2 class="login-title">Login</h2>
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
        class="login-input"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
        class="login-input"
      />
      <button type="submit" class="login-btn">
        Login
      </button>
      <div v-if="error" class="login-error">{{ error }}</div>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const auth = useAuthStore()
const router = useRouter()

async function onLogin() {
  try {
    await auth.login({ email: email.value, password: password.value })
    router.push({ name: 'home' })
  } catch (e) {
    error.value = 'Invalid credentials'
  }
}
</script>

<style scoped>
.login-form {
  @apply flex flex-col gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-4;
  @apply sm:p-6 md:p-8 bg-white rounded-lg shadow h-fit;
}
.login-title {
  @apply text-2xl font-bold text-center text-indigo-700 mb-2;
}
.login-input {
  @apply border border-gray-300 rounded px-3 py-2 md:px-4 md:py-2 focus:outline-none;
  @apply focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-gray-400 bg-white;
}
.login-btn {
  @apply bg-indigo-600 text-white rounded px-4 py-2 font-semibold hover:bg-indigo-700 transition;
}
.login-error {
  @apply text-red-500 text-center;
}
</style>