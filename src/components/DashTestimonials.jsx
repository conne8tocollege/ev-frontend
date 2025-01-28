import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const apiUrl = import.meta.env.VITE_BASE_URL;

export default function DashTestimonial() {
  const { currentUser } = useSelector((state) => state.user);
  const [userTestimonial, setUserTestimonial] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [testimonialIdToDelete, setServiceIdToDelete] = useState("");

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const res = await fetch(
          `${apiUrl}/api/testimonial/gettestimonials?userId=${currentUser._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setUserTestimonial(data.testimonials);
          if (data.testimonials.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchTestimonial();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userTestimonial.length;
    try {
      const res = await fetch(
        `${apiUrl}/api/testimonial/gettestimonials?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserTestimonial((prev) => [...prev, ...data.testimonials]);
        if (data.testimonials.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteTestimonial = async () => {
    setShowModal(false);
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(
        `${apiUrl}/api/testimonial/deletetestimonial/${testimonialIdToDelete}/${currentUser._id}`,
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
        setUserTestimonial((prev) =>
          prev.filter(
            (testimonial) => testimonial._id !== testimonialIdToDelete
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="overflow-x-auto p-3 mt-20">
      <div>
        {currentUser.isAdmin && (
          <Link to={`/create-testimonial`}>
            <button className="bg-cyan-400 text-white py-2 px-4 rounded-md mb-3">
              Create New Testimonial
            </button>
          </Link>
        )}
      </div>

      {currentUser.isAdmin && userTestimonial.length > 0 ? (
        <>
          <table className="min-w-full table-auto border-collapse text-left shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 font-semibold text-sm text-gray-600">Date Updated</th>
                <th className="px-4 py-2 font-semibold text-sm text-gray-600">Testimonial Image</th>
                <th className="px-4 py-2 font-semibold text-sm text-gray-600">Title</th>
                <th className="px-4 py-2 font-semibold text-sm text-gray-600">Delete</th>
                <th className="px-4 py-2 font-semibold text-sm text-gray-600">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {userTestimonial.map((testimonial, index) => (
                <tr key={testimonial._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {new Date(testimonial.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    <Link to={`/testimonial/${testimonial.slug}`}>
                      <img
                        src={testimonial.image}
                        alt={testimonial.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">{testimonial.title}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setServiceIdToDelete(testimonial._id);
                      }}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-testimonial/${testimonial._id}`}
                    >
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
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no testimonials yet!</p>
      )}

      {/* Custom Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500">Are you sure you want to delete this testimonial?</h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDeleteTestimonial}
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
