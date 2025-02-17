import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Clock, Disc, Gauge, Info, Ruler, Settings, Zap } from "lucide-react";

const apiUrl = import.meta.env.VITE_BASE_URL;

const VehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      const access_token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(`${apiUrl}/api/vehicles/${id}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        setVehicle(response.data);
      } catch (err) {
        setError("Failed to fetch vehicle details");
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!vehicle)
    return <p className="text-center text-gray-500">Vehicle not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-4">{vehicle.name}</h1>

      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        className="mb-8"
      >
        {vehicle.images.map((image, index) => (
          <div
            key={index}
            className="w-64 h-64 flex justify-center items-center bg-gray-200"
          >
            {/* Square container */}
            <img
              src={image || "/placeholder.svg"}
              alt={`${vehicle.name} - Image ${index + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        ))}
      </Carousel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <Info className="mr-2" /> Basic Information
          </h2>
          <p>
            <strong>Starting Price:</strong> ₹
            {vehicle.startingPrice.toLocaleString()}
          </p>
          <p>
            <strong>Speed:</strong> {vehicle.speed}
          </p>
          <p>
            <strong>Range:</strong> {vehicle.range}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <Settings className="mr-2" /> Engine & Transmission
          </h2>
          <p>
            <strong>Motor Type:</strong>{" "}
            {vehicle.engineAndTransmission.motorType}
          </p>
          <p>
            <strong>Motor Power:</strong>{" "}
            {vehicle.engineAndTransmission.motorPower}
          </p>
          <p>
            <strong>Range:</strong> {vehicle.engineAndTransmission.range}
          </p>
          <p>
            <strong>Start:</strong> {vehicle.engineAndTransmission.start}
          </p>
          <p>
            <strong>Transmission:</strong>{" "}
            {vehicle.engineAndTransmission.transmission}
          </p>
          <p>
            <strong>Reverse Gear:</strong>{" "}
            {vehicle.engineAndTransmission.reverseGear}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <Ruler className="mr-2" /> Dimensions & Capacity
          </h2>
          <p>
            <strong>Length:</strong> {vehicle.dimensionAndCapacity.length}
          </p>
          <p>
            <strong>Width:</strong> {vehicle.dimensionAndCapacity.width}
          </p>
          <p>
            <strong>Height:</strong> {vehicle.dimensionAndCapacity.height}
          </p>
          <p>
            <strong>Seat Height:</strong>{" "}
            {vehicle.dimensionAndCapacity.seatHeight}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <Zap className="mr-2" /> Electricals
          </h2>
          <p>
            <strong>Battery Type:</strong> {vehicle.electricals.batteryType}
          </p>
          <p>
            <strong>Charging Time:</strong> {vehicle.electricals.chargingTime}
          </p>
          <p>
            <strong>Head Light:</strong> {vehicle.electricals.headLight}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <Disc className="mr-2" /> Tyres & Brakes
          </h2>
          <p>
            <strong>Front Brake:</strong> {vehicle.tyresAndBrakes.frontBrake}
          </p>
          <p>
            <strong>Rear Brake:</strong> {vehicle.tyresAndBrakes.rearBrake}
          </p>
          <p>
            <strong>Tyre Type:</strong> {vehicle.tyresAndBrakes.tyreType}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <Gauge className="mr-2" /> Performance
          </h2>
          <p>
            <strong>Motor Warranty:</strong> {vehicle.performance.motorWarranty}{" "}
            km
          </p>
          <p>
            <strong>Battery Warranty:</strong>{" "}
            {vehicle.performance.batteryWarranty}
          </p>
          <p>
            <strong>Charging Time:</strong> {vehicle.performance.chargingTime}
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p>{vehicle.description}</p>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <Clock className="mr-2" /> Additional Information
        </h2>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(vehicle.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Last Updated:</strong>{" "}
          {new Date(vehicle.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default VehicleDetails;
