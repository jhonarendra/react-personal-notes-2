import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <section className="login-page">
      <h2>Yuk, login untuk menggunakan aplikasi.</h2>
      <div className="input-login">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value="" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value="" />
        <button type="button">Login</button>
      </div>
      <p className="login-page__footer">
        Belum punya akun?
        {' '}
        <Link to="/register">Daftar di sini</Link>
      </p>
    </section>
  )
}
