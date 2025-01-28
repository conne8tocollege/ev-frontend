import React, { useEffect, useState } from "react";
import { Alert, Button, TextInput, Select, Textarea } from "flowbite-react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_BASE_URL;

export default function UpdateOtherMetaData() {
  const { othermetadataId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    header: "",
    footer: "",
    body: "",
   
  });
  const [publishError, setPublishError] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  // Fetch metadata if `metaId` is provided (indicating an update)
  useEffect(() => {
    if (othermetadataId) {
      const fetchMetaData = async () => {
        try {
          const res = await fetch(
            `${apiUrl}/api/metatags/other/${othermetadataId}`
          );
          if (res.ok) {
            const data = await res.json();
            setFormData({
              header: data.header || "",
              footer: data.footer || "",
              body: data.body || "",
              
            });
            setIsUpdate(true);
          } else {
            setPublishError("Failed to fetch metadata for update");
          }
        } catch (error) {
          setPublishError("Error fetching metadata");
        }
      };
      fetchMetaData();
    }
  }, [ othermetadataId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      header: formData.header,
      footer: formData.footer,
      body: formData.body,
      
    };
    console.log(payload);

    try {
      const res = await fetch(`${apiUrl}/api/metatags/other/${othermetadataId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Metadata updated successfully");
        navigate(`/dashboard?tab=othermetadata`);
      } else {
        setPublishError(data.message || "Failed to update metadata");
      }
    } catch (error) {
      setPublishError("Submission failed");
    }
  };

  return (
    <div className="p-3 max-w-3xl mt-40 pt-20 mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold capitalize">
        Update Meta Data Other page
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Meta Header"
          required
          name="header"
          onChange={handleChange}
          value={formData.header}
          className="w-full"
        />

        <Textarea
          placeholder="Meta footer"
          required
          name="footer"
          rows={3}
          onChange={handleChange}
          value={formData.footer}
          className="w-full"
        />

        <Textarea
          placeholder="Meta Body"
          required
          name="body"
          rows={2}
          onChange={handleChange}
          value={formData.body}
          className="w-full"
        />


        {publishError && <Alert color="failure">{publishError}</Alert>}

        <Button
          type="submit"
          className="bg-orange-400 text-white hover:bg-orange-400/90"
        >
          Update Metadata
        </Button>
      </form>
    </div>
  );
}
