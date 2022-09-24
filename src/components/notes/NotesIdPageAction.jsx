import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineTrash } from 'react-icons/hi'
import { BiArchiveIn, BiArchiveOut } from 'react-icons/bi'
import PageAction from '../layout/PageAction'
import LocaleContext from '../../contexts/LocaleContext'
import { appLang } from '../../utils/content'

function NotesIdPageAction({
  archived, handleArchive, handleDelete
}) {
  const { locale } = useContext(LocaleContext)
  return (
    <PageAction page="detail-page">
      <>
        <button
          className="action"
          type="button"
          title={archived ? appLang[locale].active : appLang[locale].archive}
          onClick={() => handleArchive()}
        >
          {archived ? <BiArchiveOut /> : <BiArchiveIn />}
        </button>
        <button
          className="action"
          type="button"
          title={appLang[locale].delete}
          onClick={() => handleDelete()}
        >
          <HiOutlineTrash />
        </button>
      </>
    </PageAction>
  )
}

NotesIdPageAction.propTypes = {
  archived: PropTypes.bool.isRequired,
  handleArchive: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default NotesIdPageAction
