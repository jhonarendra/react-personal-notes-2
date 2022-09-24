import React, { useContext, useEffect, useState } from 'react'
import HomepageAction from '../components/index/HomePageAction'
import LoadingIndicator from '../components/layout/LoadingIndicator'
import NoteListEmpty from '../components/notes/NoteListEmpty'
import NotesList from '../components/notes/NotesList'
import LocaleContext from '../contexts/LocaleContext'
import { appLang, notePage } from '../utils/content'
import { getActiveNotes } from '../utils/network-data'

export default function IndexPage() {
  const { locale } = useContext(LocaleContext)
  const [dataNotes, setDataNotes] = useState([]) // all notes from api
  const [initNotes, setInitNotes] = useState(false) // flag sudah ambil notes dari api
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState([]) // filtered notes
  const [search, setSearch] = useState('')

  // TODO: useInputs
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  /**
   * Inisialisasi data notes dari api
   */
  const initNotesFromApi = () => {
    getActiveNotes()
      .then((res) => {
        if (!res.error) {
          setDataNotes(res.data)
          setNotes(res.data)
          setInitNotes(true)
          setLoading(false)
        }
      })
      .catch(() => {
        alert(appLang[locale].msg.error)
      })
  }

  useEffect(() => {
    if (!initNotes) {
      initNotesFromApi()
    }

    /**
     * Jika sudah init notes
     * filter dari memory local
     */
    if (initNotes) {
      let tempDataNotes = [...dataNotes]
      if (search !== '') {
        tempDataNotes = tempDataNotes.filter((note) => note.title.toLowerCase().includes(search.toLowerCase()))
      }
      setNotes(tempDataNotes)
    }
    
  }, [search])
  return (
    <section className="homepage">
      <h2>{ notePage[locale].header }</h2>
      <section className="search-bar">
        <input
          type="text"
          placeholder={notePage[locale].searchPlaceholder}
          value={search}
          onChange={handleSearch}
        />
      </section>
      {(notes.length > 0 && !loading) ? <NotesList notes={notes} /> : ''}
      {(notes.length === 0 && !loading) ? <NoteListEmpty /> : ''}
      {loading ? <LoadingIndicator /> : ''}
      <HomepageAction />
    </section>
  )
}
