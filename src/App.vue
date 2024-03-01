<template>
  <PlayGround
    :languages="languages"
    :initial-codes="['<h1>Hello LIOR</h1>', 'h1 {color: blue}']"
  />
</template>

<script lang="ts">
import PlayGround from '@/components/PlayGround.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    PlayGround,
  },
  props: {
    languages: { type: Array as () => string[], default: () => ['HTML', 'CSS'] },
  },
});
</script>

<style scoped></style>
