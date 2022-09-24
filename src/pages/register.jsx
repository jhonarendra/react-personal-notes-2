import React from 'react'
import { Link } from 'react-router-dom'

export default function RegisterPage() {
  return (
    <section className="register-page">
      <h2>Isi form untuk mendaftar akun.</h2>
      <div className="input-register">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value="" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value="" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value="" />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" value="" />
        <button type="button">Register</button>
      </div>
      <p className="register-page__footer">
        Sudah punya akun?
        {' '}
        <Link to="/login">Login di sini</Link>
      </p>
    </section>
  )
}
