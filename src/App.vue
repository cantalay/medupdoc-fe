

<template>
  <el-row justify="center">
    <el-col :span="24">
      <el-container>
        <el-header class="drop-shadow-sm"  style="background: #f9f9f9;">
          <div class="medupdoc-icon">
          <el-image src="/src/assets/logo_transparent.png" style="width: 270px; height: 40px"></el-image>
          </div>
        </el-header>
        <el-main>
            <RouterView/>
        </el-main>
      </el-container>

    </el-col>
    <el-col :span="0">
      <el-carousel class="h-full w-full" height="100%" style="background: #00bfff">
        <el-carousel-item class="flex justify-center items-center" >
          <el-image src="/src/assets/womandoctor.png"></el-image>
        </el-carousel-item>
        <el-carousel-item class="flex justify-center items-center" >
          <el-image src="/src/assets/doctorhome.png"></el-image>
        </el-carousel-item>
      </el-carousel>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">

</script>

<style>
.el-main {
  height: calc(100vh - 40px);
  background-image: url("/src/assets/background.png");
}
.el-header {
  --el-header-height: 40px;
}

.medupdoc-icon {
  width: 24px;
  height: 24px;
  display: inline-block;
}
</style>
