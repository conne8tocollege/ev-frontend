import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const apiUrl = import.meta.env.VITE_BASE_URL;

export default function DashProducts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userProducts, setUserProducts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState("");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${apiUrl}/api/product/getproducts?userId=${currentUser._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setUserProducts(data.products);
          if (data.products.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchProducts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userProducts.length;
    try {
      const res = await fetch(
        `${apiUrl}/api/product/getproducts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserProducts((prev) => [...prev, ...data.products]);
        if (data.products.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteProduct = async () => {
    setShowModal(false);
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(
        `${apiUrl}/api/product/deleteproduct/${productIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserProducts((prev) =>
          prev.filter((product) => product._id !== productIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mt-20 overflow-x-auto p-3">
      {currentUser.isAdmin ? (
        <>
          <div className="">
            {currentUser.isAdmin && (
              <Link to={`/create-product`}>
                <button className="bg-cyan-400 text-white py-2 px-4 rounded-md mb-3">
                  Create New Product
                </button>
              </Link>
            )}
          </div>

          <table className="min-w-full table-auto border-collapse text-left shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 font-semibold text-sm text-gray-600">Product Name</th>
                <th className="px-4 py-2 font-semibold text-sm text-gray-600">Product Image</th>
                <th className="px-4 py-2 font-semibold text-sm text-gray-600">Date Updated</th>
                <th className="px-4 py-2 font-semibold text-sm text-gray-600">Delete</th>
                <th className="px-4 py-2 font-semibold text-sm text-gray-600">Edit</th>
                <th className="px-4 py-2 font-semibold text-sm text-gray-600">View</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {userProducts.map((product) => (
                <tr key={product._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-4 py-2 text-sm text-gray-500">
                    <Link className="font-medium text-gray-900 dark:text-white" to={`/product/${product._id}`}>
                      {product.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {new Date(product.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setProductIdToDelete(product._id);
                      }}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    <Link className="text-teal-500 hover:underline" to={`/update-product/${product._id}`}>
                      Edit
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    <Link className="font-medium text-gray-900 dark:text-white" to={`/product/${product._id}`}>
                      View Product
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no products yet!</p>
      )}

      {/* Custom Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500">Are you sure you want to delete this product?</h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDeleteProduct}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
