import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./index.css";

import mitt from "mitt";
const emitter = mitt();

const routes = [
  { path: "/", name: "Home", component: () => import("./views/Home.vue") },
  {
    path: "/read/:id",
    name: "Read",
    component: () => import("./views/Read.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("./views/Search.vue"),
  },
  {
    path: "/bookmarks",
    name: "Bookmarks",
    component: () => import("./views/Bookmarks.vue"),
  },
  {
    path: "/topics",
    component: () => import("./views/Topics.vue"),
    children: [
      {
        path: "",
        name: "ParentTopics",
        component: () => import("./views/ParentTopics.vue"),
      },
      {
        path: ":id",
        name: "ChildTopic",
        component: () => import("./views/ChildTopic.vue"),
      },
    ],
  },
  {
    path: "/vocabulary",
    name: "Vocabulary",
    component: () => import("./views/Vocabulary.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("./views/Settings.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("./views/Test.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "bg-gray-200 dark:bg-gray-700",
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(pinia);
app.provide("emitter", emitter);
app.mount("#app");
