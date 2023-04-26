import { logOutput } from '../logging/LogOutput'
import { TranslationKey } from '../../i18n/locales/en'

type TranslationValue = string
/**
 * Translations key-value pairs.
 */
type Translations = Record<TranslationKey, TranslationValue>

export type Localization = {
    lang: LanguageCode
    translations: Translations
}

const DEFAULT_LANGUAGE: LanguageCode = 'en'

/**
 * i18n module for message localization.
 */
export class i18nModule {

    private readonly langTranslationsMap: Record<LanguageCode, Translations> = {} as Record<LanguageCode, Translations>

    constructor(...localizations: Localization[]) {
        localizations.forEach(localizations => {
            this.langTranslationsMap[localizations.lang] = localizations.translations
        })
    }

    translate(translationKey: TranslationKey, acceptedLanguages: LanguageCode[]): TranslationValue {
        const translationSet: Translations = this.getTranslationSet(acceptedLanguages)

        const translation: TranslationValue = translationSet[translationKey]

        if (!translation) {
            logOutput.error(`Translation missing for key (${translationKey})!`)
            // this should never happen in theory
            // fallback, return translation key
            return translationKey
        }

        return translation
    }

    private getTranslationSet(acceptedLanguages: LanguageCode[]): Translations {
        for (const acceptedLang of acceptedLanguages) {
            if (this.langTranslationsMap[acceptedLang]) {
                return this.langTranslationsMap[acceptedLang]
            }
        }

        logOutput.warn(`Languages not available: (${acceptedLanguages}) falling back to english...`)
        return this.langTranslationsMap[DEFAULT_LANGUAGE]
    }
}
