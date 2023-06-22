<template>
   <div class="modal" v-if="show">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">{{ task.title }}</h3>
        <button class="modal-close" @click="closeModal">x</button>
      </div>
      <p class="modal-description">{{ task.description }}</p>
      <div class="modal-actions">
        <label for="status" class="modal-label">Status:</label>
        <select v-model="task.status" id="status" class="modal-dropdown" @change="updateTaskStatus(task.status)">
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button class="modal-delete" @click="deleteTask">Delete</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useMainStore } from '@/store';
import { Vue, Options } from 'vue-class-component';

@Options({
  name: 'Modal',
  props: {
    task: {
      default(){
        return {}
      },
      type: Object
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
})
export default class Modal extends Vue {
  task: any;
  show!: boolean;
  private store = useMainStore()

  closeModal(): void {
    this.$emit('close');
  }

  deleteTask(): void {
    this.$emit('delete');
  }

  updateTaskStatus(data: any) {
   this.store.updateTask({
    _id: this.task._id,
    status: data
   })
  }
}
</script>
<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.modal-title {
  font-size: 20px;
  font-weight: bold;
}

.modal-close {
  font-size: 18px;
  color: #999;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.modal-close:hover {
  color: #333;
}

.modal-description {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 16px;
}

.modal-actions {
  display: flex;
  align-items: center;
}

.modal-label {
  margin-right: 8px;
}

.modal-dropdown {
  padding: 8px;
  border-radius: 4px;
}

.modal-delete {
  margin-left: auto;
  padding: 8px 16px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-delete:hover {
  background-color: #ff7875;
}
</style>