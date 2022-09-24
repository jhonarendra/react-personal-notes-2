import React from 'react'
import { MdLogout } from 'react-icons/md'

export default function LogoutButton() {
  const handleLogout = () => {
    if (confirm('Yakin ingin keluar?')) {
      alert('berhasil')
    }
  }
  return (
    <button
      type="button"
      title="Logout"
      className="button-logout"
      onClick={handleLogout}
    >
      <MdLogout />
    </button>
  )
}
