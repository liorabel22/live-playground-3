<template>
  <div
    class="playground-container flex w-full h-full border-2 border-caret rounded-xl overflow-hidden"
  >
    <div
      class="code-editors-container flex flex-col w-1/2 h-full"
      :style="{ flex: 1 }"
    >
      <CodeEditor
        v-for="(editor, $index) in numEditors"
        :key="editor"
        :language="enumLanguages[$index]"
        :code="localInitialCodes[$index]"
        :height="codeEditorHeight"
        :theme="props.theme"
        :display="props.display"
        :fonts="props.fonts.code"
        @change="handleChange"
      />
    </div>
    <Resizer />
    <div
      class="code-preview-container w-1/2 h-full bg-background text-foreground border-s border-caret"
      :style="{ flex: 1 }"
    >
      <CodePreview
        :code="previewCode"
        :theme="props.theme"
        :fonts="props.fonts.preview"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue';
import CodeEditor from '@/components/CodeEditor.vue';
import CodePreview from '@/components/CodePreview.vue';
import Resizer from '@/components/Resizer.vue';
import { darkSettings, lightSettings } from '@/assets/theme/themes';

import { Languages } from '@/enums/Languages';

export default defineComponent({
  name: 'PlayGround',
  components: {
    CodeEditor,
    CodePreview,
    Resizer,
  },
  props: {
    languages: { type: Array as () => string[], default: () => ['HTML', 'CSS'] },
    initialCodes: { type: Array as () => string[], default: () => [''] },
    theme: { type: String, default: 'dark' },
    display: { type: String, default: 'tab' },
    fonts: {
      type: Object,
      default: () => {
        return { preview: 'sans-serif', code: 'monospace' };
      },
    },
  },
  setup(props) {
    // set theme
    const html = document.getElementsByTagName('html')[0];
    html.setAttribute('class', props.theme);

    let currThemeColors = props.theme === 'dark' ? darkSettings : lightSettings;

    watch(
      () => props.theme,
      (newTheme: string) => {
        html.setAttribute('class', newTheme);
        currThemeColors = newTheme === 'dark' ? darkSettings : lightSettings;
      },
    );
    const previewCode = ref('');
    const cssCode = ref('');
    const htmlCode = ref('');
    const handleChange = ({ lang, code }: { lang: Languages; code: string }) => {
      switch (lang) {
        case Languages.CSS:
          cssCode.value = code;
          break;
        case Languages.HTML:
          htmlCode.value = code;
          break;
        default:
          break;
      }
      previewCode.value = `
          <style>
            html {
              height: 100%;
              font-family: ${props.fonts.preview};
              color: ${currThemeColors.foreground};
            }
            ${cssCode.value}
          </style>
          ${htmlCode.value}
          `;
    };

    const enumLanguages: string[] = props.languages
      .map((language: any): string => Languages[language])
      .filter((lang) => lang);
    const numEditors = ref(enumLanguages.length);

    const codeEditorHeight = ref(`${(1 / numEditors.value) * 100}%`);

    const localInitialCodes = reactive([...props.initialCodes]);
    if (props.initialCodes.length < numEditors.value) {
      const difference = numEditors.value - props.initialCodes.length;
      Array(difference)
        .fill(0)
        .forEach(() => {
          localInitialCodes.push('');
        });
    }

    return {
      props,
      handleChange,
      previewCode,
      numEditors,
      enumLanguages,
      localInitialCodes,
      codeEditorHeight,
    };
  },
});
</script>
