<template>
  <h1 class="text-3xl font-bold underline text-blue-500">
    Tailwind
  </h1>

  <ul>
    <li v-for="user in users">{{ user.name }}</li>
  </ul>

  <router-link to="/">Home</router-link>
  <router-link to="/about">About</router-link>
  <router-view></router-view>
</template>


<script setup>
import { useStore } from './store/useStore'
import {ref, onMounted} from 'vue'
import { storeToRefs } from 'pinia'

const store = useStore()
const {users} = storeToRefs(store)
const {getUsers} = store

onMounted(() => {
  getUsers()
})
</script>
