import { createTheme } from 'thememirror';
import { tags as t } from '@lezer/highlight';
import type { ThemeSettings, Themes } from '.';
import type { TagStyle } from '@codemirror/language';

const lightSettings: ThemeSettings = {
  background: '#e2e2f3',
  foreground: '#000005',
  caret: '#314d9b',
  selection: '#ccd425',
  lineHighlight: '#fffcfa',
  gutterBackground: '#e2e2f3',
  gutterForeground: '#314d9b',
};

const lightSyntax: TagStyle[] = [
  {
    tag: t.comment,
    color: '#6b6b88',
  },
  {
    tag: t.variableName,
    color: '#8c8cc2',
  },
  {
    tag: [t.string, t.special(t.brace)],
    color: '#259286',
  },
  {
    tag: t.number,
    color: '#7f8ed3',
  },
  {
    tag: t.bool,
    color: '#4d8a86',
  },
  {
    tag: t.null,
    color: '#9e4b4b',
  },
  {
    tag: t.keyword,
    color: '#9e4b4b',
  },
  {
    tag: t.operator,
    color: '#6b6b88',
  },
  {
    tag: t.className,
    color: '#4d8a86',
  },
  {
    tag: t.definition(t.typeName),
    color: '#8c8cc2',
  },
  {
    tag: t.typeName,
    color: '#7f8ed3',
  },
  {
    tag: t.angleBracket,
    color: '#6b6b88',
  },
  {
    tag: t.tagName,
    color: '#4d8a86',
  },
  {
    tag: t.attributeName,
    color: '#8c8cc2',
  },
];

const lightTheme = createTheme({
  variant: 'light',
  settings: lightSettings,
  styles: lightSyntax,
});

const darkSettings: ThemeSettings = {
  background: '#123354',
  foreground: '#f7f0e9',
  caret: '#faa005',
  selection: '#00d170',
  lineHighlight: '#040f1a',
  gutterBackground: '#123354',
  gutterForeground: '#0fb3ff',
};

const darkSyntax: TagStyle[] = [
  {
    tag: t.comment,
    color: '#a5a5a5',
  },
  {
    tag: t.variableName,
    color: '#f4a82e',
  },
  {
    tag: [t.string, t.special(t.brace)],
    color: '#00ff84',
  },
  {
    tag: t.number,
    color: '#fffa00',
  },
  {
    tag: t.bool,
    color: '#ff8f61',
  },
  {
    tag: t.null,
    color: '#ff005c',
  },
  {
    tag: t.keyword,
    color: '#ff66c4',
  },
  {
    tag: t.operator,
    color: '#f7f0e9',
  },
  {
    tag: t.className,
    color: '#ffd700',
  },
  {
    tag: t.definition(t.typeName),
    color: '#00d8ff',
  },
  {
    tag: t.typeName,
    color: '#ffb8ff',
  },
  {
    tag: t.angleBracket,
    color: '#f7f0e9',
  },
  {
    tag: t.tagName,
    color: '#ffa600',
  },
  {
    tag: t.attributeName,
    color: '#00d170',
  },
];

const darkTheme = createTheme({
  variant: 'dark',
  settings: darkSettings,
  styles: darkSyntax,
});

const themes: Themes = {
  light: lightTheme,
  dark: darkTheme,
};

export default themes;
export { lightSettings, darkSettings };
