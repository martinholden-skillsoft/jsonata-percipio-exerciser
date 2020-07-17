export default [
  {
    label: 'sabaMarkCompletion',
    description:
      'Normalises the Percipio types, and return the **$types.markCompleteExternally** string based on **$.contentType**',
    returns: 'String',
    parameters: [
      {
        label: 'types',
        type: 'Object',
        optional: false,
        default: '$types',
        defaultIsJSONata: true,
        documentation:
          'An object containing the mapping between Percipio type and this value. The default is **$types** value from the configuration.',
      },
      {
        label: 'row',
        type: 'Object',
        optional: false,
        default: '$',
        defaultIsJSONata: true,
        documentation:
          'The current Percipio data we are processing. The default is **$** to represent current record.',
      },
    ],
    signature: '(types, row)',
  },
  {
    label: 'sabaDeliveryType',
    description:
      'Normalises the Percipio types, and return the **$types.deliveryType** string based on **$.contentType**',
    returns: 'String',
    parameters: [
      {
        label: 'types',
        type: 'Object',
        optional: false,
        default: '$types',
        defaultIsJSONata: true,
        documentation:
          'An object containing the mapping between Percipio type and this value. The default is **$types** value from the configuration.',
      },
      {
        label: 'row',
        type: 'Object',
        optional: false,
        default: '$',
        defaultIsJSONata: true,
        documentation:
          'The current Percipio data we are processing. The default is **$** to represent current record.',
      },
    ],
    signature: '(types, row)',
  },
  {
    label: 'sabaSplitValue',
    description: 'Returns the Saba Domain value to use based on **$.lifeCycle.status**',
    returns: 'String',
    parameters: [
      {
        label: 'domainNameForActive',
        type: 'String',
        optional: false,
        default: null,
        documentation: 'The Saba domain name used for Active content',
      },
      {
        label: 'domainNameForInActive',
        type: 'String',
        optional: false,
        default: null,
        documentation: 'The Saba domain name used for Inactive content',
      },
      {
        label: 'row',
        type: 'Object',
        optional: false,
        default: '$',
        defaultIsJSONata: true,
        documentation:
          'The current Percipio data we are processing. The default is **$** to represent current record.',
      },
    ],
    signature: '(domainNameForActive, domainNameForInActive, row)',
  },
  {
    label: 'sabaDescription',
    description:
      'The summary that has conditionally had author and publisher info included and truncated to a 2000 characters adding a "..." suffix to indicate truncation.\n\n  * *descriptionType="NO_EXTENDED_DESCRIPTION"* causes result of **$plainString(localizedMetadata[0].description,2000)** to be returned\n\n  * *summaryFormat=USE_EXTENDED_DESCRIPTION* causes **$metadataExtendedDescription($.localizedMetadata[0].value,2000)** to be returned',
    returns: 'String',
    parameters: [
      {
        label: 'descriptionType',
        type: 'String',
        optional: false,
        default: "'USE_EXTENDED_DESCRIPTION'",
        documentation:
          'A string with two possible values.\n\n * NO_EXTENDED_DESCRIPTION\n\n * USE_EXTENDED_DESCRIPTION\n\n',
      },
      {
        label: 'row',
        type: 'Object',
        optional: false,
        default: '$',
        defaultIsJSONata: true,
        documentation:
          'The current Percipio data we are processing. The default is **$** to represent current record.',
      },
    ],
    signature: '(descriptionType, row)',
  },
  {
    label: 'sabaKeywordsArray',
    description:
      'Get comma delimited list of strings, which includes the title if **$.contentType.percipioType** is channel or journey and all associated keywords, areas, subjects and channel titles. ',
    returns: 'String',
    parameters: [
      {
        label: 'row',
        type: 'Object',
        optional: false,
        default: '$',
        defaultIsJSONata: true,
        documentation:
          'The current Percipio data we are processing. The default is **$** to represent current record.',
      },
    ],
    signature: '(row)',
  },
  {
    label: 'sabaLocale',
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
];
