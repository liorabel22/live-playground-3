<template>
  <div class="h-60">
    <button @click="changeTheme">Change Theme</button>
    <PlayGround
      :languages="props.languages"
      :initial-codes="['<h1>Hello LIOR</h1>', 'h1 {color: green}']"
      :theme="theme"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'App',
  props: {
    languages: { type: Array as () => string[], default: () => ['HTML', 'CSS'] },
  },
  setup(props) {
    const theme = ref('dark');

    const changeTheme = () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark';
      console.log(theme.value);
    };

    return {
      props,
      theme,
      changeTheme,
    };
  },
});
</script>

<style scoped></style>
