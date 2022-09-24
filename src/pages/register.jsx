import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LocaleContext from '../contexts/LocaleContext'
import useInput from '../hooks/useInput'
import { appLang, registerPage } from '../utils/content'
import { register } from '../utils/network-data'

export default function RegisterPage() {
  const { locale } = useContext(LocaleContext)
  const [name, onNameChange] = useInput('')
  const [email, onEmailChange] = useInput('')
  const [password, onPasswordChange] = useInput('')
  const [confirmPassword, onConfirmPasswordChange] = useInput('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    /**
     * Validasi Konfirmasi Password
     */
    if (password !== confirmPassword) {
      alert('Konfirmasi password tidak sesuai')
    }
    /**
     * Register
     */
    register({ name, email, password })
      .then((res) => {
        if (!res.error) {
          alert(registerPage[locale].msg.registerSuccess)
          navigate('/login')
        }
      })
      .catch(() => {
        alert(appLang[locale].msg.error)
      })
  }

  return (
    <section className="register-page">
      <h2>{ registerPage[locale].header }</h2>
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
        { registerPage[locale].footer }
        {' '}
        <Link to="/login">{ registerPage[locale].footerLoginLink }</Link>
      </p>
    </section>
  )
}
