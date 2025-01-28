import React, { useState, useEffect } from "react";
import {
  TextInput,
  Select,
  Textarea,
  Button,
  Spinner,
  Alert,
} from "flowbite-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_BASE_URL;

export function ContactFormContactPage({ sourcePage }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ffname: "",
    email: "",
    phone: "",
    services: "",
    form_message: "",
    sourcePage: sourcePage || "",
  });
  const [loading, setLoading] = useState(true);
  const [recentServices, setRecentServices] = useState([]);
  const [publishError, setPublishError] = useState(null);

  useEffect(() => {
    const fetchRecentServices = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/service/getservices?limit=6`);
        const data = await res.json();
        if (res.ok) {
          setRecentServices(data.services);
        } else {
          setPublishError("Failed to load services.");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setPublishError("An error occurred while fetching services.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecentServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitForm = async (data) => {
    const payload = {
      name: data.ffname,
      email: data.email,
      phone: data.phone,
      message: data.form_message,
      service: data.services,
      sourcePage: data.sourcePage,
    };
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiUrl}/api/inquiry/create/inquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(payload), 
      });
      console.log(response);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitForm(formData);
    setPublishError(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-80">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="contact-form-validated contact-three__form"
    >
      <div className="row">
        <div className="col-xl-6 col-lg-6">
          <div className="contact-three__input-box">
            <TextInput
              type="text"
              name="ffname"
              placeholder="Your Name *"
              required
              value={formData.ffname}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-xl-6 col-lg-6">
          <div className="contact-three__input-box">
            <TextInput
              type="email"
              name="email"
              placeholder="Your Email *"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-xl-6 col-lg-6">
          <div className="contact-three__input-box">
            <TextInput
              type="text"
              name="phone"
              placeholder="Mobile *"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-xl-6 col-lg-6">
          <div className="contact-three__input-box">
            <Select
            aria-label="Select"
              name="services"
              value={formData.services}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a Service *
              </option>
              {recentServices.map((service, index) => (
                <option key={index} value={service.title}>
                  {service.title}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div className="col-xl-12">
          <div className="contact-three__input-box text-message-box">
            <Textarea
              name="form_message"
              placeholder="Message"
              value={formData.form_message}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contact-three__btn-box">
            <Button type="submit" className="thm-btn contact-three__btn">
              Send a message
            </Button>
          </div>

          {publishError && (
            <Alert className="mt-5" color="failure">
              {publishError}
            </Alert>
          )}
        </div>
      </div>
      {/* Hidden field for sourcePage */}
      <input type="hidden" name="sourcePage" value={formData.sourcePage} />
    </form>
  );
}
