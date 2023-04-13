<template>
    <el-row align="middle" justify="space-evenly" style="height: 100%">
        <div class="auth-window border rounded-md p-3 w-1/2 backdrop-blur-sm">
            <el-col justify="start" style="margin-bottom: 5vh">
                <p class="text-3xl antialiased hover:subpixel-antialiased p-3">Create Account</p>
                <p class="text-sm font-extralight antialiased hover:subpixel-antialiased p-3">Streamline your
                    medical practice
                    with ease and efficiency by registering with Medupdoc today!</p>
            </el-col>
            <el-row justify="center" style="margin-bottom: 3vh">
                <el-form
                        ref="refRegisterForm"
                        label-position="left"
                        label-width="150px"
                        :rules="registerFormRules"
                        :model="registerForm"
                        :inline-message="true"
                >

                    <el-form-item label="Email" prop="email">
                        <el-input v-model="registerForm.email"
                                  class="form-input"
                                  :prefix-icon="Message"
                                  @keyup.enter="register"
                                  placeholder="Email"/>
                    </el-form-item>
                    <el-form-item label="User name" prop="username" required>
                        <el-input v-model="registerForm.username"
                                  class="form-input"
                                  :prefix-icon="User"
                                  @keyup.enter="register"
                                  placeholder="User name"/>
                    </el-form-item>
                    <el-form-item label="Phone" prop="phone" required>
                        <el-select
                                class="country-select"
                                v-model="registerForm.phoneCountry"
                                placeholder="Country" filterable>
                            <el-option
                                    v-for="item in country"
                                    :key="CountryPhoneCode[item]"
                                    :label="item + CountryPhoneCode[item]"
                                    :value="CountryPhoneCode[item]">
                                <el-row justify="space-between" style="width: 200px">
                                    <div>
                                        {{ item }}
                                    </div>
                                    <div>
                                        {{ CountryPhoneCode[item] }}
                                    </div>

                                </el-row>
                            </el-option>
                        </el-select>
                        <el-input v-model="registerForm.phone"
                                  class="form-input"
                                  style="max-width: calc(100% - 30%)"
                                  :prefix-icon="Phone"
                                  @input="registerForm.phone = registerForm.phone.replace(/[^0-9]/g, '')"
                                  placeholder="Phone"/>

                    </el-form-item>
                    <el-form-item label="Password" prop="password" required>
                        <el-input v-model="registerForm.password"
                                  class="form-input"
                                  :prefix-icon="Lock"
                                  @keyup.enter="register"
                                  placeholder="Password"
                                  show-password/>
                    </el-form-item>
                    <el-form-item label="Password again" prop="passwordAgain" required>
                        <el-input v-model="registerForm.passwordAgain"
                                  class="form-input"
                                  placeholder="Password again"
                                  :prefix-icon="Lock"
                                  @keyup.enter="register"
                                  show-password/>
                    </el-form-item>
                    <el-divider class="border-opacity-20 border-blue-400"/>
                    <el-col class="terms-conditions">
                        <el-form-item prop="termsConditions" required>
                            <el-checkbox v-model="registerForm.termsConditions">
                                I've read and accept
                            </el-checkbox>
                            <el-button @click="termsAndConditionsModalVisible = true" text>
                                Terms&Conditions
                            </el-button>
                        </el-form-item>
                        <div>
                            <el-checkbox label="Subscribe the newsletters to stay up to date"/>
                        </div>
                    </el-col>
                </el-form>
            </el-row>
            <div class="flex justify-end">
                <el-button class="auth-button" type="success" @click="register">
                    Register
                </el-button>
            </div>
            <p class="text-center text-m font-extralight antialiased hover:subpixel-antialiased w-full p-6">Already
                have an
                account? &nbsp;<el-button text
                                          @click="$router.push('login')"
                                          class="auth-route-button"> Sign In!
                </el-button>
            </p>
        </div>
    </el-row>

    <TermsConditionsModal :state="termsAndConditionsModalVisible" @confirm="termsConfirm"
                          @close="termsAndConditionsModalVisible=false"/>

