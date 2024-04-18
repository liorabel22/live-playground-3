<template>
  <iframe
    :srcdoc="props.code"
    loading="lazy"
  ></iframe>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CodePreview',
  props: {
    code: { type: String, required: true },
    theme: { type: String, required: true },
    fonts: { type: String, required: true },
  },
  setup(props) {
    return {
      props,
    };
  },
});
</script>
