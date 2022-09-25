import React, { useContext } from 'react'
import { MdLogout } from 'react-icons/md'
import AuthContext from '../../contexts/AuthContext'
import LocaleContext from '../../contexts/LocaleContext'
import { appLang } from '../../utils/content'

export default function LogoutButton() {
  const { locale } = useContext(LocaleContext)
  const { auth } = useContext(AuthContext)

  const handleLogout = () => {
    if (confirm(appLang[locale].msg.confirm)) {
      localStorage.removeItem('accessToken')
      window.location = '/'
    }
  }
  return (
    <>
    {
      auth ? (
        <button
          type="button"
          title="Logout"
          className="button-logout"
          onClick={handleLogout}
        >
          <MdLogout />
        </button>
      ) : ''
    }
    </>
  )
}
