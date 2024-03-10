import type { TagStyle } from '@codemirror/language';
import type { Extension } from '@codemirror/state';

interface ThemeSettings {
  background: string;
  foreground: string;
  caret: string;
  selection: string;
  lineHighlight: string;
  gutterBackground: string;
  gutterForeground: string;
}

interface IThemes {
  [key: string]: Extension;
}

interface Themes extends IThemes {
  light: Extension;
  dark: Extension;
}

export { type ThemeSettings, type Themes };
