import { urlFor } from './client'

export const getApiBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

export function mapBackendProduct(apiProduct) {
  const price = apiProduct.price
  const numericPrice =
    typeof price === 'number' ? price : parseFloat(String(price), 10)

  return {
    _id: `backend-${apiProduct.id}`,
    name: apiProduct.name,
    details: apiProduct.description,
    price: numericPrice,
    slug: { current: String(apiProduct.id) },
    imageUrl: apiProduct.imageUrl,
  }
}

export async function fetchProductsFromBackend() {
  const res = await fetch(`${getApiBaseUrl()}/api/products`)
  if (!res.ok) throw new Error(`Products API failed: ${res.status}`)
  return res.json()
}

/**
 * Absolute image URLs for gallery + cart + cards (Sanity or backend-shaped product).
 */
export function getProductGalleryUrls(product) {
  if (!product) return []
  if (product.imageUrl) return [product.imageUrl]
  if (!product.image?.length) return []
  return product.image.map((img) => urlFor(img))
}

export function stripeLineItemImageUrl(item) {
  if (item.imageUrl) return item.imageUrl
  const ref = item.image?.[0]?.asset?._ref
  if (!ref) return null
  return ref
    .replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/')
    .replace('-webp', '.webp')
}
