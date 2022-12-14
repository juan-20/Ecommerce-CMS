import React, {useContext, useRef} from 'react'
import Link from 'next/link'
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping
} from 'react-icons/ai'
import {
  TiDeleteOutline
} from 'react-icons/ti'
import toast from 'react-hot-toast'

import {useStateContext} from '../context/stateContext'
import {urlFor} from '../../lib/client'

export default function Cart() {
  const cartRef = useRef();
  const {
    totalPrice, 
    totalQuantities,
    cartItems,
    setShowCart
  } = useStateContext()

  console.log(cartItems)

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className="cart-container">
        <button type="button" className='cart-heading'
        onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className='heading'>Your cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150}></AiOutlineShopping>
            <h3>Your shopping bag is empty</h3>
            <Link href='/'>
              <button
              onClick={() => setShowCart(false)} className='btn'>
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item, index) => (
              <div className="product" key={index}>
                <img src={urlFor(item?.image[0])} 
                className='cart-product-image'/>
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                    <p className='quantity-desc'>
                    <span className='minus'>
                        <AiOutlineMinus />
                    </span>
                    <span className='num'>
                        0
                    </span>
                    <span className='plus'>
                        <AiOutlinePlus />
                    </span>
                    </p>
                    </div>
                    <button type='button' className='remove-item' onClick=''>
                        <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button
              className='btn' onClick=''>
                Pay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