</template>

<script lang="ts" setup>

import {reactive, ref} from "vue";
import {Lock, Message, Phone, User} from "@element-plus/icons-vue";
import type {FormInstance, FormRules} from 'element-plus';
import { ElMessage } from "element-plus";
import {useValidators} from "@/composables/use-validator.composable";
import {useAuthService} from "@/service/auth.service";
import { useLoading } from "@/composables/loading.composable";
import {CountryPhoneCode} from "@/interface/model/countries";
import {isValidPhoneNumber} from "libphonenumber-js";
import TermsConditionsModal from "@/views/auth/components/TermsConditionsModal.vue";
import {useRouter} from "vue-router";
const authService = useAuthService();
const loading = useLoading();
const router = useRouter();
const country = ref<string[]>(Object.keys(CountryPhoneCode));
const registerForm = reactive({
    'username': '',
    'password': '',
    'passwordAgain': '',
    'email': '',
    'phone': '',
    'phoneCountry': '',
    'termsConditions': false
});

const validator = useValidators();

const termsAndConditionsModalVisible = ref(false)
const termsConfirm = () => {
    registerForm.termsConditions = true
    termsAndConditionsModalVisible.value = false
}
const registerFormRules: FormRules = {
    username: [validator.username, validator.required
    ],
    password: [
        validator.required,
        validator.password
    ],
    email: [
        validator.email
    ],
    termsConditions: [validator.termsConditions],
    phone: [validator.phone, {
        validator: (rule, value, callback) => {
            if (registerForm.phoneCountry === '') {
                callback(new Error('Please select the country code'));
            } else if (!isValidPhoneNumber(registerForm.phoneCountry + value)) {
                callback(new Error('The phone number is not valid.'));
            } else {
                callback();
            }
        },
        trigger: 'blur',
    }
    ],
    passwordAgain: [
        validator.required,
        validator.password, {
            validator: (rule, value, callback) => {
                if (value !== registerForm.password) {
                    callback(new Error('The two passwords do not match'));
                } else {
                    callback();
                }
            },
            trigger: 'blur',
        }
    ]
}
const refRegisterForm = ref<FormInstance>();
const register = () => {
    console.log(refRegisterForm.value)
    refRegisterForm.value?.validate((valid) => {
        if (valid) {
            loading.startLoading('Registering...')
            authService.register({
                username: registerForm.username,
                password: registerForm.password,
                email: registerForm.email ? registerForm.email : undefined,
                phone: registerForm.phoneCountry + registerForm.phone
            }).then(() => {
                router.push('login');
                ElMessage.success('Register successfully');
            }).catch(() => {
                ElMessage.error('Register failed');
            }).finally(() => {
                loading.stopLoading()
            });
        } else {
            return false;
        }
    });
}
</script>

<style>

.auth-route-button {
    margin-bottom: 4px;
    color: var(--primary-color);
}

.auth-button.el-button {
    min-width: 10rem;
    background-color: transparent !important;
    border-color: var(--primary-color);
    --el-button-text-color: var(--primary-color);
}

.country-select {
    --el-component-size: 25px;
    max-width: 30%;
    --el-fill-color-blank: #0000;
    padding-right: 10px;
}

.auth-window {
    border-color: var(--primary-color);
    max-width: 700px;
    min-width: 400px
}

.auth-button.el-button:focus, .auth-button.el-button:hover {
    background-color: var(--primary-color) !important;
}

.form-input.el-input {
    height: 25px;
    --el-input-border-color: #93939391;
    --el-input-bg-color: #0000;
    --el-input-focus-border-color: var(--primary-color);
}

.terms-conditions .el-form-item__content {
    margin-left: 0 !important;
}

</style>