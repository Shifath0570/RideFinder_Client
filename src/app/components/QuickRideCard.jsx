"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Search, Car, Bike, Users } from "lucide-react";

const RIDE_TIERS = [
  { id: "moto", name: "Moto", time: "3 min", price: "৳120", icon: Bike },
  { id: "go", name: "RideGo", time: "5 min", price: "৳280", icon: Car, popular: true },
  { id: "xl", name: "XL", time: "8 min", price: "৳450", icon: Users },
];

export default function QuickRideCard() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [selectedTier, setSelectedTier] = useState("go");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching ride:", { pickup, dropoff, selectedTier });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-200/90 p-6 sm:p-7 max-w-md w-full">
      <h2 className="text-lg font-bold text-gray-900 mb-1">Request a ride</h2>
      <p className="text-xs text-gray-500 mb-5">Enter your locations for instant fare estimates</p>

      <form onSubmit={handleSearch} className="space-y-4">
        {/* Pickup */}
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="Pickup location (e.g., GEC Circle)"
            className="w-full pl-10 pr-4 py-3 text-sm bg-gray-100 border border-transparent rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
          />
        </div>

        {/* Dropoff */}
        <div className="relative">
          <Navigation className="h-4 w-4 text-gray-700 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            placeholder="Destination (e.g., Airport)"
            className="w-full pl-10 pr-4 py-3 text-sm bg-gray-100 border border-transparent rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
          />
        </div>

        {/* Tier Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Choose Ride</label>
          <div className="grid grid-cols-3 gap-2">
            {RIDE_TIERS.map((tier) => {
              const Icon = tier.icon;
              const active = selectedTier === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedTier(tier.id)}
                  className={`p-2.5 rounded-xl border text-left transition cursor-pointer relative ${
                    active ? "border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-600" : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-2 right-2 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                      Best
                    </span>
                  )}
                  <Icon className={`h-4 w-4 mb-1 ${active ? "text-emerald-600" : "text-gray-600"}`} />
                  <p className="text-xs font-bold text-gray-900">{tier.name}</p>
                  <p className="text-[11px] font-semibold text-emerald-700">{tier.price}</p>
                </button>
              );
            })}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <Search className="h-4 w-4" />
          <span>Find Available Rides</span>
        </motion.button>
      </form>
    </div>
  );
}