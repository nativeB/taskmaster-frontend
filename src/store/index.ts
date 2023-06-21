import { createTask, getTasks, login, register } from "@/api";
import { Task, User } from "@/types";
import { defineStore } from "pinia";

export type RootState = {
  tasks: Task[];
  user: User | null;
  token: string | null;  
  auth: any     
};

export const useMainStore = defineStore({
  id: "mainStore",
  state: () =>
    ({
      items: [],
      user: null,
      token: null,
      tasks: [],
      auth: null
    } as RootState),

 getters: {
    sections(state){
        const todo = state.tasks.filter(task=>task.status === 'todo')
        const inProgress = state.tasks.filter(task=>task.status === 'inProgress')
        const done = state.tasks.filter(task=>task.status === 'done')
        // { id: 1, title: 'Task 1', status: 'todo' }
        return [
            {
              id: 'todo',
              title: 'Todo',
              tasks: todo,
            },
            {
              id: 'inProgress',
              title: 'In Progress',
              tasks: inProgress,
            },
            {
              id: 'done',
              title: 'Done',
              tasks: done,
            },
          ];
    }
 },
  actions: {
    async login(email: string, password: string) {
        //api call
        const data = await login(email, password);
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem("token", data.token)
        return data
    },
    async setAuth(auth:any){
        this.auth = auth
    },
    async register(email: string, password: string) {
        //api call
        return await register(email, password);
    },

    async getTasks(){
        const data = await getTasks()
        this.tasks = data.tasks 
    },
    async createTask (task: Task) {
        const data = await createTask(task)
        console.log('heee')
        this.tasks.push(data)
    }
  },
});