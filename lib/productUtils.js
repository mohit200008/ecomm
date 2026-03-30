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
 * Absolute image URLs for gallery + cart + cards (backend-shaped products only).
 */
export function getProductGalleryUrls(product) {
  if (!product) return []
  if (product.imageUrl) return [product.imageUrl]
  return []
}

export function stripeLineItemImageUrl(item) {
  return item?.imageUrl || null
}
