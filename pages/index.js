import React from 'react'

import { Product, FooterBanner, HeroBanner } from '../components'
import { fetchProductsFromBackend, mapBackendProduct } from '../lib/productUtils'

const Home = ({ products }) => {
  // Temporarily hardcoded banners (Step 4 option A).
  const heroBanner = {
    smallText: 'Beats Solo',
    midText: 'Summer Sale',
    largeText1: 'Bass',
    product: '1',
    buttonText: 'Shop Now',
    desc: 'Get the best deals on speakers',
    imageUrl: 'https://placehold.co/1200x600/png?text=Summer+Sale',
  }

  const footerBanner = {
    discount: '25%',
    largeText1: 'Bass',
    largeText2: 'Loaded',
    saleTime: '28Aug to 10 Sep',
    smallText: 'Music felt amazing',
    midText: 'Summer Sale',
    product: '2',
    buttonText: "Let's get started",
    desc: 'Best headphones in the market',
    imageUrl: 'https://placehold.co/1200x600/png?text=Best+Headphones',
  }

  return (
    <div>
      <HeroBanner heroBanner={heroBanner} />
      <div className="products-heading">
         <h2>Best Selling Products</h2>
         <p>Speakers of many variations</p>
      </div>

      <div className="products-container">
          {
            products?.map(
              (product) => <Product key={product._id} product={product} />
              )}
      </div>

      <FooterBanner footerBanner={footerBanner} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const raw = await fetchProductsFromBackend()
  const products = raw.map(mapBackendProduct)

  return {
    props: { products },
  }
}

export default Home