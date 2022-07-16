import { defineStore } from 'pinia'
import { ipcRenderer } from '../electron'

export const useStore = defineStore("main", {
  state: () => ({
    users: []
   }),

   getters: {

   },

   actions: {
      async getUsers() {
          ipcRenderer.send('request', 'SELECT * FROM users')
          ipcRenderer.receive('response', (users) => this.users = users)
      }
   }
})