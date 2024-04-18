<template>
  <codemirror
    :style="{ height: props.height }"
    v-model="localCode"
    :extensions="extensions"
    @ready="handleReady"
    @change="handleChange"
    @focus="handleChange"
    @blur="handleChange"
  />
</template>

<script lang="ts">
import { defineComponent, ref, shallowRef, reactive, watch } from 'vue';
import { Codemirror } from 'vue-codemirror';
import type { LanguageSupport } from '@codemirror/language';
import { EditorView } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';

import { Languages } from '@/enums/Languages';
import Themes from '@/assets/theme/themes';

export default defineComponent({
  name: 'CodeEditor',
  components: {
    Codemirror,
  },
  props: {
    language: { type: String, required: true },
    code: { type: String, required: true },
    height: { type: String, default: '400px' },
    theme: { type: String, required: true },
    fonts: { type: String, required: true },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const localCode = ref(props.code);

    const baseTheme = EditorView.theme({
      '.cm-scroller': {
        fontFamily: props.fonts,
      },
      '.cm-gutters': {
        borderRight: 'none',
      },
    });

    // Set extensions
    const extensions = reactive<(LanguageSupport | any)[]>([Themes[props.theme], baseTheme]);
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

    watch(
      () => props.theme,
      (newVal: string) => {
        const index = extensions.findIndex((extension) => Array.isArray(extension[0]));
        extensions.splice(index, 1);
        extensions.push(Themes[newVal]);
      },
    );

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
