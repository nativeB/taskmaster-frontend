<template>
  <div class="flex justify-center items-center h-screen w-screen">
    <div class="bg-white rounded shadow p-8">
      <div class="flex justify-center mb-6">
        <button
          :class="{'bg-blue-500 text-white': activeTab === 'login', 'bg-gray-200': activeTab !== 'login'}"
          class="py-2 px-4 rounded-l focus:outline-none"
          @click="setActiveTab('login')"
        >
          Login
        </button>
        <button
          :class="{'bg-blue-500 text-white': activeTab === 'signup', 'bg-gray-200': activeTab !== 'signup'}"
          class="py-2 px-4 rounded-r focus:outline-none"
          @click="setActiveTab('signup')"
        >
          Signup
        </button>
      </div>

      <div v-if="activeTab === 'login'">
        <span v-if="error" class="text-red-500 text-sm"> {{ error }}</span>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              id="email"
              v-model="email"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div class="mb-6">
            <label for="password" class="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div class="flex justify-end">
            <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none">
              Login
            </button>
          </div>
        </form>
      </div>

      <div v-if="activeTab === 'signup'">
        
        <span v-if="error" class="text-red-500 text-sm"> {{ error }}</span>
        <form @submit.prevent="register">
          <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div class="mb-4">
            <label for="confirmPassword" class="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div class="flex justify-end">
            <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useMainStore } from '@/store';
import { Vue } from 'vue-class-component';
import { useRouter } from 'vue-router';

export default class LoginPage extends Vue {
  activeTab: string = 'login';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  error: string = '';

  private store = useMainStore();
  private router = useRouter();
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  async login(): Promise<void> {
    try{
      await this.store.login(this.email, this.password);
      this.router.push('/');
    } catch (error:any) {
      const message = typeof error.errors[0] === 'string'? error.errors[0] : error.errors[0].msg;
      this.error = message;
    }

  }

  async register(): Promise<void> {
    try{
      await this.store.register(this.email, this.password, this.confirmPassword);
      this.activeTab = 'login';
      this.error = '';
    } catch (error:any) {
      console.log(error)
      const message = typeof error.errors[0] === 'string'? error.errors[0] : error.errors[0].msg;
      this.error = message;
    }
  }
}
</script>

<style scoped>
button:focus {
  outline: none;
}
</style>
