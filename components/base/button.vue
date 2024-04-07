<script lang="ts" setup>
import type { Classes } from '~/types';

const props = defineProps({
  title: { type: String, default: '' },
  outline: { type: Boolean, default: false },
  small: { type: Boolean, default: false },
});

const classes: ComputedRef<Classes> = computed(() => {
  return {
    'base-button--small': props.small,
    'base-button--outline': props.outline,
  };
});
</script>

<template>
  <button
    class="base-button"
    :class="classes"
  >
    <slot>
      {{ title }}
    </slot>
  </button>
</template>

<style lang="scss" scoped>
  .base-button {
    @include fx-center;
    padding: 12px 28px 16px;
    border-radius: 20px;

    font-size: $font-big-text;
    background: $gradient-light;

    &:hover {
      background: $gradient-dark;
      border-color: $gradient-dark;
    }

    &--outline {
      padding: 16px 32px 18px;
      border: 1px solid $color-grey-dark;
      background: transparent;
    }

    &--small {
      padding: 6px 12px 9px;
      border-radius: 10px;
      font-size: initial;
      background: $color-grey;

      &:hover {
        background: $color-main;
      }
    }
  }
</style>