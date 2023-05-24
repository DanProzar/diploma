import { useI18n } from 'vue-i18n'

export function required (v: string, msg = '') {
  return !!v || msg
}

export function email (v: string, msg = '') {
  if (v) {
    v = v.trim()
  }

  // General Email Regex (RFC 5322 Official Standard) - https://emailregex.com/
  // eslint-disable-next-line max-len, no-control-regex
  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21-\x5A\x53-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])+)\])/

  return emailRegex.test(v) || msg
}

export function match (v1: string, v2: string, msg: string) {
  return v1.toString() === v2.toString() || msg
}

export function min (v: string | number | Array<string | number>, value: number, msg: string) {
  if (
    typeof v == 'string'
    || Array.isArray(v)
  ) {
    return v.length >= value || msg
  }

  return v >= value || msg
}

export function max (v: string | number | Array<string | number>, value: number, msg: string) {
  if (
    typeof v == 'string'
    || Array.isArray(v)
  ) {
    return v.length < value || msg
  }

  return v < value || msg
}

export function normalizePhoneNumber (phone: string) {
  return phone
    .replace(/\s/g, '')
    .replace('(', '')
    .replace(')', '')
}

export function useRules () {
  const t = useI18n().t

  return {
    required: (v: string) => required(v, t('validators.required')),
    email: (v: string) => email(v, t('validators.email')),
    password_match: (v1: string, v2: string) => match(v1, v2, t('validators.password.match')),
    password_min: (v: string | number) => min(v, 6, t('validators.password.minLength')),
    count_people_min: (v: string | number) => min(v, 1, t('validators.count_people.min')),
    count_people_max: (v: string | number) => max(v, 100, t('validators.count_people.max')),
    min_input_file_count: (v: string[]) => min(v, 1, t('validators.photos.min')),
    max_input_file_count: (v: string[]) => max(v, 20, t('validators.photos.min')),
  }
}
