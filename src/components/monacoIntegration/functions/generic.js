exports.functions = [
  {
    label: 'truncate',
    description:
      'Truncates a string to a set length, optionally adding a suffix to indicate truncation.',
    returns: 'String',
    parameters: [
      {
        label: 'value',
        type: 'String',
        optional: false,
        default: null,
        documentation: 'The string to truncate',
      },
      {
        label: 'limit',
        type: 'number',
        optional: true,
        default: '500',
        documentation: 'The maximum number of characters (including the terminator if used)',
      },
      {
        label: 'terminator',
        type: 'string',
        optional: true,
        default: '"..."',
        documentation: 'The string to use to indicate the string has been truncated.',
      },
    ],
    signature: '(value, limit, terminator)',
  },
  {
    label: 'shortenUuid',
    description: 'Shorten the supplied UUID string, by converting to base64 string',
    returns: 'String',
    parameters: [
      {
        label: 'uuid',
        type: 'String',
        optional: false,
        default: null,
        documentation: 'The uuid string to shorten',
      },
    ],
    signature: '(uuid)',
  },
  {
    label: 'extendedTitle',
    description:
      'Get the extended title.\n\n  * If title already includes a colon no nothing\n  * If we have a technology, preface the title with the technology title and version\n  * If we have a technology title, but no version, preface with the technology title\n  * If we have a technology version, but no title, do not add a preface',
    returns: 'String',
    parameters: [
      {
        label: 'title',
        type: 'String',
        optional: false,
        default: null,
        documentation: 'The title string',
      },
      {
        label: 'row',
        type: 'Object',
        optional: false,
        default: null,
        documentation: 'The current Percipio data we are processing. This is normally **$**.',
      },
    ],
    signature: '(uuid)',
  },
];
