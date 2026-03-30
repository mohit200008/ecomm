import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client } from '../../lib/client';
import { fetchProductsFromBackend, getProductGalleryUrls, mapBackendProduct } from '../../lib/productUtils';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products }) => {
  const { name, details, price } = product;
  const galleryUrls = getProductGalleryUrls(product);
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  }

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={galleryUrls[index] || ''} className="product-detail-image" />
          </div>
          <div className="small-images-container">
            {galleryUrls.map((src, i) => (
              <img 
                key={i}
                src={src}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">{price}/-</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
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

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);
  const pathSet = new Set();

  const paths = [];
  for (const product of products) {
    const slug = product.slug.current;
    if (slug && !pathSet.has(slug)) {
      pathSet.add(slug);
      paths.push({ params: { slug } });
    }
  }

  try {
    const raw = await fetchProductsFromBackend();
    for (const p of raw) {
      const slug = String(p.id);
      if (!pathSet.has(slug)) {
        pathSet.add(slug);
        paths.push({ params: { slug } });
      }
    }
  } catch (_) {
    /* backend optional at build time */
  }

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug }}) => {
  const productsQuery = '*[_type == "product"]'
  const sanityQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;

  let product = await client.fetch(sanityQuery);
  let products = await client.fetch(productsQuery);

  if (!product) {
    try {
      const raw = await fetchProductsFromBackend();
      const match = raw.find((p) => String(p.id) === slug);
      if (match) {
        product = mapBackendProduct(match);
        products = raw.map(mapBackendProduct);
      }
    } catch (err) {
      console.warn('Product page backend fallback failed:', err.message);
    }
  }

  if (!product) {
    return { notFound: true };
  }

  return {
    props: { products, product },
  }
}

export default ProductDetails