<template>
  <el-dialog
      v-model="centerDialogVisible"
      title="Terms and Conditions"
      width="50%"
      destroy-on-close
      center
  >
    <el-scrollbar height="400px">
      <span class="subpixel-antialiased text-justify p-6">
        Welcome to Medupdoc! These terms and conditions (“Terms”) govern your use of our digital assistant application
        and related services (“Service”). Please read these Terms carefully before using our Service. By using our
        Service, you agree to be bound by these Terms. If you do not agree to these Terms, do not use our Service.

      <div class="text-lg">Use of the Service</div>
      Our Service is intended to streamline medical appointments, reports,
      and patient data for medical professionals and patients.
      You may use our Service only for its intended purpose and in compliance
      with these Terms and all applicable laws and regulations. You must not use our
      Service to engage in any unlawful activity or to infringe the rights of Medupdoc
      or any third party.

      <div class="text-lg">User Accounts</div>
      In order to use our Service, you may be required to create an account.
      You are responsible for maintaining the confidentiality of your account and password,
      and for all activities that occur under your account. You must notify us immediately of
      any unauthorized use of your account or any other breach of security.

      <div class="text-lg">Intellectual Property</div>
      Our Service and all content and materials available through the Service are owned by
      Medupdoc or its licensors, and are protected by copyright, trademark, and other
      intellectual property laws. You may not use our Service or any content or materials
      available through the Service for any commercial purpose without our express written consent.

      <div class="text-lg">Limitation of Liability</div>
      Our Service is provided on an “as is” and “as available” basis,
      and we make no warranties or representations with respect to the Service.
      To the extent permitted by law, we disclaim all liability for any direct, indirect,
      incidental, or consequential damages arising out of or in connection with the
      use of our Service.

      <div class="text-lg">Privacy Policy</div>
      We respect your privacy and are committed to protecting your personal information.
      Please see our Privacy Policy for information about how we collect, use, and disclose
      your personal information.

      <div class="text-lg">Changes to these Terms</div>

      We reserve the right to modify these Terms at any time.
      You should review these Terms periodically for changes.
      By continuing to use our Service after we modify these Terms,
      you agree to be bound by the modified Terms.


      <div class="text-lg">Support</div>
      If you need assistance with our Service, please contact our support team at support@medupdoc.com.
      We will make reasonable efforts to assist you with any issues or concerns you may have.

      <div class="text-lg">Governing Law and Jurisdiction</div>
      These Terms and your use of our Service will be governed by and construed in accordance
      with the laws of the jurisdiction where Medupdoc is located, without giving effect to
      any principles of conflicts of law. Any legal action or proceeding arising out of or
      in connection with these Terms or our Service will be brought in the courts of the
      jurisdiction where Medupdoc is located.

      If you have any questions about these Terms, please contact us at support@medupdoc.com.
      </span>
    </el-scrollbar>


    <template #footer>
      <span class="dialog-footer">
        <el-button type="info" @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="success" @click="$emit('confirm')">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>

import {ref, watch} from "vue";

const props = defineProps({
  state: {
    type: Boolean,
    default: false,
  },
});

const centerDialogVisible = ref<boolean>(props.state)

watch(props, () => {
  centerDialogVisible.value = props.state;
})

</script>

<style scoped>

</style>