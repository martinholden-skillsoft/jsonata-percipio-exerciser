window.jsonatatransforms = {
  transforms: [
    {
      id: 'b4df1756-9e87-4949-943a-d9c8d44c94c8',
      name: 'Accenture',
      transform:
        "{\n  'id': id,\n  'contentType': contentType = null ? null : contentType.{\n    'percipioType': percipioType,\n    'category': category != null ? category : 'COURSE',\n    'source': source,\n    'displayLabel': displayLabel\n  },\n  'localeCodes': \"en-US\" in localeCodes ? \"en-US\" : localeCodes[0],\n  'localizedMetadata': localizedMetadata ? localizedMetadata[].\n    {\n      'localeCode': localeCode,\n      'title': title,\n      'description': $boolean(description) ? description : $boolean($$.associations.parent.title) ? $$.associations.parent.title : title\n    } : []\n  ,\n  'lifecycle': lifecycle = null ? null : lifecycle.{\n    'status': status,\n    'publishDate': publishDate,\n    'lastUpdatedDate': lastUpdatedDate\n  },\n  'link': link,\n  'imageUrl': imageUrl,\n  'keywords': keywords,\n  'duration': duration,\n  'by': by,\n  'publication': publication = null ? null : publication.{\n    'copyrightYear': copyrightYear,\n    'isbn': isbn,\n    'publisher': publisher\n  },\n  'expertiseLevels': expertiseLevels,\n  'modalities': modalities,\n  'technologies': technologies ? technologies[].\n    {\n      'title': title,\n      'version': version\n    } : []\n  ,\n  'associations': associations = null ? null : associations.{\n    'areas': areas,\n    'subjects': subjects,\n    'channels': channels ? channels[].\n      {\n        'id': id,\n        'title': title,\n        'link': link\n      } : []\n    ,\n    'parent': parent = null ? null : parent.{\n      'id': id,\n      'type': type,\n      'title': title,\n      'link': link\n    }\n  }\n}",
      description: 'JSONata transform for Accenture content export',
      type: 'CONTENT_EXPORT',
      isActive: true,
      createdAt: '2019-12-23T20:05:56.394Z',
      updatedAt: '2020-08-31T09:31:45.422Z',
      systemName: 'Accenture',
      category: 'BASE',
    },
    {
      id: 'b2672218-1b64-44aa-95f4-0ea2a34f5bcb',
      name: 'CSOD',
      transform:
        "$.{\n    'ID': $.'id',\n    'Title': (\n\t    $temp := $.localizedMetadata[0].'title' = null ? '' : $extendedTitle(($getContentType($) & ' ')&($.localizedMetadata[0].'title'), $);\n\t     $result := $trim(($truncate($temp, 500, '...')));\n    ),\n    'URL': $.'link',\n    'IsActive': $.lifecycle.'status'= 'ACTIVE' ? true :false,\n    'Description': $.localizedMetadata[0].'description' = null ? '' : $truncate($.localizedMetadata[0].'description', 10000, '...'),\n    'Thumbnail': $.'imageUrl',\n    'Languages': ( \n    \t$localeCodes := null ? [] :  $.localeCodes;\n        $csodLocaleCodes := $map($localeCodes, function ($v) { $length($v) = 2 ?$replace($v, \"es\",\"es-ES\"): $v });\n        $result := $count($csodLocaleCodes) < 2 ? $append([], $csodLocaleCodes) : $csodLocaleCodes;\n        ),\n    'LastModifiedUTC': $fromMillis($toMillis($.lifecycle.'lastUpdatedDate'),'[Y0001]-[M01]-[D01]T[H01]:[m01]:[s01].[f01][Z]'),\n    'Duration': (\n            $input := ($.'duration' = null ? '' : $.'duration');\n            $time := $substringAfter($input, 'T');\n            $hours := $contains($time, 'H') ? ($substringBefore($time, 'H')) : '00';\n            $remainder := $substringAfter($time, 'H');\n            $minutes := $contains($remainder, 'M') ? $substringBefore($remainder, 'M') : '00';\n            $remainder := $substringAfter($remainder, 'M');\n            $seconds := $contains($remainder, 'S') ? $substringBefore($remainder, 'S') : '00';\n            $result = '00:00' ? '': $pad($hours, -2, \"0\") & ':' & $pad($minutes, -2, \"0\") & ':' & $pad($seconds, -2, \"0\");  \n            ),\n    'PublicationDate': $fromMillis($toMillis($.lifecycle.'publishDate'),'[Y0001]-[M01]-[D01]T[H01]:[m01]:[s01].[f01][Z]'),\n    'Modalities' : (\n    ($count($.'modalities') = 0 and\n      ($.contentType.'percipioType' = 'CHANNEL' or $.contentType.'percipioType' = 'JOURNEY')) ? ['COLLECTION'] : \n      $count($.'modalities') = 0 ? ['WATCH'] : $.'modalities' or\n    ($count($.'modalities') > 0 and \n      ($.contentType.'percipioType' = 'CHANNEL' or $.contentType.'percipioType' = 'JOURNEY')) ? $.'modalities': ['COLLECTION'] ;\n    )\n}",
      description: 'JSONata transform for CSOD',
      type: 'CONTENT_EXPORT',
      isActive: true,
      createdAt: '2019-12-23T20:05:56.394Z',
      updatedAt: '2020-08-31T09:31:45.422Z',
      systemName: 'CSOD',
      category: 'BASE',
    },
    {
      id: '9fb05dd9-9441-4d47-aef8-ed84f3371bf1',
      name: 'Degreed',
      transform:
        "$.(\n    $transformed_data := (\n      $.{\n      'UserID': $trim($lowercase(userId)),\n      'CourseID': $generateXapiIdForCompletions($),\n      'CompletionDate': ($datewithdash:=$substringBefore(completedDate,'T');$replace($datewithdash,'-','')),\n      'ContentType': $deriveContentTypeForCompletions($types, $)\n    });\n  $merge([$transformed_data, $extraColumns]);\n ) ",
      description: 'JSONata transform for Degreed learner activity report',
      type: 'LEARNER_ACTIVITY_REPORT',
      isActive: true,
      createdAt: '2020-05-06T14:53:39.020Z',
      updatedAt: '2020-08-31T09:31:45.422Z',
      systemName: 'Degreed',
      category: 'BASE',
    },
    {
      id: '1876b115-f790-4470-a72e-ca9e41fe839f',
      name: 'Degreed',
      transform:
        "$.(\n    $transformed_data := (\n      $.{\n        'ContentType': $degreedContentType($types, $),\n        'ContentID': xapiActivityId,\n        'URL': link,\n        'Delete': lifecycle.status = 'ACTIVE' ? 'N' : 'Y',\n        'Title': $formatTitle($titleFormat, $degreedContentType($types,$), 300, $),\n        'Summary': $degreedSummary($summaryFormat, 2000, $),\n        'ImageURL': imageUrl ? imageUrl : '',\n        'Duration': $degreedDuration($, $types),\n        'Language': localeCodes[0] ? $substringBefore(localeCodes[0], '-') : 'en',\n        'Provider': $provider,\n        'Format': contentType.displayLabel\n    });\n\n    $topics := $degreedTopicsObject($);\n\n    $results := $merge([$transformed_data, $topics, $extraColumns]);\n    $results;\n)",
      description: 'JSONata transform for Degreed',
      type: 'CONTENT_EXPORT',
      isActive: true,
      createdAt: '2019-12-23T20:05:56.394Z',
      updatedAt: '2020-08-31T09:31:45.422Z',
      systemName: 'Degreed',
      category: 'BASE',
    },
    {
      id: '962f94ef-d5a1-4e2d-997c-342594c5f3bb',
      name: 'Saba',
      transform:
        "$.(\n    $transformed_data := $.{\n      'ID': '',\n      'CONTENTTITLE': $formatTitle($titleFormat, $externalLmsType($types,$), 254, $),\n      'NEW_CONTENTTITLE': $formatTitle($titleFormat, $externalLmsType($types,$), 254, $),\n      'NEW_COURSETITLE': $formatTitle($titleFormat, $externalLmsType($types,$), 254, $),\n      'CONTENTFORMAT': 'URL',\n      'SPLIT': $sabaSplitValue($domainNameForActive, $domainNameForInActive, $),\n      'PLAYERTEMPLATE': $template,\n      'ZIPFILENAME': '',\n      'CREATEWBTCOURSE': 'TRUE',\n      'MOBILECOMPATIBILITY': 'allDevice-responsive',\n      'EXPIRATIONDATE': lifecycle.status = 'ACTIVE' ? '' : $substringBefore($now(), 'T'),\n      'CONTENTFOLDER': $folderName,\n      'CONTENTTYPE': 'Website',\n      'EXTERNALID': xapiActivityId,\n      'CONTENTPROVIDER': 'Percipio_URL_Vendor',\n      'DELIVERYVENDOR': 'Saba',\n      'SECURECONTEXT': '',\n      'CONTENTSERVER': 'Saba Default Content Server',\n      'LOCATIONORURL': link,\n      'LAUNCHURL': link,\n      'CONTENTDESCRIPTION': $sabaDescription($descriptionType, $),\n      'OWNER': $owner,\n      'SUREVALMRA': '',\n      'ISSCORING': 'FALSE',\n      'ESIGNATURE': '',\n      'USEAICCBRIDGE': '',\n      'ISSECURE': '',\n      'AUTHOR': $count(by) = 0 ? 'Skillsoft' : $trim($substring($join(by, ', '), 0, 255)),\n      'LANGUAGE': $sabaLocale($.localeCodes[0]),\n      'CONTENT_STATUS': lifecycle.status = 'ACTIVE' ? 'PUBLISHED' : 'ON_HOLD',\n      'COURSE_IMAGE': imageUrl ? id & '.' & $reverse($split(imageUrl, '.'))[0] : '',\n      'DESCRIPTION': $sabaDescription($descriptionType, $),\n      'DISPLAY_CALL_CENTER': lifecycle.status = 'ACTIVE' ? 'TRUE' : 'FALSE',\n      'DISPLAY_LEARNER': lifecycle.status = 'ACTIVE' ? 'TRUE' : 'FALSE',\n      'WBT_DURATION': $wbtDuration($.duration),\n      'MARK_COMPLETE_EXTERNALLY': $sabaMarkCompletion($types, $),\n      'DELIVERY_TYPE' : $sabaDeliveryType($types, $),\n      'DISCONTINUE_FROM': lifecycle.status = 'ACTIVE' ? '' : $substringBefore($now(), 'T'),\n      'KEYWORDS': $sabaKeywordsArray($),\n      'DROP_REGISTRATIONS': lifecycle.status = 'ACTIVE' ? '' : 'TRUE',\n      'DISCONTINUE_ALL_ENROLLMENTS': lifecycle.status = 'ACTIVE' ? '' : 'TRUE',\n      'REMOVE_COURSE_FROM_ALL_PLANS': lifecycle.status = 'ACTIVE' ? '' : 'TRUE',\n      'CSFILESTITLE': '',\n      'CSFILESRELATIVEPATH': '',\n      'AVAILABLEOFFLINE': '',\n      'VERSION': ''\n      };\n\n      $merge([$transformed_data, $extraColumns])\n)\n",
      description: 'JSONata transform for Saba',
      type: 'CONTENT_EXPORT',
      isActive: true,
      createdAt: '2019-12-23T20:05:56.394Z',
      updatedAt: '2020-08-31T09:31:45.422Z',
      systemName: 'Saba',
      category: 'BASE',
    },
    {
      id: '6a0c21d2-eedf-42e0-afb8-2126ad7b9070',
      name: 'SuccessFactors',
      transform:
        "$.(\r\n    $transformed_data :=\r\n      $.{\r\n        'CPNT_ID': $componentIdPrefix ? $join([$componentIdPrefix, id],'-') : id,\r\n        'CPNT_TYP_ID': $successFactorsType($types, $),\r\n        'NOTACTIVE': $.lifecycle.status = 'ACTIVE' ? 'N' : 'Y',\r\n        'CPNT_TITLE': $formatTitle($titleFormat, $successFactorsType($types, $), 300, $),\r\n        'DEL_MTH_ID':  $successFactorsType($types, $),\r\n        'HTML_CPNT_DESC': $plainString($.localizedMetadata[0].description, 3500),\r\n        'CMPL_STAT_ID': $successFactorsCompletionStat($types, $),\r\n        'CREDIT_HRS':  $isoDurationToHours($.duration),\r\n        'SHOW_IN_CATALOG': $successFactorsShowInCatalog($types, $),\r\n        'CATALOG_1': $catalog,\r\n        'APP_ID': $.id,\r\n        'BUILD_COMPANY': $buildCompany,\r\n        'CONTENT_ONLINE': 'Y',\r\n        'LAUNCH_TYPE': 3,\r\n        'PRIMARY_PARAM': $.link,\r\n        'ITEM_ONLINE': 'Y',\r\n        'MODULE_NAME': $formatTitle($titleFormat, $successFactorsType($types, $), 300, $),\r\n        'THUMBNAIL_URI': imageUrl ? $stripQueryStringandHash(imageUrl) : '',\r\n        'LAUNCH_IN_A_NEW_BWSR_WINDOW': 'Y',\r\n        'LOCALE': $successFactorsLocale($.localizedMetadata[0].localeCode),\r\n        'REV_DTE': $fromMillis($toMillis($.lifecycle.publishDate),'[MNn,*-3]-[D01]-[Y0001] [H01]:[m01]:[s01][z]','-0500'),\r\n        'CPNT_SRC_ID': 'SKILLSOFT',\r\n        'CREATE_DTE': $fromMillis($toMillis($.lifecycle.publishDate),'[MNn,*-3]-[D01]-[Y0001] [H01]:[m01]:[s01][z]','-0500'),\r\n        'CHGBCK_METHOD': 1,\r\n        'ENABLE_MOBILE_ACCESS': 'Y',\r\n        'MOBILE_PRIMARY_PARAM': $.link,\r\n        'DMN_ID': $domainId ? $domainId\r\n      };\r\n      $merge([$transformed_data, $extraColumns])\r\n) \r\n",
      description: 'JSONata transform for SuccessFactors',
      type: 'CONTENT_EXPORT',
      isActive: true,
      createdAt: '2019-12-23T20:05:56.394Z',
      updatedAt: '2020-08-31T09:31:45.422Z',
      systemName: 'SuccessFactors',
      category: 'BASE',
    },
    {
      id: '50ba645b-2e89-457a-a9a9-e6d4eb5c9f9a',
      name: 'Workday',
      transform:
        "$.{\n  'type': 'element',\n  'name': 'Row',\n  'attributes': {\n    'ss:AutoFitHeight': '0'\n  },\n  'elements': [\n    {\n      'type': 'element',\n      'name': 'Cell',\n      'attributes': {\n        'ss:Index': '2'\n      },\n      'elements': [\n        {\n          'type': 'element',\n          'name': 'Data',\n          'attributes': {\n            'ss:Type': 'Number'\n          },\n          'elements': [\n            {\n              'type': 'text',\n              'text': $counter()\n            }\n          ]\n        }\n      ]\n    },\n    {\n      'type': 'element',\n      'name': 'Cell',\n      'attributes': {\n        'ss:Index': '73'\n      },\n      'elements': [\n        {\n          'type': 'element',\n          'name': 'Data',\n          'attributes': {\n            'ss:Type': 'String'\n          },\n          'elements': [\n            {\n              'type': 'text',\n              'text': $.'id'\n            }\n          ]\n        }\n      ]\n    },\n    {\n      'type': 'element',\n      'name': 'Cell',\n      'attributes': {\n        'ss:Index': '77'\n      },\n      'elements': [\n        {\n          'type': 'element',\n          'name': 'Data',\n          'attributes': {\n            'ss:Type': 'String'\n          },\n          'elements': [\n            {\n              'type': 'text',\n              'text': $.lifecycle.'status' = 'ACTIVE' ? 'N' : 'Y'\n            }\n          ]\n        }\n      ]\n    },\n    {\n      'type': 'element',\n      'name': 'Cell',\n      'attributes': {\n        'ss:Index': '78'\n      },\n      'elements': [\n        {\n          'type': 'element',\n          'name': 'Data',\n          'attributes': {\n            'ss:Type': 'String'\n          },\n          'elements': [\n            {\n              'type': 'text',\n              'text': $.localizedMetadata[0].'title' = null ? '' : ($extendedTitle($.localizedMetadata[0].'title', $) & ($.'code' ? (' ' & $.'code') : ''))\n            }\n          ]\n        }\n      ]\n    },\n    {\n      'type': 'element',\n      'name': 'Cell',\n      'attributes': {\n        'ss:Index': '80'\n      },\n      'elements': [\n        {\n          'type': 'element',\n          'name': 'Data',\n          'attributes': {\n            'ss:Type': 'String'\n          },\n          'elements': [\n            {\n              'type': 'text',\n              'text': (\n\t\t\t\t\t\t            $desc := $.localizedMetadata[0].'description' = null ? '' : $.localizedMetadata[0].'description';\n                        $title := $.localizedMetadata[0].'title' = null ? '' : $.localizedMetadata[0].'title';\n                        $code := $.code = null ? '' : $.code;\n                        $result := $desc = '' ? ($title ? ($title & ($code ? ' ' & $code : '')) : '') : $desc\n\t\t\t\t\t            )\n            }\n          ]\n        }\n      ]\n    },\n    {\n      'type': 'element',\n      'name': 'Cell',\n      'attributes': {\n        'ss:Index': '82'\n      },\n      'elements': [\n        {\n          'type': 'element',\n          'name': 'Data',\n          'attributes': {\n            'ss:Type': 'String'\n          },\n          'elements': [\n            {\n              'type': 'text',\n              'text': 'Empower'\n            }\n          ]\n        }\n      ]\n    },\n    {\n      'type': 'element',\n      'name': 'Cell',\n      'attributes': {\n        'ss:Index': '84'\n      },\n      'elements': [\n        {\n          'type': 'element',\n          'name': 'Data',\n          'attributes': {\n            'ss:Type': 'String'\n          },\n          'elements': [\n            {\n              'type': 'text',\n              'text': 'Closed'\n            }\n          ]\n        }\n      ]\n    },\n    {\n      'type': 'element',\n      'name': 'Cell',\n      'attributes': {\n        'ss:Index': '105'\n      },\n      'elements': [\n        {\n          'type': 'element',\n          'name': 'Data',\n          'attributes': {\n            'ss:Type': 'String'\n          },\n          'elements': [\n            {\n              'type': 'text',\n              'text': 'Minutes'\n            }\n          ]\n        }\n      ]\n    },\n    {\n      'type': 'element',\n      'name': 'Cell',\n      'elements': [\n        {\n          'type': 'element',\n          'name': 'Data',\n          'attributes': {\n            'ss:Type': 'String'\n          },\n          'elements': [\n            {\n              'type': 'text',\n              'text': (\n                    $input := (duration = null ? '' : duration);\n                    $time := $substringAfter($input, 'T');\n                    $hours := $contains($time, 'H') ? $substringBefore($time, 'H') : '0';\n                    $remainder := $substringAfter($time, 'H');\n                    $minutes := $contains($remainder, 'M') ? $substringBefore($remainder, 'M') : '0';\n                    $remainder := $substringAfter($remainder, 'M');\n                    $seconds := $contains($remainder, 'S') ? $substringBefore($remainder, 'S') : '0';\n                    $result := ($number($hours) * 60) + $number($minutes) + ($number($seconds) / 60);\n                    $result = '0' ? '': $round($result)\n                    )\n            }\n          ]\n        }\n      ]\n    },\n    {\n      'type': 'element',\n      'name': 'Cell',\n      'attributes': {\n        'ss:Index': '118'\n      },\n      'elements': [\n        {\n          'type': 'element',\n          'name': 'Data',\n          'attributes': {\n            'ss:Type': 'Number'\n          },\n          'elements': [\n            {\n              'type': 'text',\n              'text': $counter()\n            }\n          ]\n        }\n      ]\n    },\n    {\n      'type': 'element',\n      'name': 'Cell',\n      'elements': [\n        {\n          'type': 'element',\n          'name': 'Data',\n          'attributes': {\n            'ss:Type': 'Number'\n          },\n          'elements': [\n            {\n              'type': 'text',\n              'text': 1\n            }\n          ]\n        }\n      ]\n    },\n    {\n      'type': 'element',\n      'name': 'Cell',\n      'elements': [\n        {\n          'type': 'element',\n          'name': 'Data',\n          'attributes': {\n            'ss:Type': 'String'\n          },\n          'elements': [\n            {\n              'type': 'text',\n              'text': 'Y'\n            }\n          ]\n        }\n      ]\n    },\n    {\n      'type': 'element',\n      'name': 'Cell',\n      'attributes': {\n        'ss:Index': '131',\n        'ss:StyleID': 's89',\n        'ss:HRef': 'http://www.google.com/'\n      },\n      'elements': [\n        {\n          'type': 'element',\n          'name': 'Data',\n          'attributes': {\n            'ss:Type': 'String'\n          },\n          'elements': [\n            {\n              'type': 'text',\n              'text': $.'link'\n            }\n          ]\n        }\n      ]\n    },\n    {\n      'type': 'element',\n      'name': 'Cell',\n      'elements': [\n        {\n          'type': 'element',\n          'name': 'Data',\n          'attributes': {\n            'ss:Type': 'String'\n          },\n          'elements': [\n            {\n              'type': 'text',\n              'text':  $.localizedMetadata[0].'title' = null ? '' : ($.localizedMetadata[0].'title' & ($.'code' ? (' ' & $.'code') : ''))\n            }\n          ]\n        }\n      ]\n    }\n  ]\n}",
      description: 'JSONata transform for Workday content export',
      type: 'CONTENT_EXPORT',
      isActive: true,
      createdAt: '2019-12-23T20:05:56.394Z',
      updatedAt: '2020-08-31T09:31:45.422Z',
      systemName: 'Workday',
      category: 'BASE',
    },
  ],
  configurations: [
    {
      id: 'd616abe1-162b-4589-9cd0-7bb47019d01d',
      transformId: '92238422-d9ad-4523-9541-fd485f153d28',
      name: 'SumTotal',
      description: 'JSONata transform config for SumTotal',
      type: 'CONTENT_EXPORT',
      configuration: {
        titleFormat: {
          type: 'NONE',
          technology: 'PREFIX',
        },
      },
      isActive: true,
      createdAt: '2020-04-30T22:27:44.447Z',
      updatedAt: '2020-08-31T09:31:45.500Z',
      systemName: 'SumTotal',
    },
    {
      id: '17d0d3b5-1f1c-4e22-9952-299ffdd68ecc',
      transformId: '962f94ef-d5a1-4e2d-997c-342594c5f3bb',
      name: 'Saba',
      description: 'JSONata transform config for Saba',
      type: 'CONTENT_EXPORT',
      configuration: {
        template: 'Percipio',
        folderName: 'PERCIPIO_CONTENT',
        domainNameForActive: 'World',
        domainNameForInActive: 'Archive',
        descriptionType: 'NO_EXTENDED_DESCRIPTION',
        owner: 'SSADMIN',
        titleFormat: {
          type: 'NONE',
          technology: 'PREFIX',
        },
        extraColumns: {},
        types: {
          audioSummary: {
            markCompleteExternally: true,
            deliveryType: 'Audiobook Summary',
            name: 'Audiobook Summary',
          },
          audioBook: {
            markCompleteExternally: true,
            deliveryType: 'Audiobook',
            name: 'Audiobook',
          },
          bookSummary: {
            markCompleteExternally: true,
            deliveryType: 'Book Summary',
            name: 'Book Summary',
          },
          book: {
            markCompleteExternally: true,
            deliveryType: 'Book',
            name: 'Book',
          },
          channel: {
            markCompleteExternally: false,
            deliveryType: 'Channel',
            name: 'Channel',
          },
          course: {
            markCompleteExternally: true,
            deliveryType: 'Course',
            name: 'Course',
          },
          linkedContent: {
            markCompleteExternally: true,
            deliveryType: 'Course',
            name: 'Course',
          },
          video: {
            markCompleteExternally: true,
            deliveryType: 'Video',
            name: 'Video',
          },
          journey: {
            markCompleteExternally: true,
            deliveryType: 'Journey',
            name: 'Journey',
          },
          default: {
            markCompleteExternally: true,
            deliveryType: 'Course',
            name: 'Course',
          },
        },
      },
      isActive: true,
      createdAt: '2020-04-03T17:05:37.490Z',
      updatedAt: '2020-08-31T09:31:45.500Z',
      systemName: 'Saba',
    },
    {
      id: '3dc53ede-2641-11ea-978f-2e728ce88125',
      transformId: '6a0c21d2-eedf-42e0-afb8-2126ad7b9070',
      name: 'SuccessFactors',
      description: 'JSONata transform configs for SuccessFactors',
      type: 'CONTENT_EXPORT',
      configuration: {
        catalog: 'EXTERNAL',
        buildCompany: 'Percipio',
        titleFormat: {
          type: 'NONE',
          technology: 'PREFIX',
        },
        componentIdPrefix: null,
        domainId: null,
        extraColumns: {},
        types: {
          audioSummary: {
            name: 'AUDIO SUMMARY',
            completionStat: 'AUDIO-BK-SUMM-COMPL',
            showInCatalog: true,
          },
          audioBook: {
            name: 'AUDIOBOOK',
            completionStat: 'AUDIO-BK-COMPL',
            showInCatalog: true,
          },
          bookSummary: {
            name: 'BOOK SUMMARY',
            completionStat: 'BOOK-SUMM-COMPL',
            showInCatalog: true,
          },
          book: {
            name: 'BOOK',
            completionStat: 'BOOK-COMPL',
            showInCatalog: true,
          },
          channel: {
            name: 'CHANNEL',
            completionStat: 'CHANNEL-COMPL',
            showInCatalog: true,
          },
          course: {
            name: 'COURSE',
            completionStat: 'COURSE-COMPL',
            showInCatalog: true,
          },
          linkedContent: {
            name: 'COURSE',
            completionStat: 'COURSE-COMPL',
            showInCatalog: true,
          },
          video: {
            name: 'VIDEO',
            completionStat: 'VIDEO-COMPL',
            showInCatalog: true,
          },
          journey: {
            name: 'JOURNEY',
            completionStat: 'JOURNEY-COMPL',
            showInCatalog: true,
          },
          default: {
            name: 'COURSE',
            completionStat: 'COURSE-COMPL',
            showInCatalog: true,
          },
        },
      },
      isActive: true,
      createdAt: '2020-02-19T19:06:38.103Z',
      updatedAt: '2020-08-31T09:31:45.500Z',
      systemName: 'SuccessFactors',
    },
    {
      id: 'cb7f80f4-4e4f-4329-82df-74bb17f9a32c',
      transformId: '497abaf0-1734-41e9-aa99-8bb1703455cd',
      name: 'SuccessFactors',
      description: 'JSONata transform configs for SuccessFactors',
      type: 'TRACKING_CONNECTOR',
      configuration: {
        catalog: 'Skillsoft',
        buildCompany: 'Percipio',
        titleFormat: 'NO_TYPE',
        types: {
          audioSummary: {
            name: 'AUDIO SUMMARY',
            completionStat: 'AUDIO-BK-SUMM-COMPL',
            showInCatalog: true,
          },
          audioBook: {
            name: 'AUDIOBOOK',
            completionStat: 'AUDIO-BK-COMPL',
            showInCatalog: true,
          },
          bookSummary: {
            name: 'BOOK SUMMARY',
            completionStat: 'BOOK-SUMM-COMPL',
            showInCatalog: true,
          },
          book: {
            name: 'BOOK',
            completionStat: 'BOOK-COMPL',
            showInCatalog: true,
          },
          channel: {
            name: 'CHANNEL',
            completionStat: 'CHANNEL-COMPL',
            showInCatalog: true,
          },
          course: {
            name: 'COURSE',
            completionStat: 'COURSE-COMPL',
            showInCatalog: true,
          },
          linkedContent: {
            name: 'COURSE',
            completionStat: 'COURSE-COMPL',
            showInCatalog: true,
          },
          video: {
            name: 'VIDEO',
            completionStat: 'VIDEO-COMPL',
            showInCatalog: true,
          },
          journey: {
            name: 'JOURNEY',
            completionStat: 'JOURNEY-COMPL',
            showInCatalog: true,
          },
          default: {
            name: 'COURSE',
            completionStat: 'COURSE-COMPL',
            showInCatalog: true,
          },
        },
      },
      isActive: true,
      createdAt: '2020-03-26T18:21:38.552Z',
      updatedAt: '2020-08-31T09:31:45.500Z',
      systemName: 'SuccessFactors',
    },
    {
      id: '34fa748b-ded5-4b33-884c-932c6894eee3',
      transformId: '1876b115-f790-4470-a72e-ca9e41fe839f',
      name: 'Degreed',
      description: 'JSONata transform config for Degreed',
      type: 'CONTENT_EXPORT',
      configuration: {
        titleFormat: {
          technology: 'PREFIX',
          type: 'NONE',
        },
        summaryFormat: 'NO_DISPLAY_LABEL',
        provider: 'Skillsoft',
        extraColumns: {},
        types: {
          audioSummary: {
            name: 'Book',
            durationFormat: 'NONE',
          },
          audioBook: {
            name: 'Book',
            durationFormat: 'NONE',
          },
          bookSummary: {
            name: 'Book',
            durationFormat: 'NONE',
          },
          book: {
            name: 'Book',
            durationFormat: 'NONE',
          },
          channel: {
            name: 'Course',
            durationFormat: 'NONE',
          },
          course: {
            name: 'Course',
            durationFormat: 'HOURS',
          },
          video: {
            name: 'Video',
            durationFormat: 'MINUTES',
          },
          journey: {
            name: 'Course',
            durationFormat: 'NONE',
          },
          linkedContent: {
            name: 'Course',
            durationFormat: 'NONE',
          },
          default: {
            name: 'Course',
            durationFormat: 'NONE',
          },
        },
      },
      isActive: true,
      createdAt: '2020-05-06T14:53:39.033Z',
      updatedAt: '2020-08-31T09:31:45.500Z',
      systemName: 'Degreed',
    },
    {
      id: '14d7ee4f-15a8-462e-8f7c-d358d0958152',
      transformId: '9fb05dd9-9441-4d47-aef8-ed84f3371bf1',
      name: 'Degreed',
      description: 'JSONata transform config for Degreed Learner Activity Report',
      type: 'LEARNER_ACTIVITY_REPORT',
      configuration: {
        types: {
          audioSummary: {
            name: 'Book',
          },
          audioBook: {
            name: 'Book',
          },
          bookSummary: {
            name: 'Book',
          },
          book: {
            name: 'Book',
          },
          channel: {
            name: 'Course',
          },
          course: {
            name: 'Course',
          },
          video: {
            name: 'Video',
          },
          journey: {
            name: 'Course',
          },
          linkedContent: {
            name: 'Course',
          },
          default: {
            name: 'Course',
          },
        },
        extraColumns: {},
      },
      isActive: true,
      createdAt: '2020-05-06T14:53:39.035Z',
      updatedAt: '2020-08-31T09:31:45.500Z',
      systemName: 'Degreed',
    },
  ],
};
