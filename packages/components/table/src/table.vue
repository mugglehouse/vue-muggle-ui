<script setup>
import { Props } from './table'

defineProps(Props)
</script>

<template>
  <div class="m-table">
    <!-- 列表头 -->
    <div class="m-table__header--wrapper">
      <table class="m-table__header">
        <thead>
          <tr class="m-table__row">
            <!-- column[{}]: key列标识 label列名 width列宽 align居中方式  -->
            <th
              v-for="th in column"
              :key="`${th.key}_th`"
              class="m-tbale__column"
              :style="{
                width: th.width ? `${th.width}px` : '',
                flex: th.width ? 'none' : 1,
                textAlign: th.align || 'left',
              }"
            >
              {{ th.label }}
            </th>
            <th v-if="height" style="width: 8px" /> <!-- 表格滚动条 -->
          </tr>
        </thead>
      </table>
    </div>
    <!-- 行数据 -->
    <div class="m-table__body--wrapper" :style="{ height: `${height}px` }">
      <table class="m-table__body">
        <tbody>
          <!-- data[{}]: key对应column的列标识key -->
          <tr
            v-for="(tr, index) in data"
            :key="`${index}_tb`"
            class="m-table__row"
            :class="{ 'm-table__row--stripe': stripe && index % 2 }"
          >
            <td
              v-for="(th) in column"
              :key="`${th.key}_td`"
              class="m-tbale__column"
              :style="{
                width: th.width ? `${th.width}px` : '',
                flex: th.width ? 'none' : 1,
                textAlign: th.align || 'left',
              }"
            >
              <!-- 具名作用域插槽,name为列名,:row为子传父,传出每一条行数据 -->
              <slot :name="th.key" :row="tr">
                <!-- 如果无插槽内容,默认显示 -->
                {{ tr[th.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>
