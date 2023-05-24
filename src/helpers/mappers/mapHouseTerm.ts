import { useI18n } from 'vue-i18n'
import { R_HOUSE_TERM } from '../../types'

export function mapTermTranslations (term: R_HOUSE_TERM) {
  const { t } = useI18n()

  switch (term) {
    case R_HOUSE_TERM.AnyTerm: return t('houses.terms.any_term')
    case R_HOUSE_TERM.CoupleNights: return t('houses.terms.couple_nights')
    case R_HOUSE_TERM.FewWeeks: return t('houses.terms.few_weeks')
    case R_HOUSE_TERM.SeveralDays: return t('houses.terms.several_days')
    case R_HOUSE_TERM.ToVictory: return t('houses.terms.to_victory')
    default: return term
  }
}
