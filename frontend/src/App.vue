<template>
  <div class="app-container">
    <header>
      <nav class="nav-bar">
        <RouterLink to="/" exact>Home</RouterLink>
        <RouterLink to="/admin">Admin - Dashboard</RouterLink>
        <template v-if="auth.isAuthenticated">
          <span class="divider">|</span>
          <span>Welcome, {{ auth.user?.name || 'User' }}</span>
          <button @click="handleLogout" class="logout-btn">Logout</button>
        </template>
        <template v-else>
          <span class="divider">|</span>
          <RouterLink to="/login">Login</RouterLink>
          <RouterLink to="/register" class="ml-2">Register</RouterLink>
        </template>
      </nav>
    </header>
    <main class="main-content">
      <RouterView @snackbar="showSnackbar" />
    </main>
    <div v-if="snackbar.show" class="snackbar">
      {{ snackbar.message }}
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'

const auth = useAuthStore()
const router = useRouter()

const snackbar = ref({
  show: false,
  message: ''
})

const showSnackbar = (msg) => {
  snackbar.value.message = msg
  snackbar.value.show = true
  setTimeout(() => {
    snackbar.value.show = false
  }, 2500)
}

onMounted(() => {
  auth.fetchUser() 
})

const handleLogout = async () => {
  await auth.logout()
  showSnackbar('Logged out successfully!')
  router.push({ name: 'login' })
}
</script>

<style scoped>
.app-container {
  @apply flex flex-col min-h-screen items-center justify-center px-2;
}
header {
  @apply mb-8 w-full flex justify-center;
}
.nav-bar {
  @apply flex items-center justify-center text-lg space-x-2 sm:space-x-4;
}
.nav-bar a {
  @apply inline-block px-2 sm:px-4 py-2 transition hover:text-indigo-600;
}
.nav-bar a.router-link-exact-active {
  @apply font-bold text-indigo-900;
}
.divider {
  @apply mx-1 sm:mx-2 text-gray-400;
}
.logout-btn {
  @apply ml-2 text-red-500 cursor-pointer bg-transparent border-0 font-normal;
}
.logout-btn:hover {
  @apply underline;
}
.main-content {
  @apply w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl mx-auto p-2 sm:p-4 flex-1 flex justify-center;
}
.snackbar {
  @apply fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-700 text-white px-6 py-3 rounded shadow-lg z-50 transition;
  @apply min-w-[200px] text-center font-medium opacity-95;
}
</style>