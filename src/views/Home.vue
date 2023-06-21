<template>
  <div class="kanban-board">
    <div v-for="section in store.sections" :key="section.id" class="section">
      <h2 class="section-title">{{ section.title }}</h2>
      <div class="tasks" @drop="dropTask($event, section.id)" @dragover.prevent>
        <div 
          v-for="task in section.tasks" :key="task._id" 
          class="task move" draggable="true" 
          @dragstart="dragTask($event, task, section.id)" 
          @click="selectedTask = task; 
          showViewModal = true"
        >
          {{ task.title }}
        </div>

        <div v-if="section.id==='todo'" class="cursor-pointer task" @click="showAddModal = true">
          Add Task
        </div>
      </div>
    </div>
    <ViewTaskModal :show="showViewModal" :task="selectedTask" @close="showViewModal=false" />
    <AddTaskModal :show="showAddModal" @close="showAddModal=false" />
  </div>
</template>

<script lang="ts">
import { useMainStore } from '@/store';
import { Vue, Options } from 'vue-class-component';
import ViewTaskModal from "@/components/ViewTaskModal.vue"
import AddTaskModal from "@/components/AddTaskModal.vue"
import { Task } from '@/types';

@Options({
  components: {
    ViewTaskModal,
    AddTaskModal
  }
})
export default class KanbanBoard extends Vue {
  showAddModal = false
  showViewModal = false
  selectedTask: Task | null = null 
  store  = useMainStore()

  draggedTask: Task | null = null;

  dragTask(event: DragEvent, task: Task, sectionId: string): void {
    this.draggedTask = task;
    event.dataTransfer!.setData('text/plain', sectionId);
  }

  dropTask(event: DragEvent, sectionId: string): void {
    if (this.draggedTask) {
      const sourceSectionId = event.dataTransfer!.getData('text/plain');
      const sourceSection = this.store.sections.find((section) => section.id === sourceSectionId);
      const targetSection = this.store.sections.find((section) => section.id === sectionId);

      if (sourceSection && targetSection) {
        sourceSection.tasks = sourceSection.tasks.filter((task) => task._id !== this.draggedTask!._id);
        this.draggedTask.status = targetSection.id as any;
        targetSection.tasks.push(this.draggedTask);
      }

      this.draggedTask = null;
    }
  }
  
  // mounted get tasks
  mounted() {
    this.store.getTasks();
  }

  
}
</script>

<style scoped>
.kanban-board {
  display: flex;
  gap: 16px;
}

.section {
  flex: 1;
  background-color: #f0f0f0;
  padding: 16px;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
}

.tasks {
  min-height: 100px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  overflow-y: auto;
}
.task {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
}
.move{
  cursor: move;
}
</style>