import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import {useAuthStore} from "@/stores/user-store";
import {authRoutes} from "@/router/auth-routes";
import NotFoundView from "@/views/NotFoundView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            beforeEnter: (to, from, next) => {
                const authStore = useAuthStore();
                if (authStore.user) {
                    next();
                } else {
                    next('auth/login');
                }
            }
        }, ...authRoutes,
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundView
        }
    ]
})

export default router
