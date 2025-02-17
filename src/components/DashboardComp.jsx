"use client";

import { useEffect, useState } from "react";
import { FaBox, FaNewspaper, FaQuoteRight, FaCar } from "react-icons/fa";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BASE_URL;

export default function DashboardComp() {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    totalPosts: 0,
    totalTestimonials: 0,
    totalProducts: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const access_token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(`${apiUrl}/api/stats/stats`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <img
            className="w-24 h-auto"
            src="/assets/images/logo.jpg"
            alt="logo"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Vehicles"
            value={stats.totalVehicles}
            icon={<FaCar className="text-blue-500" size={24} />}
            color="bg-blue-100"
          />
          <StatCard
            title="Total Posts"
            value={stats.totalPosts}
            icon={<FaNewspaper className="text-green-500" size={24} />}
            color="bg-green-100"
          />
          <StatCard
            title="Total Testimonials"
            value={stats.totalTestimonials}
            icon={<FaQuoteRight className="text-purple-500" size={24} />}
            color="bg-purple-100"
          />
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={<FaBox className="text-yellow-500" size={24} />}
            color="bg-yellow-100"
          />
        </div>

        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-gray-600">No recent activity to display.</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className={`${color} rounded-lg shadow p-6`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        {icon}
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
