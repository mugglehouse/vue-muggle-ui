<template>
  <!-- span可调的值为0-24，表示基于父容器的占比 -->
  <m-row>
    <m-col :span="12">
      <div class="a" />
    </m-col>
    <m-col :span="12">
      <div class="b" />
    </m-col>
  </m-row>

  <m-row>
    <m-col :span="8">
      <div class="a" />
    </m-col>
    <m-col :span="8">
      <div class="b" />
    </m-col>
    <m-col :span="8">
      <div class="a" />
    </m-col>
  </m-row>

  <m-row>
    <m-col :span="6">
      <div class="a" />
    </m-col>
    <m-col :span="6">
      <div class="b" />
    </m-col>
    <m-col :span="6">
      <div class="a" />
    </m-col>
    <m-col :span="6">
      <div class="b" />
    </m-col>
  </m-row>
</template>
