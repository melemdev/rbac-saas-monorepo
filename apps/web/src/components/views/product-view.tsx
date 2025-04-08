"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { ProductForm } from "@/components/forms/product-form"
import { useProduct, useUpdateProduct } from "@/lib/api/hooks/use-products"
import { toast } from "sonner"
import { ProductFormData } from "@/lib/schemas/product"
import { Spinner } from "@/components/ui/spinner"

interface ProductPageProps {
  productId: string
}

export default function ProductView({ productId }: ProductPageProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { data: product, isLoading, error } = useProduct(productId)
  const updateProduct = useUpdateProduct()

  if (status === "unauthenticated") {
    router.push("/auth/signin")
    return null
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Spinner size="large" />
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600">Failed to load product</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-blue-600 hover:underline"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const handleSubmit = async (data: ProductFormData) => {
    try {
      await updateProduct.mutateAsync({
        id: productId,
        data,
      })
      toast("Success", {
        description: "Product updated successfully",
      })
      router.push("/products")
    } catch (err) {
      toast("Error", {
        description: "Failed to update product",
      })
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
      </div>

      <Card className="p-6">
        <ProductForm
          product={product}
          onSubmit={handleSubmit}
          isLoading={updateProduct.isPending}
        />
      </Card>
    </div>
  )
} 