export default {
  tokenizer: {
    root: [
      [/\/\*.*\*\//, 'jsonata-comment'],
      [/'.*'/, 'jsonata-string'],
      [/".*"/, 'jsonata-string'],
      [/\$[a-zA-Z0-9_]*/, 'jsonata-variable'],
      [/[a-zA-Z0-9_]+/, 'jsonata-names'],
    ],
  },
};
