import React, { useState } from "react";
const apiUrl = import.meta.env.VITE_BASE_URL;
import { toast } from "react-toastify";
function CreateOtherMetaData() {
  const [form, setForm] = useState({
    header: "",
    footer: "",
    body: "",
  });

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

    // console.log(JSON.stringify(payload));
  
    try {
      const res = await fetch(`${apiUrl}/api/metatags/other`, {
        method: "POST",
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
        
      } else {
        toast.error(`Form submission failed`);
      }
    } catch (error) {
      toast.error("Form submission failed");
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-44 p-6 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h3>Create other Meta data</h3>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/2 px-3 mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="header"
            >
              Meta Header
            </label>
            <textarea
              name="header"
              id="header"
              rows="2"
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
              value={form.header}
              onChange={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-2">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="footer"
            >
              Meta Footer
            </label>
            <textarea
              name="footer"
              id="footer"
              rows="2"
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
              value={form.footer}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/2 px-3 mb-2">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="keyword"
            >
              Meta Body
            </label>
            <textarea
              name="body"
              id="body"
              rows="2"
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

export default CreateOtherMetaData;
