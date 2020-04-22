import monarchDefinition from './jsonata.monarch';

export default function (monaco) {
  monaco.languages.register({
    id: 'jsonata',
  });
  monaco.languages.setMonarchTokensProvider('jsonata', monarchDefinition);

  const brackets = [
    { open: '(', close: ')' },
    { open: '[', close: ']' },
    { open: '{', close: '}' },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
    { open: '`', close: '`' },
  ];
  monaco.languages.setLanguageConfiguration('jsonata', {
    brackets: [
      ['(', ')'],
      ['[', ']'],
      ['{', '}'],
    ],
    autoClosingPairs: brackets,
    surroundingPairs: brackets,
    indentationRules: {
      // ^(.*\*/)?\s*\}.*$
      decreaseIndentPattern: /^((?!.*?\/\*).*\*\/)?\s*[}\])].*$/,
      // ^.*\{[^}"']*$
      increaseIndentPattern: /^((?!\/\/).)*(\{[^}"'`]*|\([^)"'`]*|\[[^\]"'`]*)$/,
    },
    insertSpaces: true,
    tabSize: 2,
  });

  // Define a new theme that contains only rules that match this language
  monaco.editor.defineTheme('jsonataTheme', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'jsonata-string', foreground: 'a00000' },
      { token: 'jsonata-comment', foreground: '008000' },
      { token: 'jsonata-variable', foreground: 'ff4000' },
      { token: 'jsonata-names', foreground: '0000c0' },
    ],
    colors: {
      'editor.background': '#fffffb',
    },
  });
}