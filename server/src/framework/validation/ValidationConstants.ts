
export const MIN_TEXT_LENGTH = 3 // smallest meaningful length
export const SMALL_TEXT_LENGTH = 63 // 2^6 -1
export const MEDIUM_TEXT_LENGTH = 255 // 2^8 -1
export const LARGE_TEXT_LENGTH = 2047 // 2^11 -1
export const UNLIMITED_TEXT_LENGTH = 32767 // 2^15 -1

/**
 * emailregex.com
 */
export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const DATETIME_ISO_8601_REGEX = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i
