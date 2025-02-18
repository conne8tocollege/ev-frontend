"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { uploadImage } from "../cloudinary";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_BASE_URL;

const UpdateVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/vehicles/${id}`);
        const vehicleData = response.data;
        reset(vehicleData);
        setUploadedImages(vehicleData.images || []);
      } catch (error) {
        console.error("Error fetching vehicle:", error);
        toast.error("Error fetching vehicle details", {
          position: "top-right",
        });
      }
    };

    fetchVehicle();
  }, [id, reset]);

  const handleImageSelection = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleImageUpload = async () => {
    if (!selectedFiles.length) return;

    setIsUploading(true);
    try {
      const uploadedUrls = await Promise.all(
        selectedFiles.map((file) => uploadImage(file))
      );

      setUploadedImages([
        ...uploadedImages,
        ...uploadedUrls.filter((url) => url !== null),
      ]);
      setImages(uploadedImages);
      setSelectedFiles([]);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload failed", error);
      toast.error("Image upload failed", { position: "top-right" });
    }
    setIsUploading(false);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const access_token = localStorage.getItem("access_token"); // Get the token from localStorage
      const response = await axios.put(
        `${apiUrl}/api/vehicles/${id}`,
        {
          ...data,
          images: uploadedImages,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`, // Add the token to the headers
          },
        }
      );

      toast.success("Vehicle updated successfully!", { position: "top-right" });
      navigate("/dashboard?tab=vehicles"); // Redirect to vehicles list
    } catch (error) {
      console.error("Error updating vehicle:", error);
      toast.error("Error updating vehicle!", { position: "top-right" });
    }
    setIsLoading(false);
  };

  const handleDeleteImage = async (imageUrl) => {
    const access_token = localStorage.getItem("access_token");
    try {
      await axios.patch(
        `${apiUrl}/api/vehicles/${id}/delete-images`,
        {
          images: [imageUrl],
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      // Remove image from state after successful API call
      setUploadedImages(uploadedImages.filter((img) => img !== imageUrl));
      toast.success("Image deleted successfully!");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Update Vehicle
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* General Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Starting Price
            </label>
            <input
              type="number"
              {...register("startingPrice", {
                required: "Starting price is required",
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.startingPrice && (
              <p className="mt-1 text-sm text-red-600">
                {errors.startingPrice.message}
              </p>
            )}
          </div>
        </div>

        {/* Speed and Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Speed
            </label>
            <input
              {...register("speed", { required: "Speed is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.speed && (
              <p className="mt-1 text-sm text-red-600">
                {errors.speed.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Range
            </label>
            <input
              {...register("range", { required: "Range is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.range && (
              <p className="mt-1 text-sm text-red-600">
                {errors.range.message}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Images
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageSelection}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          {selectedFiles.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {Array.from(selectedFiles).map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file) || "/placeholder.svg"}
                  alt={`Selected ${index + 1}`}
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={handleImageUpload}
            disabled={isUploading}
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
          >
            {isUploading ? "Uploading..." : "Upload Images"}
          </button>
        </div>

        {/* Display uploaded images */}
        {uploadedImages.length > 0 && (
          <div className="mt-4">
            <h2 className="text-sm font-semibold text-gray-700">
              Uploaded Images
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {uploadedImages.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Uploaded ${index + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(url)}
                    className="absolute top-0 right-0 bg-red-600 text-white text-xs p-1 rounded-full"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Engine and Transmission */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Engine and Transmission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Motor Type
              </label>
              <input
                {...register("engineAndTransmission.motorType")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Motor Power
              </label>
              <input
                {...register("engineAndTransmission.motorPower")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Range
              </label>
              <input
                {...register("engineAndTransmission.range")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start
              </label>
              <input
                {...register("engineAndTransmission.start")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Transmission
              </label>
              <input
                {...register("engineAndTransmission.transmission")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Reverse Gear
              </label>
              <input
                {...register("engineAndTransmission.reverseGear")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Dimension and Capacity */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Dimension and Capacity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Length
              </label>
              <input
                {...register("dimensionAndCapacity.length")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Width
              </label>
              <input
                {...register("dimensionAndCapacity.width")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Height
              </label>
              <input
                {...register("dimensionAndCapacity.height")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Seat Height
              </label>
              <input
                {...register("dimensionAndCapacity.seatHeight")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Electricals */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Electricals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Battery Type
              </label>
              <input
                {...register("electricals.batteryType")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Head Light
              </label>
              <input
                {...register("electricals.headLight")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Charging Time
              </label>
              <input
                {...register("electricals.chargingTime")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Tyres and Brakes */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Tyres and Brakes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Front Brake
              </label>
              <input
                {...register("tyresAndBrakes.frontBrake")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rear Brake
              </label>
              <input
                {...register("tyresAndBrakes.rearBrake")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tyre Type
              </label>
              <input
                {...register("tyresAndBrakes.tyreType")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Motor Warranty
              </label>
              <input
                {...register("performance.motorWarranty")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Battery Warranty
              </label>
              <input
                {...register("performance.batteryWarranty")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Charging Time
              </label>
              <input
                {...register("performance.chargingTime")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-5">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? "Updating..." : "Update Vehicle"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateVehicle;
