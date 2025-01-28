import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_BASE_URL;

export default function CreateService() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${apiUrl}/api/service/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/dashboard?tab=services`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-5 max-w-3xl mx-auto min-h-screen mt-20 border">
      <h1 className="text-center text-3xl my-5 font-semibold">
        Create Service
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Title and Short Description */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <div className="flex-1">
            <label htmlFor="title" className="block font-medium mb-2">
              Title
            </label>
            <TextInput
              type="text"
              placeholder="Title"
              id="title"
              required
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="short_description"
              className="block font-medium mb-2"
            >
              Short Description
            </label>
            <TextInput
              type="text"
              placeholder="Short Description"
              id="short_description"
              required
              onChange={(e) =>
                setFormData({ ...formData, short_description: e.target.value })
              }
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="file" className="block font-medium mb-2">
            Upload Image
          </label>
          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <FileInput
              type="file"
              id="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              outline
              onClick={handleUpdloadImage}
              disabled={imageUploadProgress}
            >
              {imageUploadProgress ? (
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                  />
                </div>
              ) : (
                "Upload Image"
              )}
            </Button>
          </div>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}

        {/* Content */}
        <div>
          <label htmlFor="content" className="block font-medium mb-2">
            Content
          </label>
          <ReactQuill
            theme="snow"
            placeholder="Write something..."
            id="content"
            required
            className="h-72 mb-12"
            onChange={(value) => setFormData({ ...formData, content: value })}
          />
        </div>

        {/* Meta Information */}
        <div>
          <label htmlFor="metaTitle" className="block font-medium mb-2">
            Meta Title
          </label>
          <TextInput
            type="text"
            placeholder="Meta Title"
            id="metaTitle"
            onChange={(e) =>
              setFormData({ ...formData, metaTitle: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="metaDescription" className="block font-medium mb-2">
            Meta Description
          </label>
          <TextInput
            type="text"
            placeholder="Meta Description"
            id="metaDescription"
            onChange={(e) =>
              setFormData({ ...formData, metaDescription: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="metaKeywords" className="block font-medium mb-2">
            Meta Keywords
          </label>
          <TextInput
            type="text"
            placeholder="Meta Keywords"
            id="metaKeywords"
            onChange={(e) =>
              setFormData({ ...formData, metaKeywords: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="otherMeta" className="block font-medium mb-2">
            Other Meta Tags
          </label>
          <TextInput
            type="text"
            placeholder="Other Meta Tags"
            id="otherMeta"
            onChange={(e) =>
              setFormData({ ...formData, otherMeta: e.target.value })
            }
          />
        </div>

        {/* Publish Button */}
        <Button
          type="submit"
          className="bg-orange-400 text-white hover:bg-orange-400/90"
        >
          Publish
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
