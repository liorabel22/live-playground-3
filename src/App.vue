<template>
  <div class="h-60">
    <PlayGround
      :languages="languages"
      :initial-codes="['<h1>Hello LIOR</h1>', 'h1 {color: green}']"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  props: {
    languages: { type: Array as () => string[], default: () => ['HTML', 'CSS'] },
  },
});
</script>

<style scoped></style>
