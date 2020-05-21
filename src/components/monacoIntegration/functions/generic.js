export default [
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
      'Get the extended title.\n\n  * If title already includes a colon no nothing\n  * If we have a **$.technologies**, preface the title with the **$.technologies[0].title and $.technologies[0].version**\n  * If we have a **$.technologies[0].title** and no **$.technologies[0].version** only preface with **$.technologies[0].title**\n  * If we have a **$.technologies[0].version** and no **$.technologies[0].title** do not add a preface',
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
    signature: '(title,row)',
  },
  {
    label: 'getContentType',
    description:
      'Normalise the content type.\n\n  * If **$.contentType.displayLabel** is *Book Summary* or *Book Review* return **BOOK SUMMARY**\n  * If **$.contentType.displayLabel** is *Audiobook Summary* return **AUDIO SUMMARY**\n  * If **$.contentType.displayLabel** is *LINKED_CONTENT* return **LINKED_CONTENT**\n  * For all others return **$.contentType.percipioType**\n',
    returns: 'String',
    parameters: [
      {
        label: 'row',
        type: 'Object',
        optional: false,
        default: null,
        documentation: 'The current Percipio data we are processing. This is normally **$**.',
      },
    ],
    signature: '(row)',
  },
  {
    label: 'isoDurationToHours',
    description:
      'Convert an ISO8601 formatted duration to number of hours rounded to 2 decimal places',
    returns: 'Number',
    parameters: [
      {
        label: 'duration',
        type: 'String',
        optional: false,
        default: null,
        documentation: 'An ISO8601 formatted duration string.',
      },
    ],
    signature: '(duration)',
  },
  {
    label: 'isoDurationToMinutes',
    description:
      'Convert an ISO8601 formatted duration to number of minutes rounded to 2 decimal places',
    returns: 'Number',
    parameters: [
      {
        label: 'duration',
        type: 'String',
        optional: false,
        default: null,
        documentation: 'An ISO8601 formatted duration string.',
      },
    ],
    signature: '(duration)',
  },
  {
    label: 'isoDurationToSeconds',
    description:
      'Convert an ISO8601 formatted duration to number of seconds rounded to 2 decimal places',
    returns: 'Number',
    parameters: [
      {
        label: 'duration',
        type: 'String',
        optional: false,
        default: null,
        documentation: 'An ISO8601 formatted duration string.',
      },
    ],
    signature: '(duration)',
  },
  {
    label: 'isoDurationToMillis',
    description:
      'Convert an ISO8601 formatted duration to number of milliseconds rounded to 2 decimal places',
    returns: 'Number',
    parameters: [
      {
        label: 'duration',
        type: 'String',
        optional: false,
        default: null,
        documentation: 'An ISO8601 formatted duration string.',
      },
    ],
    signature: '(duration)',
  },
  {
    label: 'stripQueryStringandHash',
    description: 'Remove any hash or querystring values for a URL',
    returns: 'String',
    parameters: [
      {
        label: 'url',
        type: 'String',
        optional: false,
        default: null,
        documentation: 'The url string',
      },
    ],
    signature: '(url)',
  },
  {
    label: 'localeLanguage',
    description:
      'Get the name of the language. For example, en-US would return "English". fr-CA would return "French"',
    returns: 'String',
    parameters: [
      {
        label: 'localeCode',
        type: 'String',
        optional: false,
        default: null,
        documentation: 'The Percipio localeCode value to look up.',
      },
    ],
    signature: '(localeCode)',
  },
  {
    label: 'plainString',
    description:
      'Strip out any HTML and extended characters from string and truncate to a set length adding a "..." suffix to indicate truncation.',
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
        documentation:
          'The maximum number of characters including the "..." indicator that the string as been truncated',
      },
    ],
    signature: '(value, limit)',
  },
  {
    label: 'metadataExtendedDescription',
    description:
      'Create an extended description that incorporate author and publisher info. Formatted using **$plainString** function.',
    returns: 'String',
    parameters: [
      {
        label: 'limit',
        type: 'number',
        optional: true,
        default: '500',
        documentation:
          'The maximum number of characters including the "..." indicator that the string as been truncated',
      },
      {
        label: 'row',
        type: 'Object',
        optional: false,
        default: null,
        documentation: 'The current Percipio data we are processing. This is normally **$**.',
      },
    ],
    signature: '(limit, row)',
  },
  {
    label: 'wbtDuration',
    description: 'Convert an ISO8601 formatted duration to *hh:mm* format',
    returns: 'String',
    parameters: [
      {
        label: 'duration',
        type: 'String',
        optional: false,
        default: null,
        documentation: 'An ISO8601 formatted duration string.',
      },
    ],
    signature: '(duration)',
  },
  {
    label: 'generateXapiIdForCompletions',
    description: 'Create the Percipio xAPIActivityId from a *Learner Activity* record',
    returns: 'String',
    parameters: [
      {
        label: 'row',
        type: 'Object',
        optional: false,
        default: null,
        documentation: 'The current Percipio data we are processing. This is normally **$**.',
      },
    ],
    signature: '(row)',
  },
  {
    label: 'getExternalLmsTypeForReporting',
    description: 'Normalises the Percipio types, and return the **$types** object',
    returns: 'Object',
    parameters: [
      {
        label: 'types',
        type: 'Object',
        optional: false,
        default: null,
        documentation:
          'An object containing the mapping between Percipio type and this value. This is normally the **$types** value from the configuration.',
      },
      {
        label: 'row',
        type: 'Object',
        optional: false,
        default: null,
        documentation: 'The current Percipio data we are processing. This is normally **$**.',
      },
    ],
    signature: '(types, row)',
  },
  {
    label: 'deriveContentTypeForCompletions',
    description: 'Normalises the Percipio types, and return the **$types.name** value',
    returns: 'String',
    parameters: [
      {
        label: 'types',
        type: 'Object',
        optional: false,
        default: null,
        documentation:
          'An object containing the mapping between Percipio type and this value. This is normally the **$types** value from the configuration.',
      },
      {
        label: 'row',
        type: 'Object',
        optional: false,
        default: null,
        documentation: 'The current Percipio data we are processing. This is normally **$**.',
      },
    ],
    signature: '(types, row)',
  },
  {
    label: 'formatTitle',
    description:
      'The title that has conditionally had the lmsType and/or technology and technology version added to the beginning and/or end as configured, and truncated to a set length adding a "..." suffix to indicate truncation.',
    returns: 'String',
    parameters: [
      {
        label: 'titleFormat',
        type: 'Object',
        optional: false,
        default: null,
        documentation:
          'An object with two attributes, **type** and **technology**\n\n * *type* can be: NONE, PREFIX, or POSTFIX\n\n * *technology* can be: NONE, PREFIX, or POSTFIX',
      },
      {
        label: 'lmsType',
        type: 'String',
        optional: false,
        default: null,
        documentation: 'The string that represents the display label for the LMS',
      },
      {
        label: 'limit',
        type: 'number',
        optional: false,
        default: null,
        documentation:
          'The maximum number of characters including the "..." indicator that the string as been truncated',
      },
      {
        label: 'row',
        type: 'Object',
        optional: false,
        default: null,
        documentation: 'The current Percipio data we are processing. This is normally **$**.',
      },
    ],
    signature: '(titleFormat, lmsType, limit, row)',
  },
  {
    label: 'formatSummary',
    description:
      'The summary that has conditionally had the display label added and truncated to a set length adding a "..." suffix to indicate truncation.\n\n  * *summaryFormat="NO_DISPLAY_LABEL"* causes **localizedMetadata[0].description** value to be returned\n\n  * *summaryFormat=PREFIX_DISPLAY_LABEL* causes **contentType.displayLabel:localizedMetadata[0].value** to be returned, including the colon',
    returns: 'String',
    parameters: [
      {
        label: 'summaryFormat',
        type: 'Object',
        optional: false,
        default: null,
        documentation:
          'A string with two possible values.\n\n * NO_DISPLAY_LABEL\n\n * PREFIX_DISPLAY_LABEL\n\n',
      },
      {
        label: 'limit',
        type: 'number',
        optional: false,
        default: null,
        documentation:
          'The maximum number of characters including the "..." indicator that the string as been truncated',
      },
      {
        label: 'row',
        type: 'Object',
        optional: false,
        default: null,
        documentation: 'The current Percipio data we are processing. This is normally **$**.',
      },
    ],
    signature: '(summaryFormat, limit, row)',
  },
  {
    label: 'getExternalLmsType',
    description:
      'Normalises the Percipio types, and return the **$types** object based on **$.contentType**',
    returns: 'Object',
    parameters: [
      {
        label: 'types',
        type: 'Object',
        optional: false,
        default: null,
        documentation:
          'An object containing the mapping between Percipio type and this value. This is normally the **$types** value from the configuration.',
      },
      {
        label: 'row',
        type: 'Object',
        optional: false,
        default: null,
        documentation: 'The current Percipio data we are processing. This is normally **$**.',
      },
    ],
    signature: '(types, row)',
  },
  {
    label: 'externalLmsType',
    description:
      'Normalises the Percipio types, and return the **$types.name** string based on **$.contentType**',
    returns: 'String',
    parameters: [
      {
        label: 'types',
        type: 'Object',
        optional: false,
        default: null,
        documentation:
          'An object containing the mapping between Percipio type and this value. This is normally the **$types** value from the configuration.',
      },
      {
        label: 'row',
        type: 'Object',
        optional: false,
        default: null,
        documentation: 'The current Percipio data we are processing. This is normally **$**.',
      },
    ],
    signature: '(types, row)',
  },
];
