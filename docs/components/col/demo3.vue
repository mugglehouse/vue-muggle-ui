<template>
  <!-- justify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly' 水平对齐方式 -->
  <m-row justify="start">
    <m-col :span="4">
      <div class="a" />
    </m-col>
    <m-col :span="6">
      <div class="b" />
    </m-col>
    <m-col :span="4">
      <div class="a" />
    </m-col>
  </m-row>

  <m-row justify="center">
    <m-col :span="4">
      <div class="a" />
    </m-col>
    <m-col :span="6">
      <div class="b" />
    </m-col>
    <m-col :span="4">
      <div class="a" />
    </m-col>
  </m-row>

  <m-row justify="end">
    <m-col :span="4">
      <div class="a" />
    </m-col>
    <m-col :span="6">
      <div class="b" />
    </m-col>
    <m-col :span="4">
      <div class="a" />
    </m-col>
  </m-row>

  <m-row justify="space-around">
    <m-col :span="4">
      <div class="a" />
    </m-col>
    <m-col :span="6">
      <div class="b" />
    </m-col>
    <m-col :span="4">
      <div class="a" />
    </m-col>
  </m-row>

  <m-row justify="space-between">
    <m-col :span="4">
      <div class="a" />
    </m-col>
    <m-col :span="6">
      <div class="b" />
    </m-col>
    <m-col :span="4">
      <div class="a" />
    </m-col>
  </m-row>

  <m-row justify="space-evenly">
    <m-col :span="4">
      <div class="a" />
    </m-col>
    <m-col :span="6">
      <div class="b" />
    </m-col>
    <m-col :span="4">
      <div class="a" />
    </m-col>
  </m-row>
</template>
