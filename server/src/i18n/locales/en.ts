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

    'cannot.submit.order': 'Cannot submit order',
    'insufficient.balance': 'Insufficient balance',
    'user.tier.forbidden': 'User\'s tier not allowed',
    'user.country.forbidden': 'User\'s country not allowed',
    'currency.unsupported': 'Currency not supported',
    'insufficient.region.shares': 'No available shares in region',
    'user.fetching.failed': 'Failed to fetch user data',
    'order.exists': 'An order for this user already exists',
    'possible.stablecoin.depeg': 'A possible stablecoin depeg occurred',
    'slippage.too.high': 'The exchange slippage is too high',
    'shares.quantity.mismatch': 'The order shares quantity mismatched the declared order shares quantity',
    'order.amount.mismatch': 'The order amount mismatched the declared order amount',
    'amount.exceeds.cap': 'The order amount exceeds the region\'s shares cap',
    'rate.fetching.failed': 'Failed to fetch a valid market rate',
    'referral.code.defined': 'A referral code has already been defined',
    'referral.code.invalid': 'The referral code is invalid',
    'referral.code.collision': 'A referral code collision occurred',
    'nonce.message.missing.attributes': 'Missing "notBefore" or "expirationTime"',
    'nonce.not.verified': 'The verification of a nonce failed',
    'wallet.address.already.assigned': 'Someone already has that wallet address.',
    'total.asset.quantity.exceeded': 'Total asset quantity exceeded!',
    'user.asset.quantity.exceeded': 'User asset quantity exceeded!',
    'asset.not.active': 'Asset not in currently active phase!',
    'attempted.purchasing.more': 'Attempted purchasing more assets than available!',
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
