import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from './en'
import zhLocale from './zh'
import twLocale from './tw'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale
  },
  zh: {
    ...zhLocale
  },
  tw: {
    ...twLocale
  }
}

const i18n = new VueI18n({
  locale: localStorage.lang || 'tw',
  messages
})

export default i18n
