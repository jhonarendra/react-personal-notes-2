import React, { useContext } from 'react'
import { HiPlus } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import LocaleContext from '../../contexts/LocaleContext'
import { appLang } from '../../utils/content'
import PageAction from '../layout/PageAction'

export default function HomePageAction() {
  const { locale } = useContext(LocaleContext)
  const navigate = useNavigate()

  return (
    <PageAction page="homepage">
      <button
        className="action"
        type="button"
        title={appLang[locale].add}
        onClick={() => navigate('/notes/new')}
      >
        <HiPlus />
      </button>
    </PageAction>
  )
}
