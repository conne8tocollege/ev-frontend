import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const apiUrl = import.meta.env.VITE_BASE_URL;

export default function DashSlider() {
  const { currentUser } = useSelector((state) => state.user);
  const [userSlider, setUserSlider] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [sliderIdToDelete, setSliderIdToDelete] = useState("");

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const res = await fetch(
          `${apiUrl}/api/slider/getsliders?userId=${currentUser._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setUserSlider(data.sliders);
          if (data.sliders.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchSlider();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userSlider.length;
    try {
      const res = await fetch(
        `${apiUrl}/api/slider/getsliders?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserSlider((prev) => [...prev, ...data.sliders]);
        if (data.sliders.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteSlider = async () => {
    setShowModal(false);
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(
        `${apiUrl}/api/slider/deleteslider/${sliderIdToDelete}/${currentUser._id}`,
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
        setUserSlider((prev) =>
          prev.filter((slider) => slider._id !== sliderIdToDelete)
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
          <Link to={`/create-slider`}>
            <button className="bg-cyan-400 text-white px-4 py-2 rounded hover:bg-cyan-400/90 mb-3">
              Create New Slider
            </button>
          </Link>
        )}
      </div>

      {currentUser.isAdmin && userSlider.length > 0 ? (
        <>
          <table className="min-w-full bg-white shadow-md rounded mb-3">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Date Updated</th>
                <th className="py-2 px-4 border-b">Slider Image</th>
                <th className="py-2 px-4 border-b">Slider Title</th>
                <th className="py-2 px-4 border-b">Delete</th>
                <th className="py-2 px-4 border-b">Edit</th>
              </tr>
            </thead>
            <tbody>
              {userSlider.map((slider) => (
                <tr key={slider._id} className="border-b">
                  <td className="py-2 px-4">
                    {new Date(slider.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">
                    <Link to={`/slider/${slider.slug}`}>
                      <img
                        src={slider.image}
                        alt={slider.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </td>
                  <td className="py-2 px-4">{slider.title}</td>
                  <td className="py-2 px-4 text-red-500 cursor-pointer hover:underline">
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setSliderIdToDelete(slider._id);
                      }}
                    >
                      Delete
                    </span>
                  </td>
                  <td className="py-2 px-4 text-teal-500 hover:underline">
                    <Link to={`/update-slider/${slider._id}`}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no sliders yet!</p>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500">
                Are you sure you want to delete this slider?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDeleteSlider}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
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
