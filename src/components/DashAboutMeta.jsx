import React, { useState, useEffect } from "react";
const apiUrl = import.meta.env.VITE_BASE_URL;
import { toast } from "react-toastify";
function DashAboutMeta() {
  const [id, setId] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    keywords: "",
    other: "",
  });

  useEffect(() => {
    try {
      fetch(`${apiUrl}/api/metatags/about`)
        .then((res) => res.json())
        .then((data) => {
          setId(data._id);
          setForm({
            title: data.title || "",
            description: data.description || "",
            keywords: data.keywords || "",
            other: data.other || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching meta tags:", error);
        });
    } catch (error) {
      console.error("Error fetching meta tags:", error);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      description: form.description,
      keywords: form.keywords,
      other: form.other,
    };

    try {
      const res = await fetch(`${apiUrl}/api/metatags/about/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success("Form submitted successfully");
        setForm({
          title: "",
          description: "",
          keywords: "",
          other: "",
        });
        window.location.reload();
      } else {
        toast.error(`Form submission failed`);
      }
    } catch (error) {
      toast.error("Form submission failed");
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h6>About Meta data</h6>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/2 px-3 mb-2">
            <label className="block text-gray-700  mb-2" htmlFor="title">
              Meta Title
            </label>
            <textarea
              name="title"
              id="title"
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
              value={form.title}
              onChange={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-2">
            <label className="block text-gray-700  mb-2" htmlFor="description">
              Meta Description
            </label>
            <textarea
              name="description"
              id="description"
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
              value={form.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/2 px-3 mb-2">
            <label className="block text-gray-700 mb-2" htmlFor="keyword">
              Meta Keyword
            </label>
            <textarea
              name="keywords"
              id="keywords"
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
              value={form.keywords}
              onChange={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-2">
            <label className="block text-gray-700 mb-2" htmlFor="other">
              Other Meta Tag
            </label>
            <textarea
              name="other"
              id="other"
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
              value={form.other}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="px-3">
          <button
            type="submit"
            className="px-6 py-2 bg-orange-400 text-white font-bold rounded-md hover:bg-orange-400/90"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default DashAboutMeta;
