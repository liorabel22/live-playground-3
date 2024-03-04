<template>
  <codemirror
    :style="{ height: props.height, backgroundColor: 'black' }"
    v-model="localCode"
    :extensions="extensions"
    @ready="handleReady"
    @change="handleChange"
    @focus="handleChange"
    @blur="handleChange"
  />
</template>

<script lang="ts">
import { defineComponent, ref, shallowRef, reactive } from 'vue';
import { Codemirror } from 'vue-codemirror';
import type { LanguageSupport } from '@codemirror/language';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';

import { Languages } from '@/enums/Languages';

export default defineComponent({
  name: 'CodeEditor',
  components: {
    Codemirror,
  },
  props: {
    language: { type: String, required: true },
    code: { type: String, required: true },
    height: { type: String, default: '400px' },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const localCode = ref(props.code);

    // Set extensions
    const extensions = reactive<LanguageSupport[]>([]);
    switch (props.language) {
      case String(Languages.HTML):
        extensions.push(
          html({
            matchClosingTags: true,
            selfClosingTags: true,
            autoCloseTags: true,
          }),
        );
        break;
      case String(Languages.CSS):
        extensions.push(css());
        break;
      case String(Languages.JS):
        extensions.push(javascript());
        break;
      default:
        break;
    }

    // Codemirror EditorView instance ref
    const view = shallowRef();
    const handleReady = (payload: any) => {
      view.value = payload.view;
      emit('change', { lang: props.language, code: localCode.value });
    };

    // Debounce Changes
    let debounceTimer: any = ref(null);
    const handleChange = () => {
      if (debounceTimer.value) {
        clearTimeout(debounceTimer.value);
      }

      debounceTimer.value = setTimeout(() => {
        emit('change', { lang: props.language, code: localCode.value });
      }, 3000);
    };

    return {
      props,
      localCode,
      extensions,
      handleReady,
      handleChange,
    };
  },
});
</script>
