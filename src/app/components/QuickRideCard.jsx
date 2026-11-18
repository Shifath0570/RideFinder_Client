
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navigation, Search, Car, Bike, Users, ArrowUpDown } from "lucide-react";

const RIDE_TIERS = [
  { id: "moto", name: "Moto", time: "3 min", price: "৳120", icon: Bike },
  { id: "go", name: "RideGo", time: "5 min", price: "৳280", icon: Car, popular: true },
  { id: "xl", name: "XL", time: "8 min", price: "৳450", icon: Users },
];

export default function QuickRideCard() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [selectedTier, setSelectedTier] = useState("go");

  const handleSwap = () => {
    setPickup(dropoff);
    setDropoff(pickup);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching ride:", { pickup, dropoff, selectedTier });
  };

  return (
    <section className="pt-10 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full bg-white rounded-3xl shadow-lg border border-gray-200/90 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Instant Booking
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-0.5">
              Request a ride
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500">
            Enter your locations for instant fare estimates
          </p>
        </div>

        <form onSubmit={handleSearch} className="space-y-5">
          {/* Pickup & Dropoff Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            {/* Pickup */}
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Pickup location (e.g., GEC Circle)"
                className="w-full pl-10 pr-4 py-3.5 text-sm bg-gray-100 border border-transparent rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
              />
            </div>

            {/* Swap Locations Button (Desktop) */}
            <button
              type="button"
              onClick={handleSwap}
              aria-label="Swap pickup and destination"
              className="hidden md:flex items-center justify-center h-8 w-8 rounded-full bg-white border border-gray-200 shadow-sm text-gray-500 hover:text-emerald-600 hover:border-emerald-300 transition absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
            >
              <ArrowUpDown className="h-3.5 w-3.5 rotate-90" />
            </button>

            {/* Dropoff */}
            <div className="relative">
              <Navigation className="h-4 w-4 text-gray-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                placeholder="Destination (e.g., Shah Amanat Airport)"
                className="w-full pl-10 pr-4 py-3.5 text-sm bg-gray-100 border border-transparent rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
              />
            </div>
          </div>

          {/* Tier Selector + Submit Action Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
            <div className="lg:col-span-8 space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Choose Ride Tier
              </label>
              <div className="grid grid-cols-3 gap-3">
                {RIDE_TIERS.map((tier) => {
                  const Icon = tier.icon;
                  const active = selectedTier === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTier(tier.id)}
                      className={`p-3 rounded-xl border text-left transition cursor-pointer relative flex items-center justify-between ${
                        active
                          ? "border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-600"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      {tier.popular && (
                        <span className="absolute -top-2.5 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Best
                        </span>
                      )}
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`p-2 rounded-lg ${
                            active ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-gray-900">
                            {tier.name}
                          </p>
                          <p className="text-[11px] text-gray-500">{tier.time}</p>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-emerald-700">
                        {tier.price}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-4">
              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="h-4 w-4" />
                <span>Find Available Rides</span>
              </motion.button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}






