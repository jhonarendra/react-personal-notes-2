import React from 'react'
import { Link } from 'react-router-dom'
import useInput from '../hooks/useInput'

export default function LoginPage() {
  const [email, onEmailChange] = useInput('')
  const [password, onPasswordChange] = useInput('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <section className="login-page">
      <h2>Yuk, login untuk menggunakan aplikasi.</h2>
      <form className="input-login" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          minLength="6"
          maxLength="255"
          onChange={onEmailChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          minLength="6"
          maxLength="255"
          onChange={onPasswordChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="login-page__footer">
        Belum punya akun?
        {' '}
        <Link to="/register">Daftar di sini</Link>
      </p>
    </section>
  )
}
