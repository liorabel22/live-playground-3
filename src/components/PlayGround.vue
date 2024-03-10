<template>
  <div class="playground-container flex w-full h-full">
    <div class="code-editors-container flex flex-col w-1/2 h-full grow">
      <CodeEditor
        v-for="(editor, $index) in numEditors"
        :key="editor"
        :language="enumLanguages[$index]"
        :code="localInitialCodes[$index]"
        :height="codeEditorHeight"
        :theme="props.theme"
        @change="handleChange"
      />
    </div>
    <div class="code-preview-container w-1/2 h-full grow">
      <CodePreview
        :code="previewCode"
        :theme="props.theme"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import CodeEditor from '@/components/CodeEditor.vue';
import CodePreview from '@/components/CodePreview.vue';

import { Languages } from '@/enums/Languages';

export default defineComponent({
  name: 'PlayGround',
  components: {
    CodeEditor,
    CodePreview,
  },
  props: {
    languages: { type: Array as () => string[], default: () => ['HTML', 'CSS'] },
    initialCodes: { type: Array as () => string[], default: () => [''] },
    theme: { type: String, default: 'dark' },
  },
  setup(props) {
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
