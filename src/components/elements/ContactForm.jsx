import React, { useState } from "react";
import { TextInput, Textarea, Button } from "flowbite-react";
const apiUrl = import.meta.env.VITE_BASE_URL;
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export function ContactForm({ sourcePage, formType }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ffname: "",
    email: "",
    phone: "",
    form_message: "",
    our_services: sourcePage.split("/").pop(),
    sourcePage: sourcePage,
  });

  const submitForm = async (data) => {
    const payload = {
      name: data.ffname,
      email: data.email,
      phone: data.phone,
      message: data.form_message,
      sourcePage: data.sourcePage,
    };
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiUrl}/api/inquiry/create/inquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Corrected typo here
        },
        body: JSON.stringify(payload), // Corrected from 'data' to 'body'
      });
      if (response.ok) {
        navigate("/thank-you", { state: { fromFormSubmission: true }} );
        toast.success("Form submitted successfully!");
        setFormData({
          ffname: "",
          email: "",
          phone: "",
          form_message: "",
          our_services: sourcePage.split("/").pop(),
          sourcePage: sourcePage,
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm(formData);
    
      
  };

  return (
    <form
      id="contact-form"
      name="contact_form"
      className="p-1 py-2 max-w-md bg-[#FDEEDF] rounded-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        {formType || "Enquire Now"}
      </h2>

      <div className="mb-4">
        <TextInput
          id="ffname"
          type="text"
          name="ffname"
          placeholder="Name *"
          value={formData.ffname}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex justify-between gap-2">
        <div className="mb-4">
          <TextInput
            id="email"
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <TextInput
            id="phone"
            type="text"
            name="phone"
            placeholder="Phone *"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <Textarea
          id="form_message"
          name="form_message"
          placeholder="Message"
          value={formData.form_message}
          onChange={handleChange}
          required
        />
      </div>

      {/* Hidden fields for 'our_services' and 'sourcePage' */}
      <input type="hidden" name="our_services" value={formData.our_services} />
      <input type="hidden" name="sourcePage" value={formData.sourcePage} />

      <Button type="submit" className="w-full bg-orange-400 hover:bg-amber-400">
        Submit Now
      </Button>
    </form>
  );
}
