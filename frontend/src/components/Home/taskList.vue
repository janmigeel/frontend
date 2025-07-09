<template>
  <transition-group name="fade" tag="ul" class="tasks-list">
    <li
      v-for="(task, idx) in tasks"
      :key="task.id"
      class="task-item"
      :class="{
        'task-completed': task.completed,
        'task-priority-low-border': task.priority === 'low',
        'task-priority-medium-border': task.priority === 'medium',
        'task-priority-high-border': task.priority === 'high',
      }"
      draggable="true"
      @dragstart="$emit('dragstart', $event, idx)"
      @dragover.prevent
      @drop="$emit('drop', $event, idx)"
    >
      <div class="task-content-wrapper">
        <input
          type="checkbox"
          class="cursor-pointer"
          v-model="task.completed"
          @change="$emit('toggle', task)"
        />
        <span :class="['task-text', { 'task-text-completed': task.completed }]">
          {{ task.text }}
        </span>
      </div>

      <div class="task-actions">
        <span
          class="task-priority-badge"
          :class="{
            'badge-low': task.priority === 'low',
            'badge-medium': task.priority === 'medium',
            'badge-high': task.priority === 'high',
          }"
        >
          {{ task.priority }}
        </span>
        <button
          v-if="isAdmin"
          @click="$emit('delete', task.id)"
          class="delete-button"
          title="Delete"
        >
          &times;
        </button>
      </div>
    </li>
  </transition-group>
</template>

<script setup>
defineProps({
  tasks: Array,
  isAdmin: Boolean,
})
defineEmits(['toggle', 'delete', 'dragstart', 'drop'])
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.tasks-list {
  @apply space-y-2;
}

.task-item {
  @apply flex items-center justify-between p-3 rounded shadow bg-white cursor-pointer;
}

.task-completed {
  @apply opacity-60;
}

.task-priority-low-border {
  @apply border-l-4 border-green-400;
}
.task-priority-medium-border {
  @apply border-l-4 border-yellow-400;
}
.task-priority-high-border {
  @apply border-l-4 border-red-500;
}

.task-content-wrapper {
  @apply flex items-center gap-2;
}

.task-text {
  @apply text-lg text-gray-900 font-bold;
}

.task-text-completed {
  @apply line-through text-gray-400;
}

.task-priority-badge {
  @apply ml-2 px-2 py-0.5 rounded text-xs font-semibold;
}

.badge-low {
  @apply bg-green-100 text-green-700;
}
.badge-medium {
  @apply bg-yellow-100 text-yellow-700;
}
.badge-high {
  @apply bg-red-100 text-red-700;
}

.task-actions {
  @apply flex items-center gap-2;
}

.delete-button {
  @apply text-red-500 hover:text-red-700 transition;
}
</style>
