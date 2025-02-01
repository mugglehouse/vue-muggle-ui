<template>
  <div style="width: 500px; margin: 0 auto">
    <div style="display: flex; justify-content: center; gap: 20px">
      <m-tooltip content="我是文字提示" placement="top-start">
        <m-button type="primary" plain size="mini">
          top-start
        </m-button>
      </m-tooltip>
      <m-tooltip content="我是文字提示" placement="top">
        <m-button type="primary" plain size="mini">
          top
        </m-button>
      </m-tooltip>
      <m-tooltip content="我是文字提示" placement="top-end">
        <m-button type="primary" plain size="mini">
          top-end
        </m-button>
      </m-tooltip>
    </div>
    <div
      class="row"
      style="display: flex; justify-content: space-between; margin: 10px 0"
    >
      <m-tooltip content="我是文字提示" placement="left-start">
        <m-button type="primary" plain size="mini">
          left-start
        </m-button>
      </m-tooltip>
      <m-tooltip content="我是文字提示" placement="right-start">
        <m-button type="primary" plain size="mini">
          right-start
        </m-button>
      </m-tooltip>
    </div>
    <div
      class="row"
      style="display: flex; justify-content: space-between; margin: 10px 0"
    >
      <m-tooltip content="我是文字提示" placement="left">
        <m-button type="primary" plain size="mini">
          left
        </m-button>
      </m-tooltip>
      <m-tooltip content="我是文字提示" placement="right">
        <m-button type="primary" plain size="mini">
          right
        </m-button>
      </m-tooltip>
    </div>
    <div
      class="row"
      style="display: flex; justify-content: space-between; margin: 10px 0"
    >
      <m-tooltip content="我是文字提示" placement="left-end">
        <m-button type="primary" plain size="mini">
          left-end
        </m-button>
      </m-tooltip>
      <m-tooltip content="我是文字提示" placement="right-end">
        <m-button type="primary" plain size="mini">
          right-end
        </m-button>
      </m-tooltip>
    </div>
    <div
      class="row"
      style="display: flex; justify-content: center; gap: 20px; margin: 10px 0"
    >
      <m-tooltip content="我是文字提示" placement="bottom-start">
        <m-button type="primary" plain size="mini">
          bottom-start
        </m-button>
      </m-tooltip>
      <m-tooltip content="我是文字提示" placement="bottom">
        <m-button type="primary" plain size="mini">
          bottom
        </m-button>
      </m-tooltip>
      <m-tooltip content="我是文字提示" placement="bottom-end">
        <m-button type="primary" plain size="mini">
          bottom-end
        </m-button>
      </m-tooltip>
    </div>
  </div>
</template>
