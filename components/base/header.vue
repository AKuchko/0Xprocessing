<script setup lang="ts">
const { rt } = useI18n();
const localeKey = 'header';

const transformList = (locale: string) => {
  rt(`${locale}.list`).forEach(element => { // нужно поменять на tm и разобраться с ошибкой ts
    
  });;
}
</script>

<template>
  <header class="base-header">
    <base-logo class="base-header_logo" />
    <p>{{ $t('header.list[0]') }}</p>
  </header>
</template>
