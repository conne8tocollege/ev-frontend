import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_BASE_URL;
import { toast } from "react-toastify";
export function ContactFormProducts({ sourcePage, formType }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ffname: "",
    email: "",
    phone: "",
    form_message: "",
    our_services: sourcePage.split("/").pop(),
    sourcePage: sourcePage,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // to do add products query

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
      // console.log(response);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    submitForm(formData);
  };

  return (
    <form id="contact-form" name="contact_form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="input-box">
            <input
              type="text"
              name="ffname"
              placeholder="Name *"
              required
              value={formData.ffname}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-6 col-lg-12 col-md-12">
          <div className="input-box">
            <input
              type="text"
              name="phone"
              placeholder="Phone *"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-xl-6 col-lg-12 col-md-12">
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email *"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="input-box">
            <textarea
              name="form_message"
              id="formMessage"
              rows="1" // Set rows to 1 for single-line effect
              placeholder="Message"
              required
              aria-required="true"
              value={formData.form_message}
              onChange={handleChange}
              style={{ resize: "none", width: "100%" }} // Prevent resizing and ensure full width
            ></textarea>
          </div>
        </div>
      </div>

      {/* <div className="row">
        <div className="col-lg-12">
          <div className="product-form-box-checkbox">
            <div className="inner">
              <input type="checkbox" name="remember" id="tag" />
              <label htmlFor="tag">
                <span></span>Save my details in this browser for the next time I
                comment.
              </label>
            </div>
          </div>
        </div>
      </div> */}

      {/* Hidden fields for 'our_services' and 'sourcePage' */}
      <input type="hidden" name="our_services" value={formData.our_services} />
      <input type="hidden" name="sourcePage" value={formData.sourcePage} />

      <div className="row">
        <div className="col-xl-12">
          <div className="button-box">
            <button
              className="thm-btn"
              type="submit"
              data-loading-text="Please wait..."
            >
              <span className="txt">Submit Now</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
