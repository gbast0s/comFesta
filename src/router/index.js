import { createRouter, createWebHistory } from "vue-router"

import Home from "../components/Home.vue"
import Login from "../components/auth/Login.vue"
import Dashboard from "../components/Dashboard.vue"
import NotFound from "../components/NotFound.vue"

const routes = [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
    },
    { 
        path: "/:catchAll(.*)", 
        component: NotFound 
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router