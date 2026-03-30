import React from 'react'

import { Product, FooterBanner, HeroBanner } from '../components'
import { client } from '../lib/client'
import { fetchProductsFromBackend, mapBackendProduct } from '../lib/productUtils'

const Home = ({ products, bannerData }) => {
  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      {console.log(bannerData)}
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

      <FooterBanner footerBanner={bannerData && bannerData[0]}  />
    </div>
  )
}

export const getServerSideProps = async () => {
  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  let products
  try {
    const raw = await fetchProductsFromBackend()
    products = raw.map(mapBackendProduct)
  } catch (err) {
    console.warn('Backend products unavailable, using Sanity:', err.message)
    const query = '*[_type == "product"]'
    products = await client.fetch(query)
  }

  return {
    props: { products, bannerData },
  }
}

export default Home