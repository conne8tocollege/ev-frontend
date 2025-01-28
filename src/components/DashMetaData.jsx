import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const apiUrl = import.meta.env.VITE_BASE_URL;

export default function DashMetaData() {
  const { currentUser } = useSelector((state) => state.user);
  const [metaData, setMetaData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState("");
  const [type, setType] = useState("Product");
  const navigate = useNavigate();

  // Handle change for dropdown select
  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  // Fetch metadata based on the selected type
  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/metatags/${type.toLowerCase()}`);
        const data = await res.json();
        if (res.ok) {
          setMetaData(data);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchMetaData();
  }, [type]);

  // Handle deleting metadata
  const handleDeleteMetaData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(
        `${apiUrl}/api/metatags/${type.toLowerCase()}/${productIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMetaData((prev) =>
          prev.filter((item) => item._id !== productIdToDelete)
        );
        setShowModal(false);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handle edit metadata
  const handleEditMetaData = (metaId) => {
    navigate(`/update-metadata/${type.toLowerCase()}/${metaId}`);
  };

  return (
    <div className="mt-20 overflow-x-auto p-3">
      <div className="flex gap-2">
        <Link to={`/create-metadata`}>
          <button className="bg-orange-400 text-white py-2 px-4 rounded-md mb-3">
            Create New Meta Data
          </button>
        </Link>
        <div className="w-md px-3 mb-2">
          <div className="relative w-40">
            <select 
            aria-label="Select"
              name="type"
              id="type"
              className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0"
              value={type}
              onChange={handleChangeType}
            >
              <option value="Service">Service</option>
              <option value="Product">Product</option>
              <option value="Blog">Blog</option>
              <option value="Common">Common</option>
            </select>
          </div>
        </div>
      </div>

      {currentUser.isAdmin && metaData.length > 0 ? (
        <>
          <table className="min-w-full table-auto border-collapse text-left shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 font-semibold text-sm text-gray-600">
                  Title
                </th>
                <th className="px-4 py-2 font-semibold text-sm text-gray-600">
                  Description
                </th>
                <th className="px-4 py-2 font-semibold text-sm text-gray-600">
                  Keyword
                </th>
                <th className="px-4 py-2 font-semibold text-sm text-gray-600">
                  Other
                </th>
                <th className="px-4 py-2 font-semibold text-sm text-gray-600">
                  Date Updated
                </th>
                <th className="px-4 py-2 font-semibold text-sm text-gray-600">
                  Delete
                </th>
                <th className="px-4 py-2 font-semibold text-sm text-gray-600">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {metaData.map((data) => (
                <tr
                  key={data._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {data.title}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {data.description}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {data.keywords}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {data.other}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {new Date(data.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setProductIdToDelete(data._id);
                      }}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    <button
                      onClick={() => handleEditMetaData(data._id)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No metadata available.</p>
      )}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 mt-40 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500">
                Are you sure you want to delete this metadata?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDeleteMetaData}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                  Yes, delete it
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
