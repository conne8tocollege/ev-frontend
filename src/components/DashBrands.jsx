import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
const apiUrl = import.meta.env.VITE_BASE_URL;

export default function DashBrand() {
  const { currentUser } = useSelector((state) => state.user);
  const [userBrand, setUserBrand] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [brandIdToDelete, setServiceIdToDelete] = useState("");

  // Fetch brands on component mount
  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const res = await fetch(
          `${apiUrl}/api/brand/getbrands?userId=${currentUser._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setUserBrand(data.brands);
          if (data.brands.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchBrand();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userBrand.length;
    try {
      const res = await fetch(
        `${apiUrl}/api/brand/getbrands?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserBrand((prev) => [...prev, ...data.brands]);
        if (data.brands.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteService = async () => {
    setShowModal(false);
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(
        `${apiUrl}/api/brand/deletebrand/${brandIdToDelete}/${currentUser._id}`,
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
        setUserBrand((prev) =>
          prev.filter((brand) => brand._id !== brandIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="overflow-x-auto p-3 mt-20">
      {currentUser.isAdmin ? (
        <>
          <div className="mb-3">
            {currentUser.isAdmin && (
              <Link to={`/create-brand`}>
                <button className="bg-orange-400 text-white hover:bg-orange-400/90 px-4 py-2 rounded-md">
                  Create New Brand
                </button>
              </Link>
            )}
          </div>

          {/* Table for displaying brands */}
          <table className="min-w-full table-auto shadow-md bg-white dark:bg-gray-800 dark:border-gray-700">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Date updated</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Brand image</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Brand title</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Delete</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Edit</th>
              </tr>
            </thead>
            <tbody>
              {userBrand.map((brand, index) => (
                <tr key={index} className="border-b dark:border-gray-700">
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-200">
                    {new Date(brand.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <Link to={`/brand/${brand.slug}`}>
                      <img src={brand.image} alt={brand.title} className="w-20 h-10 object-cover bg-gray-300" />
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-200">{brand.title}</td>
                  <td className="py-3 px-4 text-sm">
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setServiceIdToDelete(brand._id);
                      }}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <Link to={`/update-brand/${brand._id}`} className="text-teal-500 hover:text-teal-700">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 text-sm py-4 hover:underline"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no brands yet!</p>
      )}

      {/* Modal for deleting brand */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this brand?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDeleteService}
                  className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white hover:bg-gray-600 px-4 py-2 rounded-md"
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
