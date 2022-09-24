import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ContentState, convertFromHTML, convertToRaw, EditorState
} from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { HiArrowLeft } from 'react-icons/hi'
import draftToHtml from 'draftjs-to-html'
import { editNote, getNote } from '../../utils/network-data'
import NotesIdEditPageAction from '../../components/notes/NotesIdEditPageAction'
import NotFoundMessage from '../../components/layout/NotFoundMessage'
import LocaleContext from '../../contexts/LocaleContext'
import { appLang, notesIdPage, notesNewPage } from '../../utils/content'

export default function NotesIdEditPages() {
  const { locale } = useContext(LocaleContext)
  // TODO: loading
  const [form, setForm] = useState({
    id: '',
    archived: false,
    title: '',
    body: EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(notesNewPage[locale].bodyPlaceholder)
      )
    )
  })
  const { id } = useParams()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm((data) => ({ ...data, title: e.target.value }))
  }

  const onEditorStateChange = (body) => {
    setForm((data) => ({ ...data, body }))
  }

  const handleSave = () => {
    const { title } = form
    const body = draftToHtml(convertToRaw(form.body.getCurrentContent()))
    editNote({ id, title, body })
    navigate(`/notes/${id}`)
  }

  useEffect(() => {
    /**
     * show notes
     */
    getNote(id)
    .then((res) => {
      if (!res.error) {
        const { title, archived, body } = res.data
        setForm({
          id,
          title,
          archived,
          body: EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(body)
            )
          )
        })
      } else {
        alert(notesIdPage[locale].notFound)
      }
    })
    .catch(() => {
      alert(appLang[locale].msg.error)
    })
  }, [])

  return (
    <section className="edit-page">
      { form.id !== '' ? (
        <>
          <Link
            to="/"
            title="Kembali"
          >
            <HiArrowLeft />
            {' '}
            Kembali
          </Link>
          <div className="edit-page__input">
            <input
              className="edit-page__input__title"
              placeholder="Judul"
              value={form.title}
              onChange={handleChange}
            />
            <Editor
              editorState={form.body}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
            />
          </div>
        </>
      ) : (
        <NotFoundMessage />
      )}

      <NotesIdEditPageAction
        handleSave={handleSave}
      />
    </section>
  )
}
