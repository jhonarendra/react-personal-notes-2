import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LocaleContext from '../../contexts/LocaleContext'
import { appLang } from '../../utils/content'
import LangToggler from './LangToggler'
import LogoutButton from './LogoutButton'
import ThemeToggler from './ThemeToggler'

export default function NavMenu() {
  const { auth, locale } = useContext(LocaleContext)
  const { pathname } = useLocation()
  return (
    <>
      {
        auth ? (
          <nav className="navigation">
            <ul>
              <li>
                {pathname !== '/archives'
                  ? <Link to="/archives" title={appLang[locale].nav.archives}>{appLang[locale].nav.archives}</Link>
                  : <Link to="/" title={appLang[locale].nav.archives}>{appLang[locale].nav.home}</Link>}

              </li>
            </ul>
          </nav>
        ) : ''
      }
      <LangToggler />
      <ThemeToggler />
      <LogoutButton />
    </>
  )
}
