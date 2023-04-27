import 'react-i18next'

declare module 'react-i18next' {
    // add i18n translations type safty-https://stackoverflow.com/questions/58277973/how-to-type-check-i18n-dictionaries-with-typescript#answer-65348832
    export type Resources = {
        translation: typeof import('./i18n/generatedLocales/en.json')
    }
}
