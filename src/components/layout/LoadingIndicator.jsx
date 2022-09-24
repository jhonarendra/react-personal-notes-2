import React, { useContext } from 'react'
import LocaleContext from '../../contexts/LocaleContext'
import { appLang } from '../../utils/content'

export default function LoadingIndicator() {
  const { locale } = useContext(LocaleContext)
  return (
    <p className='loading-indicator'>{ appLang[locale].msg.loading }</p>
  )
}