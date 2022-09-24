import React from 'react'
import { Link } from 'react-router-dom'
import useInput from '../hooks/useInput'

export default function RegisterPage() {
  const [name, onNameChange] = useInput('')
  const [email, onEmailChange] = useInput('')
  const [password, onPasswordChange] = useInput('')
  const [confirmPassword, onConfirmPasswordChange] = useInput('')

  const handleSubmit = (e) => {
    e.preventDefault()
    /**
     * Validasi Konfirmasi Password
     */
    if (password !== confirmPassword) {
      alert('Konfirmasi password tidak sesuai ')
    }
  }

  return (
    <section className="register-page">
      <h2>Isi form untuk mendaftar akun.</h2>
      <form className="input-register" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onNameChange}
          minLength="6"
          maxLength="255"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={onEmailChange}
          minLength="6"
          maxLength="255"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={onPasswordChange}
          minLength="6"
          maxLength="255"
          required
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          minLength="6"
          maxLength="255"
          required
        />
        <button type="submit">Register</button>
      </form>
      <p className="register-page__footer">
        Sudah punya akun?
        {' '}
        <Link to="/login">Login di sini</Link>
      </p>
    </section>
  )
}
