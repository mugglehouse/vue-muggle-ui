<script setup>
</script>

<template>
  <div style="width: 100%; height: 300px;">
    <m-carousel interval="1000">
      <m-carousel-item>1</m-carousel-item>
      <m-carousel-item>2</m-carousel-item>
      <m-carousel-item>3</m-carousel-item>
      <m-carousel-item>4</m-carousel-item>
    </m-carousel>
    <br>
  </div>
</template>

<style lang="less" scoped>
.m-carousel {
  .m-carousel-item {
    line-height: 260px;
    font-size: 18px;
    text-align: center;
  }
  .m-carousel-item:nth-child(2n) {
    background-color: #80aba1;
  }
  .m-carousel-item:nth-child(2n + 1) {
    background-color: #8393b9;
  }
}
</style>
