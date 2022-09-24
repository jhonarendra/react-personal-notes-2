import React, { useContext } from 'react'
import LocaleContext from '../../contexts/LocaleContext'
import { notePage } from '../../utils/content'

export default function NoteListEmpty() {
  const { locale } = useContext(LocaleContext)

  return (
    <section className="notes-list-empty">
      <p className="notes-list__empty">{ notePage[locale].empty }</p>
    </section>
  )
}
