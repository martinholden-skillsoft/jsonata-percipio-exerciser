/* eslint-disable no-template-curly-in-string */
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
  });

  // Register a completion item provider for the new language
  monaco.languages.registerCompletionItemProvider('jsonata', {
    provideCompletionItems: () => {
      var suggestions = [
        {
          label: '$successFactorsType',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'successFactorsType(${1:types}, ${2:row})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail:
            'Return string that represents the CPNT_TYP_ID and DEL_MTH_ID type id string in SuccessFactors',
          documentation:
            'types - Configuration object that defines the type configurations, typically from $types in base Configuration.\nrow - Object that represents the record, typically $.',
        },
        {
          label: '$successFactorsCompletionStat',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'successFactorsCompletionStat(${1:types}, ${2:row})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail:
            'Return string that represents the CMPL_STAT_ID completion rule string in SuccessFactors',
          documentation:
            'types - Configuration object that defines the type configurations, typically from $types in base Configuration.\nrow - Object that represents the record, typically $.',
        },
        {
          label: '$successFactorsShowInCatalog',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'successFactorsShowInCatalog(${1:types}, ${2:row})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: 'Return "Y" or "N" indicating if this asset should show in the catalog.',
          documentation:
            'types - Configuration object that defines the type configurations, typically from $types in base Configuration.\nrow - Object that represents the record, typically $.',
        },
        {
          label: '$successFactorsLocale',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'successFactorsLocale(${1:localeCode})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail:
            'Return empty string if the argument was null or undefined.  Otherwise, it uses a library to lookup the one word name of the language.  For example, en-US would return "English".  fr-CA would return "French',
          documentation:
            'localeCode - This argument is a nullable string that represents the locale code, typically from $.localizedMetadata[0].localeCode',
        },
      ];
      return { suggestions: suggestions };
    },
  });
}
