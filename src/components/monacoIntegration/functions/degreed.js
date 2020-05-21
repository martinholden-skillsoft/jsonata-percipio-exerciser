export default [
  {
    label: 'degreedDuration',
    description:
      'Degreed requires a numeric indicator of duration. The value depends on the **$.contentType**\n\n  * If **$.contentType.percipioType=COURSE** we return the duration converted to hours to 2 decimal places\n\n  * If **$.contentType.percipioType=VIDEO** we return the duration converted to minutes to 2 decimal places\n\n  * For all otehr types we return 0',
    returns: 'Number',
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
    label: 'degreedContentType',
    description: 'Get the value to use for Degreeed **ContentType**',
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
    label: 'degreedSummary',
    description:
      'The summary that has conditionally had the display label added and truncated to a set length adding a "..." suffix to indicate truncation.\n\n  * *summaryFormat="NO_DISPLAY_LABEL"* causes **localizedMetadata[0].description** value to be returned\n\n  * *summaryFormat=PREFIX_DISPLAY_LABEL* causes **$.contentType.displayLabel:$.localizedMetadata[0].value** to be returned, including the colon',
    returns: 'String',
    parameters: [
      {
        label: 'summaryFormat',
        type: 'String',
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
    label: 'degreedTopicsObject',
    description:
      'Get an object an object of 10 topics(TOPIC1…TOPIC10), which includes the title if **$.contentType.percipioType** is channel or journey and all associated areas, subjects and channel titles. ',
    returns: 'Object',
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
];
