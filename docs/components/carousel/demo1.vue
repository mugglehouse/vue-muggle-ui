<script setup>
</script>

<template>
  <div style="width: 100%">
    <m-carousel direction="next" style="height: 260px">
      <m-carousel-item>1</m-carousel-item>
      <m-carousel-item>2</m-carousel-item>
      <m-carousel-item>3</m-carousel-item>
      <m-carousel-item>4</m-carousel-item>
    </m-carousel>
    <br>
    <m-carousel direction="pre" style="height: 260px">
      <m-carousel-item>1</m-carousel-item>
      <m-carousel-item>2</m-carousel-item>
      <m-carousel-item>3</m-carousel-item>
      <m-carousel-item>4</m-carousel-item>
    </m-carousel>
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
