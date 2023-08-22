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

    'vote.exists': 'Vote exists!',
    'assembly.start.time.must.be.future': 'Assembly start time must be in the future!',
    'assembly.time.period.unavailable': 'Assembly time period unavailable!',
    'assembly.archived': 'Assembly is archived!',
    'assembly.already.archived': 'Assembly is already archived!',
    'assembly.has.started': 'Assembly has started!',
    'assembly.archiving.not.allowed': 'Assembly archiving is not allowed!',
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
