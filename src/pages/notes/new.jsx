import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Editor } from 'react-draft-wysiwyg'
import {
  ContentState, convertFromHTML, EditorState, convertToRaw
} from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import AddNewPageAction from '../../components/notes/AddNewPageAction'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { addNote } from '../../utils/network-data'
import LocaleContext from '../../contexts/LocaleContext'
import { appLang, notesNewPage } from '../../utils/content'
import useInput from '../../hooks/useInput'

export default function NotesNewPages() {
  const { locale } = useContext(LocaleContext)
  const navigate = useNavigate()

  const [ title, setTitle ] = useInput('')
  const [ body, setBody ] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(notesNewPage[locale].bodyPlaceholder)
      )
    )
  )

  const onEditorStateChange = (body) => {
    setBody(body)
  }

  const handleSave = () => {
    const bodyParsed = draftToHtml(convertToRaw(body.getCurrentContent()))
    addNote({ title, body: bodyParsed })
      .then((res) => {
        if (!res.error) {
          alert(notesNewPage[locale].msgSuccess)
          navigate('/')
        }
      })
      .catch(() => {
        alert(appLang[locale].msg.error)
      })
    
  }

  return (
    <section className="add-new-page">
      <div className="add-new-page__input">
        <input
          className="add-new-page__input__title"
          placeholder={notesNewPage[locale].titlePlaceholder}
          value={title}
          onChange={setTitle}
        />
        <Editor
          editorState={body}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />
      </div>
      <AddNewPageAction
        handleSave={handleSave}
      />
    </section>

  )
}
