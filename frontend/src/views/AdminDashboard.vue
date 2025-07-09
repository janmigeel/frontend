<template>
  <div class="admin-dashboard">
    <h2 class="dashboard-title">Admin Dashboard</h2>
    <div v-if="usersWithTasks.length === 0" class="empty-state">No users found.</div>
    <div v-for="user in usersWithTasks" :key="user.id" class="user-card">
      <div class="user-header">
        <span class="user-name">{{ user.name }}</span>
        <span class="user-email">{{ user.email }}</span>
        <span class="user-role" :class="user.role === 'admin' ? 'admin-role' : 'user-role'">
          {{ user.role }}
        </span>
      </div>
      <ul class="user-tasks">
        <li v-if="!user.tasks || user.tasks.length === 0" class="no-task">No tasks</li>
        <li
          v-for="task in user.tasks"
          :key="task.id"
          class="user-task"
          :class="{ 'completed-task': task.completed }"
        >
          <span class="task-text">{{ task.text }}</span>
          <span
            class="task-priority"
            :class="{
              'priority-low': task.priority === 'low',
              'priority-medium': task.priority === 'medium',
              'priority-high': task.priority === 'high',
            }"
            >{{ task.priority }}</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const usersWithTasks = ref([])

onMounted(() => {
  const users = JSON.parse(localStorage.getItem('users')) || []
  const allTasks = JSON.parse(localStorage.getItem('tasks')) || []

  usersWithTasks.value = users.map((user) => ({
    ...user,
    tasks: allTasks.filter((task) => task.userId === user.id),
  }))
})
</script>

<style scoped>
.admin-dashboard {
  @apply max-w-3xl mx-auto p-6;
}
.dashboard-title {
  @apply text-2xl font-bold mb-6 text-indigo-700;
}
.user-card {
  @apply bg-white rounded-lg shadow p-4 mb-6;
}
.user-header {
  @apply flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2;
}
.user-name {
  @apply font-semibold text-lg text-gray-800;
}
.user-email {
  @apply text-gray-500 text-sm;
}
.user-role {
  @apply px-2 py-0.5 rounded text-xs font-bold uppercase;
}
.admin-role {
  @apply bg-indigo-100 text-indigo-700;
}
.user-role:not(.admin-role) {
  @apply bg-gray-100 text-gray-700;
}
.user-tasks {
  @apply mt-2 space-y-1;
}
.user-task {
  @apply flex items-center justify-between px-2 py-1 rounded;
}
.completed-task {
  @apply line-through text-gray-400;
}
.no-task {
  @apply text-gray-400 italic;
}
.task-priority {
  @apply ml-2 px-2 py-0.5 rounded text-xs font-semibold;
}
.priority-low {
  @apply bg-green-100 text-green-700;
}
.priority-medium {
  @apply bg-yellow-100 text-yellow-700;
}
.priority-high {
  @apply bg-red-100 text-red-700;
}
.empty-state {
  @apply text-center text-gray-400 py-8 text-lg;
}
.task-text {
  @apply text-base text-gray-900 font-semibold;
}
</style>
