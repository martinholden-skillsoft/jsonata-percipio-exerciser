exports.functions = [
  {
    label: 'successFactorsType',
    description: 'Get the value to use for SuccessFactors **CPNT_TYP_ID** and **DEL_MTH_ID**',
    returns: 'String',
    parameters: [
      {
        label: 'types',
        type: 'Object',
        optional: false,
        default: null,
        documentation:
          'An object containing the mapping between **$.contentType** and this value. This is normally the **$types** value from the configuration.',
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
    label: 'successFactorsCompletionStat',
    description: 'Get the value to use for SuccessFactors **CMPL_STAT_ID**',
    returns: 'String',
    parameters: [
      {
        label: 'types',
        type: 'Object',
        optional: false,
        default: null,
        documentation:
          'An object containing the mapping between **$.contentType** and this value. This is normally the **$types** value from the configuration.',
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
    label: 'successFactorsShowInCatalog',
    description: 'Get **Y** or **N** to use for SuccessFactors **SHOW_IN_CATALOG**',
    returns: 'String',
    parameters: [
      {
        label: 'types',
        type: 'Object',
        optional: false,
        default: null,
        documentation:
          'An object containing the mapping between **$.contentType** and this value. This is normally the **$types** value from the configuration.',
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
    label: 'successFactorsLocale',
    description:
      'Get the one word name of the language. For example, en-US would return "English". fr-CA would return "French" to use for SuccessFactors **LOCALE**',
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
