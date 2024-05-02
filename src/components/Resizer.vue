<template>
  <div
    class="resizer grow-0 shrink-0 basis-2 bg-caret bg-no-repeat bg-center cursor-ew-resize bg-[url('@/assets/icons/resize.svg')]"
    @mousedown.prevent="doResize"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CodePreviewResizer',
  setup() {
    const doResize = (mousedownEvent: MouseEvent) => {
      changeCursor(
        { html: 'col-resize', event: 'col-resize', iframe: 'col-resize' },
        mousedownEvent,
      );
      manageResize(mousedownEvent);
    };

    const manageResize = (event: MouseEvent) => {
      var target = event.target as HTMLDivElement;
      var left = target?.previousElementSibling as HTMLDivElement;
      var right = target?.nextElementSibling as HTMLDivElement;

      if (!left || !right) {
        return;
      }

      var leftSize = left.offsetWidth;
      var rightSize = right.offsetWidth;
      var totalSize = leftSize + rightSize;

      var leftGrow = Number(left.style.flexGrow);
      var rightGrow = Number(right.style.flexGrow);
      var totalGrow = leftGrow + rightGrow;

      var lastPos = event.pageX;

      const handleMousemove = (mousemoveEvent: MouseEvent) => {
        var pos = mousemoveEvent.pageX;
        var delta = pos - lastPos;

        leftSize += delta;
        rightSize -= delta;

        if (leftSize < 0) {
          rightSize += leftSize;
          pos -= leftSize;
          leftSize = 0;
        }
        if (rightSize < 0) {
          leftSize += rightSize;
          pos += rightSize;
          rightSize = 0;
        }

        var leftGrowNew = totalGrow * (leftSize / totalSize);
        var rightGrowNew = totalGrow * (rightSize / totalSize);

        left.style.flexGrow = `${leftGrowNew}`;
        right.style.flexGrow = `${rightGrowNew}`;

        lastPos = pos;
      };

      const handleMouseup = (mouseupEvent: MouseEvent) => {
        changeCursor({ html: 'default', event: 'ew-resize', iframe: 'default' }, mouseupEvent);

        window.removeEventListener('mousemove', handleMousemove);
        window.removeEventListener('mouseup', handleMouseup);
      };

      window.addEventListener('mousemove', handleMousemove);
      window.addEventListener('mouseup', handleMouseup);
    };

    const changeCursor = (
      cursor: { event: string; html: string; iframe: string },
      event: MouseEvent,
    ) => {
      const target = event.target as HTMLDivElement;
      const html = document.querySelector('html') as HTMLHtmlElement;
      const iframe = document.getElementById('iframeID') as HTMLIFrameElement;
      const iframeHtml = iframe?.contentDocument?.querySelector('html') as HTMLHtmlElement;

      target.style.cursor = cursor.event;
      html.style.cursor = cursor.html;
      iframeHtml.style.cursor = cursor.iframe;
    };
    return { doResize };
  },
});
</script>
