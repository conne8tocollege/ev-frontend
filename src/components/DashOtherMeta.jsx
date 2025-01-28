import React, { useState, useEffect } from "react";
const apiUrl = import.meta.env.VITE_BASE_URL;
import { toast } from "react-toastify";

function DashOtherMeta() {
  const [id, setId] = useState("");
  const [form, setForm] = useState({
    header: "",
    footer: "",
    body: "",
  });

  useEffect(() => {
    try {
      fetch(`${apiUrl}/api/metatags/otherMeta`)
        .then((res) => res.json())
        .then((data) => {
          setId(data._id);
        //   console.log(data);
          setForm({
            header: data.header || "",
            footer: data.footer || "",
            body: data.body || "",
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
      header: form.header,
      footer: form.footer,
      body: form.body,
    };
    try {
      const res = await fetch(`${apiUrl}/api/metatags/otherMeta/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success("Form submitted successfully");
        setForm({
          header: "",
          footer: "",
          body: "",
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
        <h6>Other Meta data</h6>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/2 px-3 mb-2">
            <label className="block text-gray-700  mb-2" htmlFor="header">
              Header Tag
            </label>
            <textarea
              name="header"
              id="header"
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
              value={form.header}
              onChange={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-2">
            <label className="block text-gray-700  mb-2" htmlFor="footer">
              Footer Tag
            </label>
            <textarea
              name="footer"
              id="footer"
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
              value={form.footer}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/2 px-3 mb-2">
            <label className="block text-gray-700 mb-2" htmlFor="body">
              Body Tag
            </label>
            <textarea
              name="body"
              id="body"
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
              value={form.body}
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

export default DashOtherMeta;
