<script setup>
const model = defineModel();
const props = defineProps({
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
});

const onInput = (event) => {
  console.info(event);
}
</script>

<template>
  <div class="base-field">
    <input
      v-model="model"
      class="base-field__control"
      :type="type"
      :placeholder="placeholder"
      @input="onInput"
    >
  </div>
</template>

<style lang="scss">
.base-field {
  border-bottom: 1px solid $color-grey-dark;
  background: $color-grey-control;

  &__control {
    width: 100%;
    padding: 16px 30px;
    background: transparent;
  }
}
</style>