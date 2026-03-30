import React from 'react'
import Link from 'next/link'

import { getProductGalleryUrls } from '../lib/productUtils.js'

const Product = ({ product }) => {
  const { name, slug, price } = product
  const gallery = getProductGalleryUrls(product)
  const src = gallery[0] || ''

  return (
    <div>
       <Link href={`/product/${slug.current}`}>
         <div className="product-card">
           <img 
             src={src}
             width={250}
             height={250}
             className="product-image"
           />
           <p className="product-name">{name}</p>
           <p className="product-price">{price}/-</p>
         </div>
       </Link>
    </div>
  )
}

export default Product