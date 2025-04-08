import ProductView from "@/components/views/product-view"

interface ProductPageProps {
  params: Promise<{ productId: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params
  return <ProductView productId={productId} />
}