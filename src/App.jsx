import React, { useEffect, useMemo, useState } from 'react'
import {
  Link, Navigate, Route, Routes
} from 'react-router-dom'

import IndexPage from './pages'
import NotFoundPages from './pages/not-found'
import ArchivesPage from './pages/archives'
import NotesIdPages from './pages/notes/_id'
import NotesNewPages from './pages/notes/new'
import NavMenu from './components/layout/NavMenu'
import NotesIdEditPages from './pages/notes/_id-edit'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import LocaleContext from './contexts/LocaleContext'
import { appLang } from './utils/content'
import { getUserLogged } from './utils/network-data'
import RouteMiddleware from './middleware/RouteMiddleware'

function App() {
  const [auth, setAuth] = useState(null)
  const [locale, setLocale] = useState('id')
  const [loading, setLoading] = useState(true)

  const toggleLocale = () => {
    localStorage.setItem('locale', (locale === 'id' ? 'en' : 'id'))
    setLocale((prevLocale) => (prevLocale === 'id' ? 'en' : 'id'))
  }

  const localeContextValue = useMemo(() => ({
    locale,
    toggleLocale,
    auth,
    setAuth
  }), [locale, auth])

  useEffect(() => {
    /**
     * Get User Logged
     */
    getUserLogged().then((res) => {
      if (!res.error) {
        setAuth(res.data)
      } else {
        setAuth(null)
      }
      setLoading(false)
    })

    /**
     * Inisialisasi Locale
     */
    if (localStorage.locale && ['id', 'en'].includes(localStorage.locale)) {
      setLocale(localStorage.locale)
    }
  }, [])

  return (
    <LocaleContext.Provider value={localeContextValue}>
      {
        loading ? (
          <p>Loading...</p>
        ) : (
          <div className="app-container">
            <header>
              <h1>
                <Link to="/">{appLang[locale].title}</Link>
              </h1>
              <NavMenu />
            </header>
            <main>
              <Routes>
                <Route
                  path="/"
                  element={(
                    <RouteMiddleware middleware="auth">
                      <IndexPage />
                    </RouteMiddleware>
                  )}
                />
                <Route
                  path="/login"
                  element={(
                    <RouteMiddleware middleware="public">
                      <LoginPage />
                    </RouteMiddleware>
                  )}
                />
                <Route
                  path="/register"
                  element={(
                    <RouteMiddleware middleware="public">
                      <RegisterPage />
                    </RouteMiddleware>
                    )}
                />
                <Route
                  path="/archives"
                  element={(
                    <RouteMiddleware middleware="public">
                      <ArchivesPage />
                    </RouteMiddleware>
                  )}
                />
                <Route
                  path="/notes"
                  element={(
                    <RouteMiddleware middleware="public">
                      <Navigate to="/" replace />
                    </RouteMiddleware>
                  )}
                />
                <Route
                  path="/notes/new"
                  element={(
                    <RouteMiddleware middleware="public">
                      <NotesNewPages />
                    </RouteMiddleware>
                  )}
                />
                <Route
                  path="/notes/:id"
                  element={(
                    <RouteMiddleware middleware="public">
                      <NotesIdPages />
                    </RouteMiddleware>
                  )}
                />
                <Route
                  path="/notes/:id/edit"
                  element={(
                    <RouteMiddleware middleware="public">
                      <NotesIdEditPages />
                    </RouteMiddleware>
                  )}
                />
                <Route
                  path="*"
                  element={<NotFoundPages />}
                />
              </Routes>
            </main>
          </div>
        )
      }

    </LocaleContext.Provider>
  )
}

export default App
