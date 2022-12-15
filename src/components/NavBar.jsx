import Link from 'next/link'
import React from 'react'
import { AiOutlineShopping } from 'react-icons/ai'
import { useStateContext } from '../context/stateContext';
import Cart from './Cart'

export default function NavBar() {
  const {     
    totalQuantities,
    setShowCart,
    showCart
  } = useStateContext()

  return (
    <div className='navbar-container'>
      <p className='logo'>

      <Link href="/">
        Home
      </Link>
      </p>

      <button
      className='cart-icon'
      onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
      
    </div>
  )
}