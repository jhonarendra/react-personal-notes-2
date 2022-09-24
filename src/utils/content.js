const appLang = {
  id: {
    title: 'Aplikasi Catatan',
    nav: {
      home: 'Beranda',
      archives: 'Arsip'
    },
    msg: {
      error: 'Ada kesalahan teknis. Coba lagi nanti.'
    }
  },
  en: {
    title: 'Notes App',
    nav: {
      home: 'Home',
      archives: 'Archives'
    },
    msg: {
      error: 'Error. Try again later.'
    }
  }
}

const loginPage = {
  id: {
    header: 'Yuk, login untuk menggunakan aplikasi.',
    footer: 'Belum punya akun?',
    footerRegisterLink: 'Daftar disini'
  },
  en: {
    header: 'Login to use app, please.',
    footer: 'Don\'t have an account?',
    footerRegisterLink: 'Register here'
  }
}

const registerPage = {
  id: {
    header: 'Isi form untuk mendaftar akun.',
    footer: 'Sudah punya akun?',
    footerLoginLink: 'Login disini',
    msg: {
      registerSuccess: 'Akun berhasil dibuat. Silahkan login.'
    }
  },
  en: {
    header: 'Fill the form to register account.',
    footer: 'Already have an account?',
    footerLoginLink: 'Login here',
    msg: {
      registerSuccess: 'User created successfully.'
    }
  }
}

export { appLang, loginPage, registerPage }
