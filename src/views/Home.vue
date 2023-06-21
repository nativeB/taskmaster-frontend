<template>
  <div class="kanban-board">
    <div v-for="section in sections" :key="section.id" class="section">
      <h2 class="section-title">{{ section.title }}</h2>
      <div class="tasks" @drop="dropTask($event, section.id)" @dragover.prevent>
        <div 
          v-for="task in section.tasks" :key="task.id" 
          class="task move" draggable="true" 
          @dragstart="dragTask($event, task, section.id)" 
          @click="selectedTask = task; 
          showModal = true"
        >
          {{ task.title }}
        </div>

        <div v-if="section.id==='todo'" class="cursor-pointer task">
          Add Task
        </div>
      </div>
    </div>
    <TaskModal :show="showModal" :task="selectedTask" @close="showModal=false" />
  </div>
</template>

<script lang="ts">
import { useMainStore } from '@/store';
import { Vue, Options } from 'vue-class-component';
import TaskModal from "@/components/TaskModal.vue"
interface Task {
  id: number;
  title: string;
  status: string;
}

interface Section {
  id: string;
  title: string;
  tasks: Task[];
}

@Options({
  components: {
    TaskModal
  }
})
export default class KanbanBoard extends Vue {
  showModal = false
  selectedTask: Task | null = null 
  private store  = useMainStore()

  sections: Section[] = [
    {
      id: 'todo',
      title: 'Todo',
      tasks: [
      // { id: 1, title: 'Task 1', status: 'todo' }
      ],
    },
    {
      id: 'inProgress',
      title: 'In Progress',
      tasks: [
      ],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
      ],
    },
  ];

  draggedTask: Task | null = null;

  dragTask(event: DragEvent, task: Task, sectionId: string): void {
    this.draggedTask = task;
    event.dataTransfer!.setData('text/plain', sectionId);
  }

  dropTask(event: DragEvent, sectionId: string): void {
    if (this.draggedTask) {
      const sourceSectionId = event.dataTransfer!.getData('text/plain');
      const sourceSection = this.sections.find((section) => section.id === sourceSectionId);
      const targetSection = this.sections.find((section) => section.id === sectionId);

      if (sourceSection && targetSection) {
        sourceSection.tasks = sourceSection.tasks.filter((task) => task.id !== this.draggedTask!.id);
        this.draggedTask.status = targetSection.id;
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