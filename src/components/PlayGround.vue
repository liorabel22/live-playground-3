<template>
  <div
    ref="pane_container"
    class="playground-container flex w-full h-full border-2 border-caret rounded-xl overflow-hidden"
  >
    <div
      ref="left_pane"
      class="code-editors-container flex flex-col h-full"
      :style="leftPaneStyle"
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
    <div
      class="drag-bar w-2 cursor-col-resize h-full bg-yellow-300"
      @mousedown="startDrag"
      @mousemove="doDrag"
    ></div>
    <div
      ref="right_pane"
      class="code-preview-container h-full bg-background text-foreground border-s border-caret"
      :style="rightPaneStyle"
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
import { defineComponent, ref, reactive, watch, onMounted } from 'vue';
import CodeEditor from '@/components/CodeEditor.vue';
import CodePreview from '@/components/CodePreview.vue';
import { darkSettings, lightSettings } from '@/assets/theme/themes';

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

    // DRAGGABLE
    const pane_container = ref<HTMLInputElement | null>(null);
    const left_pane = ref<HTMLInputElement | null>(null);
    const right_pane = ref<HTMLInputElement | null>(null);

    const dragging = ref<boolean>(false);

    const leftPanePercentage = ref<number>(50);
    const rightPanePercentage = ref<number>(50);
    const prevPageX = ref<number>(0);

    interface ElementStyle {
      width: string;
    }

    const rightPaneStyle = reactive<ElementStyle>({
      width: '0%',
    });
    const leftPaneStyle = reactive<ElementStyle>({
      width: '0%',
    });

    onMounted(() => {
      setInitialPaneSizes();
      window.addEventListener('mouseup', stopDrag);
      window.addEventListener('resize', setInitialPaneSizes);
    });

    const setInitialPaneSizes = () => {
      if (left_pane.value && right_pane.value && pane_container.value) {
        const unit =
          pane_container.value?.clientWidth /
          (leftPanePercentage.value + rightPanePercentage.value);
        leftPaneStyle.width = `${unit * leftPanePercentage.value}px`;
        rightPaneStyle.width = `${unit * rightPanePercentage.value}px`;
      }
    };

    const startDrag = (mousedownEvent: MouseEvent) => {
      mousedownEvent.preventDefault();
      dragging.value = true;
      prevPageX.value = mousedownEvent.pageX;
    };

    const stopDrag = () => {
      if (dragging.value) {
        dragging.value = false;
      }
    };

    const doDrag = (mousemoveEvent: MouseEvent) => {
      mousemoveEvent.preventDefault();
      if (dragging.value && left_pane.value && right_pane.value && pane_container.value) {
        const deltaPageX = mousemoveEvent.pageX - prevPageX.value;
        prevPageX.value = mousemoveEvent.pageX;

        leftPaneStyle.width = `${left_pane.value?.clientWidth + deltaPageX}px`;
        rightPaneStyle.width = `${right_pane.value?.clientWidth - deltaPageX}px`;
        leftPanePercentage.value =
          (100 / pane_container.value?.clientWidth) * left_pane.value?.clientWidth;
        rightPanePercentage.value =
          (100 / pane_container.value?.clientWidth) * right_pane.value?.clientWidth;
      }
    };

    return {
      props,
      handleChange,
      previewCode,
      numEditors,
      enumLanguages,
      localInitialCodes,
      codeEditorHeight,
      pane_container,
      left_pane,
      right_pane,
      rightPaneStyle,
      leftPaneStyle,
      startDrag,
      doDrag,
    };
  },
});
</script>
