<template>
  <form @submit.prevent="addTask" class="form-container">
    <input v-model="newTask.text" type="text" placeholder="Add a new task" class="task-name" />
    <select v-model="newTask.priority" class="task-priority-select">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <button type="submit" class="add-button">Add</button>
  </form>
</template>
<script setup>
import { ref } from 'vue'

const emit = defineEmits(['addTask'])

const newTask = ref({
  text: '',
  priority: 'low',
})

const addTask = () => {
  if (!newTask.value.text.trim()) return
  emit('addTask', { ...newTask.value })
  newTask.value.text = ''
  newTask.value.priority = 'low'
}
</script>
<style scoped>
.form-container {
  @apply flex flex-col sm:flex-row gap-2 mb-6;
}

.task-priority-select {
  @apply border border-gray-300 rounded px-2 py-2 text-lg text-gray-900 bg-white;
}

.add-button {
  @apply bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition;
}

.task-name {
  @apply flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg text-gray-900 font-semibold bg-white placeholder-gray-400;
}
</style>
