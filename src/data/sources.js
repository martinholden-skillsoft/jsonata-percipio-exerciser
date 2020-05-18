export default {
  empty: {
    id: 'empty',
    name: 'Empty',
    type: 'empty',
    jsonata: `$.{}`,
    baseconfig: {},
    customerconfig: {},
  },
  degreedmetadata: {
    id: 'degreedmetadata',
    name: 'Degreed Metadata',
    type: 'metadata',
    jsonata: `$.(
      $transformed_data := (
        $.{
          'ContentType': $degreedContentType($types, $),
          'ContentID': xapiActivityId,
          'URL': link,
          'Delete': lifecycle.status = 'ACTIVE' ? 'N' : 'Y',
          'Title': $formatTitle($titleFormat, $degreedContentType($types,$), 300, $),
          'Summary': $degreedSummary($summaryFormat, 2000, $),
          'ImageURL': imageUrl ? imageUrl : '',
          'Duration': $degreedDuration($),
          'Language': localeCodes[0] ? $substringBefore(localeCodes[0], '-') : 'en',
          'Provider': $provider,
          'Format': contentType.displayLabel
      });
  
      $topics := $degreedTopicsObject($);
  
      $results := $merge([$transformed_data, $topics]);
      $results;
  )`,
    baseconfig: {
      titleFormat: {
        technology: 'PREFIX',
        type: 'NONE',
      },
      summaryFormat: 'NO_DISPLAY_LABEL',
      provider: 'Skillsoft',
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
    },
    customerconfig: {},
  },
  sabacloudmetadata: {
    id: 'sabacloudmetadata',
    name: 'Saba Cloud Metadata',
    type: 'metadata',
    jsonata: `$.{
      'ID': '',
      'CONTENTTITLE': $formatTitle($titleFormat, $externalLmsType($types,$), 254, $),
      'NEW_CONTENTTITLE': $formatTitle($titleFormat, $externalLmsType($types,$), 254, $),
      'NEW_COURSETITLE': $formatTitle($titleFormat, $externalLmsType($types,$), 254, $),
      'CONTENTFORMAT': 'URL',
      'SPLIT': $sabaSplitValue($domainNameForActive, $domainNameForInActive, $),
      'PLAYERTEMPLATE': $template,
      'ZIPFILENAME': '',
      'CREATEWBTCOURSE': 'TRUE',
      'MOBILECOMPATIBILITY': 'allDevice-responsive',
      'EXPIRATIONDATE': lifecycle.status = 'ACTIVE' ? '' : $substringBefore($now(), 'T'),
      'CONTENTFOLDER': $folderName,
      'CONTENTTYPE': 'Website',
      'EXTERNALID': xapiActivityId,
      'CONTENTPROVIDER': 'Percipio_URL_Vendor',
      'DELIVERYVENDOR': 'Saba',
      'SECURECONTEXT': '',
      'CONTENTSERVER': 'Saba Default Content Server',
      'LOCATIONORURL': link,
      'LAUNCHURL': link,
      'CONTENTDESCRIPTION': $sabaDescription($descriptionType, $),
      'OWNER': $owner,
      'SUREVALMRA': '',
      'ISSCORING': 'FALSE',
      'ESIGNATURE': '',
      'USEAICCBRIDGE': '',
      'ISSECURE': '',
      'AUTHOR': $count(by) = 0 ? 'Skillsoft' : $trim($substring($join(by, ', '), 0, 255)),
      'LANGUAGE': $sabaLocale($.localeCodes[0]),
      'CONTENT_STATUS': lifecycle.status = 'ACTIVE' ? 'PUBLISHED' : 'ON_HOLD',
      'COURSE_IMAGE': imageUrl ? id & '.' & $reverse($split(imageUrl, '.'))[0] : '',
      'DESCRIPTION': $sabaDescription($descriptionType, $),
      'DISPLAY_CALL_CENTER': lifecycle.status = 'ACTIVE' ? 'TRUE' : 'FALSE',
      'DISPLAY_LEARNER': lifecycle.status = 'ACTIVE' ? 'TRUE' : 'FALSE',
      'WBT_DURATION': $wbtDuration($.duration),
      'MARK_COMPLETE_EXTERNALLY': $sabaMarkCompletion($types, $),
      'DELIVERY_TYPE' : $sabaDeliveryType($types, $),
      'DISCONTINUE_FROM': lifecycle.status = 'ACTIVE' ? '' : $substringBefore($now(), 'T'),
      'KEYWORDS': $sabaKeywordsArray($),
      'DROP_REGISTRATIONS': lifecycle.status = 'ACTIVE' ? '' : 'TRUE',
      'DISCONTINUE_ALL_ENROLLMENTS': lifecycle.status = 'ACTIVE' ? '' : 'TRUE',
      'REMOVE_COURSE_FROM_ALL_PLANS': lifecycle.status = 'ACTIVE' ? '' : 'TRUE',
      'CSFILESTITLE': '',
      'CSFILESRELATIVEPATH': '',
      'AVAILABLEOFFLINE': '',
      'VERSION': ''
      }`,
    baseconfig: {
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
    customerconfig: {},
  },
  successfactorsmetadata: {
    id: 'successfactorsmetadata',
    name: 'SuccessFactors Metadata',
    type: 'metadata',
    jsonata: `$.{
      'CPNT_ID': $.id,
      'CPNT_TYP_ID': $successFactorsType($types, $),
      'NOTACTIVE': $.lifecycle.status = 'ACTIVE' ? 'N' : 'Y',
      'CPNT_TITLE': $formatTitle($titleFormat, $successFactorsType($types, $), 300, $),
      'DEL_MTH_ID':  $successFactorsType($types, $),
      'HTML_CPNT_DESC': $plainString($.localizedMetadata[0].description, 3500),
      'CMPL_STAT_ID': $successFactorsCompletionStat($types, $),
      'CREDIT_HRS':  $isoDurationToHours($.duration),
      'SHOW_IN_CATALOG': $successFactorsShowInCatalog($types, $),
      'CATALOG_1': $catalog,
      'APP_ID': $.id,
      'BUILD_COMPANY': $buildCompany,
      'CONTENT_ONLINE': 'Y',
      'LAUNCH_TYPE': 3,
      'PRIMARY_PARAM': $.link,
      'ITEM_ONLINE': 'Y',
      'MODULE_NAME': $formatTitle($titleFormat, $successFactorsType($types, $), 300, $),
      'THUMBNAIL_URI': imageUrl ? $stripQueryStringandHash(imageUrl) : '',
      'LAUNCH_IN_A_NEW_BWSR_WINDOW': 'Y',
      'LOCALE': $successFactorsLocale($.localizedMetadata[0].localeCode),
      'REV_DTE': $fromMillis($toMillis($.lifecycle.publishDate),'[MNn,*-3]-[D01]-[Y0001] [H01]:[m01]:[s01][z]','-0500'),
      'CPNT_SRC_ID': 'SKILLSOFT',
      'CREATE_DTE': $fromMillis($toMillis($.lifecycle.publishDate),'[MNn,*-3]-[D01]-[Y0001] [H01]:[m01]:[s01][z]','-0500'),
      'CHGBCK_METHOD': 1,
      'ENABLE_MOBILE_ACCESS': 'Y',
      'MOBILE_PRIMARY_PARAM': $.link
    }`,
    baseconfig: {
      catalog: 'EXTERNAL',
      buildCompany: 'Percipio',
      titleFormat: {
        type: 'NONE',
        technology: 'PREFIX',
      },
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
    customerconfig: {},
  },
  degreedlearningactivity: {
    id: 'degreedlearningactivity',
    name: 'Degreed Learning Activity',
    type: 'learneractivity',
    jsonata: `$.{ 
      'UserID': $trim($lowercase(userId)),
      'CourseID': $generateXapiIdForCompletions($),
      'CompletionDate': ($datewithdash:=$substringBefore(completedDate,'T');$replace($datewithdash,'-','')),
      'ContentType': $deriveContentTypeForCompletions($types, $)
    }`,
    baseconfig: {
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
    },
    customerconfig: {},
  },
  genericlearningactivity: {
    id: 'genericlearningactivity',
    name: 'Generic Learning Activity',
    type: 'learneractivity',
    jsonata: `$.(
      $comment := '*******************************************************';
      $comment := '*******************************************************';
      $comment := 'Example using Percipio Library Functions:';
      $comment := 'To generate xAPIActivityId and format the duration';
      $comment := '*******************************************************';
      $comment := '*******************************************************';
  
      $.{
          'username': userId,
          'assetid': contentUuid,
          'xapiactivityid': $generateXapiIdForCompletions($),
          'duration_hhmmss': $wbtDuration(duration),    
          'status': (
              $coursestatus := $lookup([{
              'started': 'INCOMPLETE',
              'completed': 'COMPLETE'
              }
              ], ($lowercase(status))); $coursestatus ? $coursestatus : 'INCOMPLETE'
          ),
          'firstaccessdate': firstAccess ? firstAccess : null,
          'lastaccessdate': lastAccess ? lastAccess : null,
          'completeddate': completedDate ? completedData : null,
          'firstscore': firstScore ? $number(firstScore) : null,
          'lastscore': lastScore ? $number(lastScore) : null,
          'highscore': highScore ? $number(highScore) : null,
          'accessCount': totalAccess ? $number(totalAccess) : null
      }
  )`,
    baseconfig: {},
    customerconfig: {},
  },
};
