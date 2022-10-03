const path = require('path')
const findInFiles = require('find-in-files')
/*
This script *tries* to find unused tranlations. :)
Do not expect 100% perfect detection, but it should give good enough results.

This script can detect:
```
t('some_translation_key') // can be detected
let x: TranslationKey = "some_translation_key" // can be detected, because of the use of `t()`
let x = "some_translation_key" as TranslationKey // can be detected, because of the use of TranslationKey
<Trans i18nKey="some_translation_key"` /> can be detected, because of the use of prop i18nKey
```

This script cannot detect:
```
{message: "some_translation_key"} // cannot be detected.
```
A way to solve it is to use the `as TranslationKey`
```
{message: "some_translation_key" as TranslationKey} // can be detected, because of the use of TranslationKey
```

You can tweak the linePatternsThatMayContainTranslations to extend the detection of lines with translations.
You can twaek the ignoreTranslations to ignore some translations.
*/

const translations = require('../src/i18n/locales/en.json')
const targetDir = path.join(__dirname, '..', 'src')
const targetFiles = '(.ts|.tsx|.js|.jsx)$'

/**
 * Regex patterns that should detect a translation key.
 * Specify them here:
 */
const linePatternsThatMayContainTranslations = [
    /.*t\(.*/, // should find `{t('some_key')}` or `i18n.t('some_key')` calls
    /.*TranslationKey.*/, // should find `message: "some_key" as TranslationKey` or `let title: TranslationKey = "some_key"`
    /.*i18nKey.*/ // should find `<Trans i18nKey="diversity_page.openness.effects"`
]

/**
 * There are some translations that shuold be ignored.
 * Specify them here:
 */
const ignoreTranslations = [
    // /^enums/, // dynamically generated
    // /^hello_processing.error_code/, // dynamically generated
    // /^assessment_detail.*mid/, // dynamically generated
    // /^assessment_detail.*high/, // dynamically generated
]

// --- You should not be interested in the bellow, but you can take a look.
const allTranslationKeys = Object.keys(translations)
const notIgnoredTranslationKeys = allTranslationKeys.filter(translationKey => !isIgnored(translationKey))

/**
 * Ignore thanslations that are dynamically generated like `t{`some_key.{dynamicValue}`}`
 * @param      {string}  translationKey   The value
 * @return     {boolean}  { description_of_the_return_value }
 */
function isIgnored(translationKey) {
    return ignoreTranslations.some(ignoredTraslationRegex => ignoredTraslationRegex.test(translationKey))
}

async function main() {
    const linesThatMaybeContainTranslations = []

    for (const pattern of linePatternsThatMayContainTranslations) {
        const results = await findInFiles.find(pattern, targetDir, targetFiles)
        const linesWithTranslations = extractLinesFromResults(results)
        linesThatMaybeContainTranslations.push(...linesWithTranslations)
    }

    const unusedKeys = notIgnoredTranslationKeys.filter(translationKey => {
        return !linesThatMaybeContainTranslations.some(line => line.includes(translationKey))
    })

    console.log(`Found ${unusedKeys.length} unused keys:`)
    console.log(unusedKeys)
}

main()

/**
 * @param      {Results}  results  The results
 * @return     {string[]}   The used translations.
 */
function extractLinesFromResults(results) {
    /** @type {string[]} */
    let usedTranslations = []

    for (const fileName in results) {
        const result = results[fileName]
        usedTranslations = usedTranslations.concat(result.matches)
    }
    return usedTranslations
}
