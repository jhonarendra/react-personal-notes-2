import React, { useContext } from 'react'
import { MdLogout } from 'react-icons/md'
import LocaleContext from '../../contexts/LocaleContext'

export default function LogoutButton() {
  const { auth } = useContext(LocaleContext)

  const handleLogout = () => {
    if (confirm('Yakin ingin keluar?')) {
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
