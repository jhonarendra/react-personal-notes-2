import React, { useContext } from 'react'
import LocaleContext from '../../contexts/LocaleContext'

export default function LangToggler() {
  const { locale, toggleLocale } = useContext(LocaleContext)

  return (
    <button
      type="button"
      onClick={toggleLocale}
    >
      {locale === 'id' ? 'Indonesia' : 'English'}
    </button>
  )
}
