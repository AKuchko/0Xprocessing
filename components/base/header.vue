<script setup lang="ts">
import type { LocaleItem, LocaleKey, LocaledItem } from '~/types';

const { transformLocaleItems } = useLocale();
const { locale } = useI18n();

const localeKey: LocaleKey = 'header';

const headerList: ComputedRef<LocaleItem[]> = computed(() => {
  return [
    { value: 'feature', link: '/feature' },
    { value: 'advantages', link: '/advantages' },
    { value: 'support', link: '/support' },
    { value: 'integration', link: '/integration' },
    ...( locale.value !== 'ru'
      ? [
          { value: 'fees', link: '/fees' },
          { value: 'business', link: '/business' },
          { value: 'gambling', link: '/gambling' },
        ]
      : []
    ),
    { value: 'contacts', link: '/contacts' },
  ];
});
const headerItems: ComputedRef<LocaledItem[]> = computed(() => {
  return transformLocaleItems(headerList.value, localeKey);
});
</script>

<template>
  <header class="base-header">
    <base-logo class="base-header_logo" />
    <nav class="base-header__navigation">
      <nuxt-link
        v-for="item in headerItems"
        :key="item.link"
        class="base-header__link"
        :to="item.link"
      >
        {{ item.title }}
      </nuxt-link>
    </nav>
    <div class="base-header__actions">
      <base-button
        :title="$t('base.signIn')"
        small
      />
      <base-lang-switcher />
    </div>
  </header>
</template>

<style lang="scss" scoped>
  .base-header {
    display: grid;
    grid-template-columns: 0.5fr 1fr 0.2fr;


    &__navigation {
      @include fx-row;
      gap: 20px;
    }

    &__link {
      position: relative;
      font-size: $font-xs;
      color: $color-grey;

      &::first-letter {
        text-transform: capitalize;
      }

      &::after {
        content: '';
        position: absolute;
        top: calc(100% + 5px);
        left: 50%;
        width: 0;
        height: 1px;
        transform: translateX(-50%);
        background: $color-grey;
        transition: width 0.2s ease-in-out;
      }

      &:hover {
        &::after {
          width: 100%;
        }
      }
    }

    &__actions {
      @include fx-row;
      justify-content: flex-end;
      gap: 18px;
    }
  }
</style>
