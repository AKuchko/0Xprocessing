<template>
  <h1>Hello</h1>
  <button id="specialButton">
    <img style="cursor:pointer;" src="https://lidrekon.ru/images/special.png" />
  </button>
  <base-field
    placeholder="Test"
  />
  <p id="toggle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident sed porro quod eaque doloremque impedit iusto molestias labore nihil illum fugiat accusantium expedita repellendus eius repellat nobis, fugit alias totam.</p>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  document.querySelector('#toggle').addEventListener('click', (event) => {
    event.target.slideToggle();
  });
})
</script>
