import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LocaleContext from '../contexts/LocaleContext'
import useInput from '../hooks/useInput'
import { appLang, loginPage } from '../utils/content'
import { getUserLogged, login, putAccessToken } from '../utils/network-data'

export default function LoginPage() {
  const { setAuth, locale } = useContext(LocaleContext)
  const [email, onEmailChange] = useInput('')
  const [password, onPasswordChange] = useInput('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    /**
     * 1. Login
     * 2. Simpan access token
     * 3. Ambil data user yang sedang login
     */
    login({ email, password })
      .then((res) => {
        if (!res.error) {
          putAccessToken(res.data.accessToken)
          getUserLogged()
            .then((res) => {
              if (!res.error) {
                setAuth(res.data)
              } else {
                setAuth(null)
              }
              navigate('/')
            })
            .catch(() => {
              alert(appLang[locale].msg.error)
            })
        }
      })
  }

  return (
    <section className="login-page">
      <h2>{loginPage[locale].header}</h2>
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
