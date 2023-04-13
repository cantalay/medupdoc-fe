<template>
    <el-row align="middle" justify="space-evenly" style="height: 100%">
        <div class="auth-window border rounded-md p-3 w-1/2 backdrop-blur-sm">
            <el-col>
                <el-row justify="start" style="margin-bottom: 5vh">
                    <el-col>
                        <p class="text-3xl antialiased hover:subpixel-antialiased p-3">Password Recovery</p>
                    </el-col>
                    <el-col>
                        <p class="text-sm font-extralight antialiased hover:subpixel-antialiased p-3">
                            If you have misplaced your password, we can assist you in resetting it. Please provide the
                            username you used to register for MedUpDoc and we will send you instructions on how to
                            reset your password.</p>
                    </el-col>
                </el-row>
                <el-row justify="center" style="margin-bottom: 3vh">
                    <el-col>
                        <el-form
                                ref="recoveryRuleFormRef"
                                label-position="left"
                                label-width="150px"
                                :model="recoveryForm"
                                :rules="recoveryFormRules"
                                :inline-message="true"
                        >
                            <el-form-item label="User name" prop="username" required>
                                <el-input v-model="recoveryForm.username"
                                          class="form-input"
                                          :prefix-icon="User"
                                          @keyup.enter="sendRecoveryMail"
                                          placeholder="User name"/>
                            </el-form-item>
                        </el-form>
                    </el-col>

                </el-row>
                <el-divider class="border-opacity-20 border-blue-400"/>
                <div class="flex justify-end">
                    <el-button class="auth-button" type="success"
                               @click="sendRecoveryMail">Reset my password
                    </el-button>
                </div>
                <div class="flex justify-center pt-6">
                    <el-button text
                               @click="$router.push('login')"> Back to login
                    </el-button>
                </div>
            </el-col>

        </div>

    </el-row>


</template>

<script lang="ts" setup>

import {reactive, ref} from "vue";
import {useAuthService} from "@/service/auth.service";
import type {FormInstance, FormRules} from 'element-plus'
import {ElMessage} from "element-plus";
import {User} from "@element-plus/icons-vue";
import {useValidators} from "@/composables/use-validator.composable";
import { useLoading } from "@/composables/loading.composable";

const recoveryForm = reactive({
    username: '',
})

const authService = useAuthService();
const validator = useValidators();
const loading = useLoading();

const recoveryFormRules: FormRules = {
    username: [validator.username, validator.required
    ],
}
const recoveryRuleFormRef = ref<FormInstance>();

const sendRecoveryMail = async () => {
    recoveryRuleFormRef.value?.validate().then((valid) => {
        if (valid) {
            loading.startLoading('Mail sending...')
            authService
                .recovery(recoveryForm.username,
                )
                .then(() => {
                    ElMessage({
                        message: "Congrats, successfully send instructions.",
                        type: "success",
                    });
                })
                .catch(() => {
                    ElMessage.error({message: "Oops, username not found :("});
                }).finally(() => {
                loading.stopLoading();
            });
        }
    });
};
</script>

<style scoped>


</style>