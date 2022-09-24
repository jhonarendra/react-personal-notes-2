import React, { useContext } from 'react'
import { MdLogout } from 'react-icons/md'
import LocaleContext from '../../contexts/LocaleContext'
import { appLang } from '../../utils/content'

export default function LogoutButton() {
  const { auth, locale } = useContext(LocaleContext)

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
