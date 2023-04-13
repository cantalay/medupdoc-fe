import type {RouteRecordRaw} from "vue-router";
import AuthView from "@/views/auth/AuthView.vue";
import LoginView from "@/views/auth/views/LoginView.vue";
import RegisterView from "@/views/auth/views/RegisterView.vue";
import {useAuthStore} from "@/stores/user-store";
import PasswordRecovery from "@/views/auth/views/PasswordRecovery.vue";

export const authRoutes: RouteRecordRaw[] = [
    {
        path: '/auth',
        name: 'auth',
        component: AuthView,
        children: [
            {
                path: 'login',
                name: 'login',
                component: LoginView
            },
            {
                path: 'register',
                name: 'register',
                component: RegisterView
            },
            {
                path: 'recovery',
                name: 'recovery',
                component: () => PasswordRecovery
            }
        ],
        beforeEnter: (to, from, next) => {
            const authStore = useAuthStore();
            if (authStore.user) {
                next('/');
            } else {
                next();
            }
        }
    }
]