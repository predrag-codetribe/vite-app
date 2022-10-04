const fetch = require('node-fetch')
const parse = require('csv-parse/lib/sync')
var fs = require('fs')

// Make sure to make the sheet link public.
// https://docs.google.com/spreadsheets/d/1K_x4QuXsqTUSwouEVl_j6EZpWAcNHJaEb7nCeCkTb6A/edit#gid=0
//                        GOOGLE_DOC_ID - ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^          ^^^^^^^^^^
const GOOGLE_DOC_ID = '12hWS6eq6ISR51NqYbYN5pTpaX5EPZ-5zFwnE-8TxZoo',
    GID = 0,
    supportedLanguages = ['en', 'sr']
//                   ^^^^^^^^^^^^ language values in the sheet, make sure that they match the value in the sheet


async function main() {
    const sheetCSV = await fetch(`https://docs.google.com/spreadsheets/d/${GOOGLE_DOC_ID}/gviz/tq?tqx=out:csv&gid=${GID}`)
    const textCSV = await sheetCSV.text()

    parseAndMoveTranslations(textCSV)
}

main()

function parseAndMoveTranslations(input) {
    const records = parse(input, {
        columns: true,
        skip_empty_lines: true
    })

    for (let locale of supportedLanguages) {
        let translations = {
            // will look like
            // "welcome.hello": "hello you {{name}}",
        }

        // stop the script if the sheet is missing required header columns
        records.length && throwIfMissingRequiredKey(records[0])

        for (let record of records) {
            let translationKey = record.KEY.trim()
            if (translationKey && !record['en'] ) {
                // skip translations that only have the translation key filled,
                // to allow adding coments int the sheet like:
                //
                // KEY                    | en
                // Users page             |             << this row skipped
                // users_page.create_user | Create user
                // users_page.edit_user   | Edit user
                continue
            }

            if (!translationKey) continue
            //                  "welcome.hello"              =  "hello"
            translations[translationKey] = record[locale]
        }

        // wirte translations to the directory
        fs.writeFileSync(
            `./src/i18n/locales/${locale}.json`,
            JSON.stringify(translations, null, 4),
            { encoding:'utf8', flag:'w' }
        )
    }
}

function throwIfMissingRequiredKey(record) {
    const requiredKeys = ['KEY', ...supportedLanguages]
    const recordKeys = Object.keys(record)
    for (let requiredKey of requiredKeys) {
        if (!recordKeys.includes(requiredKey)) {
            throw Error(`record is missing the required key: "${requiredKey}".\nThe following keys are reqired: ${requiredKeys.join(', ')}.`)
        }
    }
}

