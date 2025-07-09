import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Filter,
  Navigation,
  Guitar as Hospital,
  Shield,
  Heart,
  Search,
  DollarSign,
} from "lucide-react";
import { HealthService } from "../types";
import MapView from "./MapView";

const LocalServices: React.FC = () => {
  const [filterType, setFilterType] = useState<
    "all" | "government" | "private"
  >("all");
  const [filterCost, setFilterCost] = useState<"all" | "free" | "paid">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const mockServices: HealthService[] = [
    {
      id: "1",
      name: "Primary Health Center - Sector 12",
      type: "government",
      services: [
        "Vaccination",
        "Antenatal Care",
        "Pediatric Care",
        "Emergency",
      ],
      address: "Sector 12, New Delhi - 110001",
      phone: "011-23456789",
      distance: 0.8,
      cost: "free",
      availability: "24/7",
    },
    {
      id: "2",
      name: "Anganwadi Center - Block A",
      type: "government",
      services: ["Child Health", "Nutrition", "Growth Monitoring"],
      address: "Block A, Community Center, New Delhi - 110001",
      phone: "011-23456790",
      distance: 0.5,
      cost: "free",
      availability: "9 AM - 5 PM",
    },
    {
      id: "3",
      name: "Apollo Clinic",
      type: "private",
      services: ["Pediatric Care", "Vaccination", "Specialist Consultation"],
      address: "Main Market, New Delhi - 110001",
      phone: "011-23456791",
      distance: 1.2,
      cost: "paid",
      availability: "8 AM - 10 PM",
    },
    {
      id: "4",
      name: "Government Hospital",
      type: "government",
      services: ["Emergency", "Maternity", "Pediatric ICU", "Surgery"],
      address: "Hospital Road, New Delhi - 110001",
      phone: "011-23456792",
      distance: 2.1,
      cost: "subsidized",
      availability: "24/7",
    },
    {
      id: "5",
      name: "Community Health Center",
      type: "government",
      services: ["Vaccination", "Family Planning", "Child Care"],
      address: "Community Block, New Delhi - 110001",
      phone: "011-23456793",
      distance: 1.8,
      cost: "free",
      availability: "9 AM - 6 PM",
    },
  ];

  const filteredServices = mockServices.filter((service) => {
    const matchesType = filterType === "all" || service.type === filterType;
    const matchesCost = filterCost === "all" || service.cost === filterCost;
    const matchesSearch =
      searchQuery === "" ||
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.services.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesType && matchesCost && matchesSearch;
  });

  const getServiceIcon = (service: HealthService) => {
    if (service.services.includes("Emergency")) return Hospital;
    if (service.services.includes("Vaccination")) return Shield;
    return Heart;
  };

  const getCostColor = (cost: string) => {
    switch (cost) {
      case "free":
        return "text-green-600 bg-green-100";
      case "paid":
        return "text-blue-600 bg-blue-100";
      case "subsidized":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getCostLabel = (cost: string) => {
    switch (cost) {
      case "free":
        return "Free";
      case "paid":
        return "Paid";
      case "subsidized":
        return "Subsidized";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="pb-20 px-4 space-y-6">
      {/* Hero/Header Section */}
      <div
        className="relative w-full mx-auto rounded-3xl overflow-hidden min-h-[580px] flex items-end mt-12 mb-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(236, 72, 153, 0.7), rgba(236, 72, 153, 0.7)), url(https://plus.unsplash.com/premium_photo-1675808577247-2281dc17147a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="pl-24 pt-6 md:pl-32 md:pt-8 text-left w-full relative"
          style={{ top: "-150px" }}
        >
          {/* White line from left to heading */}
          <div className="absolute left-0 top-20 h-px bg-white w-[150px] md:w-[242px]" />

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg relative z-10">
            Local Health Services
          </h2>
          <p className="text-lg md:text-2xl text-pink-100 font-medium drop-shadow-md max-w-2xl">
            Find nearby healthcare facilities and services
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search services, hospitals, vaccination centers..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {/* Filters */}
      <div className="flex space-x-3 overflow-x-auto pb-2">
        <div className="flex items-center space-x-2 bg-white rounded-lg p-2 border border-gray-200 min-w-fit">
          <Filter className="w-4 h-4 text-gray-600" />
          <select
            title="filter"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="text-sm focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="government">Government</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className="flex items-center space-x-2 bg-white rounded-lg p-2 border border-gray-200 min-w-fit">
          <DollarSign className="w-4 h-4 text-gray-600" />
          <select
            title="cost"
            value={filterCost}
            onChange={(e) => setFilterCost(e.target.value as any)}
            className="text-sm focus:outline-none"
          >
            <option value="all">All Costs</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </div>
      <MapView services={filteredServices} />
    </div>
  );
};

export default LocalServices;
