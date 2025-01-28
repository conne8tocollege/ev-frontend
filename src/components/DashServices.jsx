import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
const apiUrl = import.meta.env.VITE_BASE_URL;

export default function DashServices() {
  const { currentUser } = useSelector((state) => state.user);
  const [userServices, setUserServices] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [serviceIdToDelete, setServiceIdToDelete] = useState("");

  console.log(userServices)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(
          `${apiUrl}/api/service/getservices?userId=${currentUser._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setUserServices(data.services);
          if (data.services.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchServices();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userServices.length;
    try {
      const res = await fetch(
        `${apiUrl}/api/service/getservices?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserServices((prev) => [...prev, ...data.services]);
        if (data.services.length < 9) {
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
        `${apiUrl}/api/service/deleteservice/${serviceIdToDelete}/${currentUser._id}`,
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
        setUserServices((prev) =>
          prev.filter((service) => service._id !== serviceIdToDelete)
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
              <Link to={`/create-service`}>
                <button className="bg-orange-400 text-white hover:bg-orange-400/90 px-4 py-2 rounded">
                  Create New Service
                </button>
              </Link>
            )}
          </div>
          <div className="shadow-md overflow-hidden rounded-lg">
            <table className="min-w-full bg-white dark:bg-gray-800">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Date updated</th>
                  <th className="px-4 py-2 border-b">Service image</th>
                  <th className="px-4 py-2 border-b">Service title</th>
                  <th className="px-4 py-2 border-b">Delete</th>
                  <th className="px-4 py-2 border-b">Edit</th>
                </tr>
              </thead>
              <tbody>
                {userServices?.map((service) => (
                  <tr key={service._id} className="border-b">
                    <td className="px-4 py-2">{new Date(service.updatedAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2">
                      <Link to={`/service/${service.slug}`}>
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-20 h-10 object-cover bg-gray-500"
                        />
                      </Link>
                    </td>
                    <td className="px-4 py-2">
                      <Link
                        className="font-medium text-gray-900 dark:text-white"
                        to={`/service/${service.slug}`}
                      >
                        {service.title}
                      </Link>
                    </td>
                   
                    <td className="px-4 py-2">
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setServiceIdToDelete(service._id);
                        }}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <Link
                        className="text-teal-500 hover:underline"
                        to={`/update-service/${service._id}`}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 text-sm py-4"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no services yet!</p>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this service?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDeleteService}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
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
