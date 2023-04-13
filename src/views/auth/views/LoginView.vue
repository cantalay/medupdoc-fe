<template>
    <el-row align="middle" justify="space-evenly" style="height: 100%">
        <div class="auth-window border rounded-md p-3 w-1/2 backdrop-blur-sm">
            <el-row justify="start" style="margin-bottom: 5vh">
                <el-col>
                    <p class="text-3xl antialiased hover:subpixel-antialiased p-3">Log In</p>
                </el-col>
                <el-col>
                    <p class="text-sm font-extralight antialiased hover:subpixel-antialiased p-3">Welcome to
                        Medupdoc! Manage appointments, records, and communication with ease. Say goodbye to outdated
                        methods and
                        hello to the future of healthcare management. Let's revolutionize your practice
                        together!</p>
                </el-col>
            </el-row>
            <el-row justify="center" style="margin-bottom: 3vh">
                <el-form
                        ref="ruleFromRef"
                        class="w-full p-6"
                        label-position="left"
                        label-width="150px"
                        :model="loginForm"
                        :rules="loginFormRules"
                        :inline-message="true"
                >
                    <el-col>
                        <el-form-item label="User name" prop="username" required>
                            <el-input v-model="loginForm.username"
                                      class="form-input"
                                      :prefix-icon="User"
                                      @keyup.enter="login"
                                      placeholder="User name"/>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="Password" prop="password" required>
                            <el-input v-model="loginForm.password"
                                      type="password"
                                      class="form-input"
                                      :prefix-icon="Lock"
                                      placeholder="Password"
                                      @keyup.enter="login"
                                      show-password/>
                        </el-form-item>
                    </el-col>

                </el-form>
            </el-row>
            <el-row justify="end" style="margin-bottom: 2vh">
                <el-button text
                           @click="$router.push('recovery')"> Forgot Password
                </el-button>
            </el-row>
            <el-divider class="border-opacity-20 border-blue-400"/>
            <div class="flex justify-center">
                <el-button class="auth-button" type="success"
                           @click="login">Log In
                </el-button>
            </div>

            <p class="text-center text-m font-extralight antialiased hover:subpixel-antialiased w-full p-6">Don't have
                account? &nbsp;<el-button text
                                          @click="$router.push('register')"
                                          class="auth-route-button"> Sign Up!
                </el-button>
            </p>
        </div>

    </el-row>


</template>

<script lang="ts" setup>

import {reactive, ref} from "vue";
import {useAuthService} from "@/service/auth.service";
import type {FormInstance, FormRules} from 'element-plus'
import {ElMessage} from "element-plus";
import {Lock, User} from "@element-plus/icons-vue";
import {useValidators} from "@/composables/use-validator.composable";
import {useLoading} from "@/composables/loading.composable";
import {useRouter} from "vue-router";

const loading = useLoading();
const router = useRouter();
const loginForm = reactive({
    username: '',
    password: '',
})
const authService = useAuthService();
const validator = useValidators();

const loginFormRules: FormRules = {
    username: [validator.username, validator.required
    ],
    password: [
        validator.required,
        validator.password
    ]
}
const ruleFromRef = ref<FormInstance>();

const login = async () => {
    ruleFromRef.value?.validate().then((valid) => {
        if (valid) {
            loading.startLoading("Logging in...");
            authService
                .login({
                    username: loginForm.username,
                    password: loginForm.password,
                })
                .then(() => {
                    router.push("/");
                    ElMessage({
                        message: "Congrats, successfully logged in.",
                        type: "success",
                    });
                })
                .catch(() => {
                    ElMessage.error({message: "Oops, login failed :("});
                }).finally(() => {
                loading.stopLoading();
            });
        }
    });
};
</script>

<style scoped>

</style>