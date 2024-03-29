/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { client, urlFor } from '../../../lib/client';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from  'react-icons/ai'
import Product from '../../components/Product';
import { useStateContext } from '../../context/stateContext';
import Image from 'next/image';

export default function ProductPage({product, products}) {
    const {image, name, details, price} = product

    const [index, setIndex] = useState(0)

    const {     
        qty,
        increaseQuantity,
        decreaseQuantity,
        onAdd
    } = useStateContext()

  return (
    <div>
        <div className="product-detail-container">
            <div>
                <div className="image-container">
                    <img 
                    src={urlFor(image && image[index])} alt="" 
                    className='product-detail-image'/>
                </div>
                <div className="small-images-conatiner">
                    {image?.map((item, i) => (
                        <Image
                        key={i}
                        alt='teste'
                        src={urlFor(item)}
                        className={i === index ? 'small-image selected-image' : 'small-image'}
                        onMouseEnter={() => setIndex(i)}
                        />
                    ))}
                </div>
            </div>

            <div className="product-detail-desc">
               <h1>{name}</h1> 
               <div className="reviews">
                <div className="">
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiOutlineStar />
                    </div>
               <p>(20)</p>
               </div>
               <h4>Details: </h4>
               <p>{details}</p>
               <p className='price'>R$ {price}</p>
               <div className="quantity">
                <h3>Quantity:</h3>
                <p className='quantity-desc'>
                    <span 
                    className='minus'
                    onClick={decreaseQuantity}
                    >
                        <AiOutlineMinus />
                    </span>


                    <span 
                    className='num'
                    onClick=''
                    >
                        {qty}
                    </span>
                    <span 
                    className='plus'
                    onClick={increaseQuantity}
                    >
                        <AiOutlinePlus />
                    </span>
                </p>
               </div>
               <div className="buttons">
                <button type='button'
                className='add-to-cart'
                onClick={() => onAdd(product, qty)}>
                    Add to cart
                </button>
                <button type='button'
                className='buy-now'>
                    Buy now
                </button>
               </div>
            </div>
        </div>

        <div className="maylike-products-wrapper">
            <h2>You may also like</h2>
            <div className="marquee">
                <div className="maylike-products-container track">
                    {products.map((item) => (
                        <Product key={item._id} product={item} />
                    ))}
                </div>
            </div>
        </div>

    </div>
  )
}

export const getStaticProps = async ({params: {slug}}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);
  
    return {
      props: { products , product }
    }
  }

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }
    `;

    const products = await client.fetch(query);

    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }

}