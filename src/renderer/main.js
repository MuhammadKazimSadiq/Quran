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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "bg-gray-200 dark:bg-gray-700",
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

import VueVirtualScroller from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import { useNotification } from "./composables/notification";
import i18n from "./i18n";

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);

// Global Error Handler
app.config.errorHandler = (err, instance, info) => {
  console.error("Global Error:", err, info);
  let message = err?.message || "An unexpected error occurred.";
  useNotification(message, { type: "error", timeout: 5000 });
};
app.use(VueVirtualScroller);
app.use(i18n);
app.provide("emitter", emitter);
app.mount("#app");
