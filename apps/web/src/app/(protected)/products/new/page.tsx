"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { ProductForm } from "@/components/forms/product-form"
import { useCreateProduct } from "@/lib/api/hooks/use-products"
import { toast } from "sonner"
import { ProductFormData } from "@/lib/schemas/product"

export default function NewProductPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const createProduct = useCreateProduct()

  if (status === "unauthenticated") {
    router.push("/auth/signin")
    return null
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const handleSubmit = async (data: ProductFormData) => {
    try {
      await createProduct.mutateAsync(data)
      toast("Success", {
        description: "Product created successfully",
      })
      router.push("/products")
    } catch (err) {
      toast("Error", {
        description: "Failed to create product",
      })
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create Product</h1>
      </div>

      <Card className="p-6">
        <ProductForm
          onSubmit={handleSubmit}
          isLoading={createProduct.isPending}
        />
      </Card>
    </div>
  )
} 