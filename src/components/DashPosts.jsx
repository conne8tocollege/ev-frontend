import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const apiUrl = import.meta.env.VITE_BASE_URL;

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `${apiUrl}/api/post/getposts?userId=${currentUser._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `${apiUrl}/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(
        `${apiUrl}/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
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
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mt-20 overflow-x-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
      <div className="">
            {currentUser.isAdmin && (
              <Link to={`/create-post`}>
                <button className="bg-cyan-400 text-white py-2 px-4 rounded-md mb-2">
                  Create New Post
                </button>
              </Link>
            )}
          </div>
      <div className="overflow-x-auto p-3">
        {currentUser.isAdmin && userPosts.length > 0 ? (
          <>
            <table className="min-w-full table-auto border-collapse text-left">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 font-semibold text-sm text-gray-600">Date updated</th>
                  <th className="px-4 py-2 font-semibold text-sm text-gray-600">Post image</th>
                  <th className="px-4 py-2 font-semibold text-sm text-gray-600">Post title</th>
                  <th className="px-4 py-2 font-semibold text-sm text-gray-600">Category</th>
                  <th className="px-4 py-2 font-semibold text-sm text-gray-600">Delete</th>
                  <th className="px-4 py-2 font-semibold text-sm text-gray-600">Edit</th>
                </tr>
              </thead>
              <tbody>
                {userPosts?.map((post, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2 text-sm text-gray-500">{new Date(post.updatedAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      <Link to={`/post/${post.slug}`}>
                        <img src={post.image} alt={post.title} className="w-20 h-10 object-cover bg-gray-500" />
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      <Link to={`/post/${post.slug}`} className="font-medium text-gray-900 hover:underline">
                        {post.title}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">{post.category}</td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setPostIdToDelete(post._id);
                        }}
                        className="text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      <Link to={`/update-post/${post._id}`} className="text-teal-500 hover:underline">
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
          <p>You have no posts yet!</p>
        )}

        {/* Custom Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <div className="text-center">
                <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
                <h3 className="mb-5 text-lg text-gray-500">Are you sure you want to delete this post?</h3>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleDeletePost}
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
    </div>
  );
}
