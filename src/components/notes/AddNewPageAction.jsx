import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { HiX, HiCheck } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import PageAction from '../layout/PageAction'
import LocaleContext from '../../contexts/LocaleContext'
import { appLang } from '../../utils/content'

function AddNewPageAction({ handleSave }) {
  const {locale } = useContext(LocaleContext)
  const navigate = useNavigate()

  return (
    <PageAction page="add-new-page">
      <>
        <button
          className="action"
          type="button"
          title={appLang[locale].cancel}
          onClick={() => navigate('/')}
        >
          <HiX />
        </button>
        <button
          className="action"
          type="button"
          title={appLang[locale].add}
          onClick={() => handleSave()}
        >
          <HiCheck />
        </button>
      </>
    </PageAction>
  )
}

AddNewPageAction.propTypes = {
  handleSave: PropTypes.func.isRequired
}

export default AddNewPageAction
