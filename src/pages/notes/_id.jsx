import React, { useContext, useEffect, useState } from 'react'
import parser from 'html-react-parser'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi'
import { showFormattedDate } from '../../utils'
import {
  archiveNote, deleteNote, getNote, unarchiveNote
} from '../../utils/network-data'
import NotesIdPageAction from '../../components/notes/NotesIdPageAction'
import NotFoundMessage from '../../components/layout/NotFoundMessage'
import { appLang, notesIdPage } from '../../utils/content'
import LocaleContext from '../../contexts/LocaleContext'

export default function NotesIdPages() {
  const { locale } = useContext(LocaleContext)
  const [note, setNote] = useState({})
  const { id } = useParams()
  const navigate = useNavigate()

  const handleEdit = () => {
    navigate(`/notes/${id}/edit`)
  }

  const handleArchive = () => {
    if (confirm(appLang[locale].msg.confirm)) {
      let methods = null
      let navigateTo = '/'
      if (note.archived) {
        methods = unarchiveNote(id)
        navigateTo = '/archives'
      } else {
        methods = archiveNote(id)
      }
      methods
        .then((res) => {
          if (!res.error) {
            navigate(navigateTo)
          }
        })
        .catch(() => {
          alert(appLang[locale].msg.error)
        })
    }
  }

  const handleDelete = () => {
    if (confirm(appLang[locale].msg.confirm)) {
      deleteNote(id).then(res => {
        if (!res.error) {
          navigate('/')
        }
      })
      .catch(() => {
        alert(appLang[locale].msg.error)
      })
    }
  }

  useEffect(() => {
    /**
     * show notes
     */
    getNote(id)
      .then((res) => {
        if (!res.error) {
          setNote(res.data)
        } else {
          alert(notesIdPage[locale].notFound)
        }
      })
      .catch(() => {
        alert(appLang[locale].msg.error)
      })
  }, [])

  return (
    <section className="detail-page">
      { 'id' in note ? (
        <>
          <Link
            to="/"
            title="Kembali"
          >
            <HiArrowLeft />
            {' '}
            Kembali
          </Link>
          <h3 className="detail-page__title">
            { note.title }
          </h3>
          <p className="detail-page__createdAt">
            {showFormattedDate(note.createdAt)}
          </p>
          <div className="detail-page__body">
            { parser(note.body) }
          </div>
        </>
      ) : (
        <NotFoundMessage />
      )}
      {/* TODO: tidak ada edit */}
      <NotesIdPageAction
        archived={note.archived || false}
        handleEdit={handleEdit}
        handleArchive={handleArchive}
        handleDelete={handleDelete}
      />
    </section>
  )
}
