import Head from 'next/head'
import React from 'react'
import Footer from './Footer'
import NavBar from './NavBar'

export default function Layout({children}) {
  return (
    <div className='layout'>
      <Head>
        <title>Loja</title>
      </Head>
      <header>
        <NavBar />
      </header>
      <main className='main-container'>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
