<script setup lang="ts">
import type { Classes } from '~/types';

const { locale, localeCodes, setLocale } = useI18n();

const opened: Ref<boolean> = ref(false);

const currentLocale: ComputedRef<string> = computed(() => {
  return locale.value;
});
const avaliableLocales: ComputedRef<string[]> = computed(() => {  
  return localeCodes.value.filter(l => l !== locale.value);
});
const classes: ComputedRef<Classes> = computed(() => {
  return {
    'base-lang-switcher--active': opened.value,
  };
})

const toggleOpen = () => {
  opened.value = !opened.value;
};
const changeLocale = (locale: string) => {
  setLocale(locale);
  opened.value = false;
} 
</script>

<template>
<div
  class="base-lang-switcher"
  :class="classes"
>
  <button
    class="base-lang-switcher__open"
    @click="toggleOpen"  
  >
    {{ currentLocale }}
  </button>
  <transition name="dropdown">
    <div
      v-if="opened"
      class="base-lang-switcher__dropdown"
    >
      <button
        v-for="locale in avaliableLocales"
        :key="locale"
        class="base-lang-switcher__button"
        @click="changeLocale(locale)"
      >
        {{ locale }}
      </button>
    </div>
  </transition>
</div>
</template>

<style lang="scss" scoped>
.base-lang-switcher {
  position: relative;
  text-transform: uppercase;
  color: $color-grey-light;

  &__open {
    @include fx-center;
    width: 22px;
    height: 20px;
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    overflow: hidden;
    padding: 10px 0;

    transform: rotateX(0);
    transform-origin: top center;
  }

  &::after {
    content: '';
    position: relative;
    display: block;
    width: 100%;
    height: 2px;
    background: $color-grey-light;
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease-in-out;
}
.dropdown-enter-from,
.dropdown-leave-to {
  transform: rotateX(-90deg);
}
</style>