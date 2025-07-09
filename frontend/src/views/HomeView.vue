<template>
  <main>
    <div class="task-container">
      <addTask @addTask="handleAddTask" />

      <div class="filter-search-row">
        <select v-model="statusFilter" class="status-filter-select">
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <input v-model="searchQuery" type="text" placeholder="Search task" class="task-search" />
      </div>
      <!-- Empty state -->
      <div v-if="filteredTasks.length === 0" class="empty-state">
        <span>No tasks found.</span>
      </div>
      <taskList
        :tasks="filteredTasks"
        :isAdmin="auth.user?.role === 'admin'"
        @toggle="toggleTask"
        @delete="deleteTask"
        @dragstart="onDragStart"
        @drop="onDrop"
      />
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

import addTask from '@/components/Home/addTask.vue'
import taskList from '@/components/Home/taskList.vue'

const emit = defineEmits(['snackbar'])

const auth = useAuthStore()

const tasks = ref(JSON.parse(localStorage.getItem('tasks')) || [
  { id: 1, userId: 1, text: 'Sample Task 1', completed: false, priority: 'low', order: 1 },
  { id: 2, userId: 2, text: 'Sample Task 2', completed: false, priority: 'medium', order: 2 },
  { id: 3, userId: 1, text: 'Sample Task 3', completed: false, priority: 'high', order: 3 },
])

const statusFilter = ref('all')
const searchQuery = ref('')

const sortedTasks = computed(() => [...tasks.value].sort((a, b) => a.order - b.order))

const filteredTasks = computed(() => {
  let list = sortedTasks.value
  if (statusFilter.value === 'completed') list = list.filter((t) => t.completed)
  else if (statusFilter.value === 'pending') list = list.filter((t) => !t.completed)
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    list = list.filter((t) => t.text.toLowerCase().includes(q))
  }
  return list
})

const handleAddTask = (task) => {
  tasks.value.push({
    ...task,
    id: Date.now(),
    userId: auth.user?.id,
    completed: false,
    order: tasks.value.length + 1,
  })

  localStorage.setItem('tasks', JSON.stringify(tasks.value))
  emit('snackbar', 'Task added!')
}

const deleteTask = (taskId) => {
  tasks.value = tasks.value.filter((t) => t.id !== taskId)

  localStorage.setItem('tasks', JSON.stringify(tasks.value))
  emit('snackbar', 'Task deleted!')
}

const toggleTask = (task) => {

  localStorage.setItem('tasks', JSON.stringify(tasks.value))
  emit('snackbar', 'Task updated!')
}

const onDragStart = (e, idx) => {
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('taskIdx', idx)
}

const onDrop = (e, idx) => {
  const fromIdx = +e.dataTransfer.getData('taskIdx')
  if (fromIdx === idx) return
  const updated = [...tasks.value]
  const [moved] = updated.splice(fromIdx, 1)
  updated.splice(idx, 0, moved)
  updated.forEach((t, i) => (t.order = i + 1))
  tasks.value = updated
}
</script>

<style scoped>
.task-container {
  @apply max-w-xl mx-auto p-4;
}

.filter-search-row {
  @apply flex flex-col sm:flex-row gap-2 mb-4 items-center;
}

.status-filter-select {
  @apply border border-indigo-200 rounded px-3 py-2 text-indigo-700 bg-white focus:outline-none;
  @apply focus:ring-2 focus:ring-indigo-400 text-base font-semibold;
}

.task-search {
  @apply w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2;
  @apply focus:ring-indigo-400 text-base text-gray-900 bg-white;
}
@media (min-width: 640px) {
  .task-search {
    @apply max-w-xs;
  }
}
.empty-state {
  @apply text-center text-gray-400 py-8 text-lg;
}
</style>
