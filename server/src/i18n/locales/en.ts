import { Localization } from '../../framework/i18n/i18nModule'

/**
 * Not typed, as we extract type from it below, and then apply to other Localizations.
 */
const translations = {
    'malformed.json': 'Malformed JSON',
    'bad.request': 'Bad request',
    'unauthorized': 'Unauthorized',
    'forbidden': 'Forbidden',
    'internal.server.error': 'Oops, something went wrong',
    'access.forbidden': 'Access forbidden',
    'entity.not.found': 'Entity not found',
    'route.not.found': 'Route not found!',

    'random.example.message': 'Sometimes things dont go well, try again.',
}

export const en: Localization = {
    lang: 'en',
    translations: translations,
}

/**
 * Translation key type.
 * English localization is considered the default.
 * Use this when you need to enforce an existing translation key in a value (for example, ApiError's translations key).
 */
export type TranslationKey = keyof typeof translations
/**
 * Translation set type.
 * Use this when you need to enforce a valid TranslationSet (for example, when defining a new localization).
 */
export type TranslationSet = Record<TranslationKey, string>
