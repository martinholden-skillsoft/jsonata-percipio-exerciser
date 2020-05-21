const generic = require('./generic');
const successfactors = require('./successfactors');

const getSuggestions = (monaco) => {
  const merged = [...generic.functions, ...successfactors.functions];

  const suggestions = merged.map((value, index, source) => {
    const suggestion = {};
    suggestion.label = `$${value.label}`;
    suggestion.kind = monaco.languages.CompletionItemKind.Function;
    suggestion.insertText = '';
    suggestion.insertTextRules = monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;
    suggestion.documentation = {};
    suggestion.documentation.value = value.description;
    if (value.parameters) {
      let documentation = suggestion.documentation.value;
      documentation += '\n\n';
      documentation += '**Parameters**\n\n';
      if (value.parameters && value.parameters.length !== 0) {
        let params = '';
        value.parameters.forEach((value, index, source) => {
          params += `{${value.type}} ${
            value.optional
              ? `${value.default ? `[${value.label}=${value.default}]` : `[${value.label}]`}`
              : value.label
          }\n\n`;
          params += `${value.documentation}\n\n`;
        });
        documentation += params.slice(0, -1);
      }
      suggestion.documentation.value = documentation;
    }

    if (value.returns) {
      let documentation = suggestion.documentation.value;
      documentation += '\n\n';
      documentation += '**Returns**\n\n';
      documentation += `{${value.returns}}\n\n`;
      suggestion.documentation.value = documentation;
    }

    suggestion.detail = value.signature;
    if (value.parameters) {
      let signature = suggestion.label;
      signature += '(';
      if (value.parameters && value.parameters.length !== 0) {
        let params = '';
        value.parameters.forEach((value, index, source) => {
          params += value.label + ',';
        });
        signature += params.slice(0, -1);
      }
      signature += ')';
      suggestion.detail = signature;
    }

    suggestion.insertText = value.label;
    if (value.parameters) {
      let insertText = suggestion.insertText;
      insertText += '(';
      if (value.parameters && value.parameters.length !== 0) {
        let params = '';
        value.parameters.forEach((value, index, source) => {
          params += `$\{${index + 1}:${value.label}},`;
        });
        insertText += params.slice(0, -1);
      }
      insertText += ')';
      suggestion.insertText = insertText;
    }

    return suggestion;
  });

  return suggestions;
};

module.exports = {
  getSuggestions,
};
