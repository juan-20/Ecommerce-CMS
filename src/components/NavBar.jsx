import Link from 'next/link'
import React from 'react'
import { AiOutlineShopping } from 'react-icons/ai'

export default function NavBar() {
  return (
    <div className='navbar-container'>
      <p className='logo'>

      <Link href="/">
        Home
      </Link>
      </p>

      <button
      className='cart-icon'>
        <AiOutlineShopping />
        <span className='cart-item-qty'>2</span>
      </button>

    </div>
  )
}
