import { login, register } from "@/api";
import { Item, User } from "@/types";
import { defineStore } from "pinia";

export type RootState = {
  items: Item[];
  user: User | null;
  token: string | null;       
};

export const useMainStore = defineStore({
  id: "mainStore",
  state: () =>
    ({
      items: [],
      user: null,
      token: null,
    } as RootState),

  actions: {
    async login(email: string, password: string) {
        //api call
        const data = await login(email, password);
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem("token", data.token)
        return data
    },
    async register(email: string, password: string) {
        //api call
        return await register(email, password);
    },


  },
});