import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const apiUrl = import.meta.env.VITE_BASE_URL

export default function ProductDetails() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const res = await fetch(`${apiUrl}/api/product/getproducts?productId=${id}`)
                const data = await res.json()
                if (res.ok) {
                    setProduct(data.products[0])
                } else {
                    setError(data.message || "Failed to fetch product details")
                }
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchProductDetails()
    }, [id])

    if (loading) {
        return <LoadingSkeleton />
    }

    if (error) {
        return <ErrorMessage message={error} />
    }

    if (!product) {
        return <ErrorMessage message="No product found." />
    }

    return (
        <div className="container mx-auto my-10 p-5">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2">
                        <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-[400px] object-cover"
                        />
                    </div>
                    <div className="md:w-1/2 p-6">
                        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-4">
                            Starting from ₹{product.startingPrice}
                        </span>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <FeatureItem icon="⚡" label="Motor" value={product.motor} />
                            <FeatureItem icon="🏎️" label="Speed" value={product.speed} />
                            <FeatureItem icon="🛑" label="Brake" value={product.brake} />
                            <FeatureItem icon="🔋" label="Battery" value={product.battery} />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">Additional Features</h2>
                        <ul className="list-disc list-inside space-y-1 mb-4">
                            <li>Range: {product.range}</li>
                            <li>Instrument: {product.instrument}</li>
                            <li>Tyre: {product.tyre}</li>
                        </ul>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">Additional Information</h3>
                            <p className="text-gray-700">{product.additional}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-4">Last Updated: {new Date(product.updatedAt).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function FeatureItem({ icon, label, value }) {
    return (
        <div className="flex items-center space-x-2">
            <span className="text-2xl">{icon}</span>
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="font-medium">{value}</p>
            </div>
        </div>
    )
}

function LoadingSkeleton() {
    return (
        <div className="container mx-auto my-10 p-5">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2 bg-gray-300 h-[400px] animate-pulse"></div>
                    <div className="md:w-1/2 p-6">
                        <div className="h-8 bg-gray-300 rounded w-3/4 mb-4 animate-pulse"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/4 mb-6 animate-pulse"></div>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-12 bg-gray-300 rounded animate-pulse"></div>
                            ))}
                        </div>
                        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4 animate-pulse"></div>
                        <div className="h-20 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ErrorMessage({ message }) {
    return (
        <div className="container mx-auto my-10 p-5">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
                <p className="font-bold">Error</p>
                <p>{message}</p>
            </div>
        </div>
    )
}

