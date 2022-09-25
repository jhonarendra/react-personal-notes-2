import React, { useEffect, useMemo, useState } from 'react'
import Routes from './routes'
import LocaleContext from './contexts/LocaleContext'
import AuthContext from './contexts/AuthContext'
import { getUserLogged } from './utils/network-data'
import LoadingIndicator from './components/layout/LoadingIndicator'
import HeaderComponent from './components/layout/HeaderComponent'

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
  }), [locale])

  const authContextValue = useMemo(() => ({
    auth,
    setAuth
  }), [auth])

  useEffect(() => {
    /**
     * Get User Logged
     */
    getUserLogged()
      .then((res) => {
        if (!res.error) {
          setAuth(res.data)
        } else {
          setAuth(null)
        }
        setLoading(false)
      })
      .catch(() => {
        alert('Error')
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
      <AuthContext.Provider value={authContextValue}>
        <div className="app-container">
          <HeaderComponent />
          <main>
            {
              loading ? (
                <LoadingIndicator />
              ) : (
                <Routes />
              )
            }
          </main>
        </div>
      </AuthContext.Provider>
    </LocaleContext.Provider>
  )
}

export default App
