<template>
    <div class="modal" v-if="show">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">Add Task</h3>
        <button class="modal-close" @click="closeModal">x</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="title" class="form-label">Title:</label>
          <input v-model="title" id="title" class="form-input" type="text" required />
        </div>
        <div class="form-group">
          <label for="description" class="form-label">Description:</label>
          <textarea v-model="description" id="description" class="form-textarea" required></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="modal-button" @click="addTask">Add Task</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useMainStore } from '@/store';
import { Vue, Options } from 'vue-class-component';

@Options({
  name: 'AddTaskModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
})
export default class AddTaskModal extends Vue {
  show!: boolean;
  title: string = '';
  description: string = '';
  error:string =  '';
  private store = useMainStore()
  closeModal(): void {
    this.$emit('close');
  }

  async addTask(): Promise<void> {
    try{
      if (!this.title ||  !this.description) {
        throw new Error('missing required fields')
      }
        const newTask = {
          title: this.title,
          description: this.description,
          userId: this.store.auth._id,
          status: "todo" as any
        };
        
        await this.store.createTask(newTask)
        
        this.closeModal()
    }catch(error:any){
      if(error.message){
        this.error  = error.message
      } else if(typeof error.errors[0] === 'string'){
        this.error = error.errors[0]
      }else if(error.errors[0] && error.errors[0].msg){
        this.error = error.errors[0].msg
      }
    }
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

.modal-body {
  margin-bottom: 16px;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  font-size: 16px;
  margin-bottom: 4px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 14px;
  resize: vertical;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.modal-button {
  padding: 8px 16px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-button:hover {
  background-color: #40a9ff;
}
</style>