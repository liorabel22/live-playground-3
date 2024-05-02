<template>
  <iframe
    class="ms-7"
    id="iframeID"
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
<style lang="css">
iframe {
  @apply h-full w-full;
}
</style>
