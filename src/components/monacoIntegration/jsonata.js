/* eslint-disable no-template-curly-in-string */
import monarchDefinition from './jsonata.monarch';
import { getSuggestions, getHovers } from './functions/custom';

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
  });

  // Register a completion item provider for the new language
  monaco.languages.registerCompletionItemProvider('jsonata', {
    provideCompletionItems: (model, position) => {
      var word = model.getWordUntilPosition(position);
      var range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      return {
        suggestions: getSuggestions(monaco, range),
      };
    },
  });

  monaco.languages.registerHoverProvider('jsonata', {
    provideHover: (model, position) => {
      var word = model.getWordAtPosition(position);
      if (word) {
        var range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };
        const entry = getHovers()[word.word];
        if (entry) {
          return {
            range,
            contents: entry,
          };
        }
      }
      return null;
    },
  });
}
