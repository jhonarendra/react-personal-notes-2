import React, { useContext } from 'react'
import LocaleContext from '../../contexts/LocaleContext'
import { appLang } from '../../utils/content'

export default function NotFoundMessage() {
  const { locale } = useContext(LocaleContext)
  return (
    <>
      <h2>404</h2>
      <p>{ appLang[locale].pageNotFound }</p>
    </>
  )
}
