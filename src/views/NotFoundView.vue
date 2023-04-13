<template>
    <div class="not-found-view">
        <el-row align="middle" justify="center">

            <el-image src="/src/assets/404_notfound.png"/>
        </el-row>
        <el-row align="middle" justify="center">
            <el-button class="auth-button m-6" type="success"
                       @click="$router.push('/')">Go to home
            </el-button>
        </el-row>
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>

</style>