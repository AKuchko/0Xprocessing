<template>
  <div class="default">
    <base-header />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.default {
  width: 100vw;
  height: 100vh;
  padding: 40px 120px;
  color: $color-contrast;
  background: $color-bg;
}
</style>

