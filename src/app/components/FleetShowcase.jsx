"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bike, Car, Users, Clock } from "lucide-react";

const FLEET_DATA = [
  { id: "moto", name: "RideMoto", desc: "Fast bike transit to navigate through heavy rush hour traffic effortlessly.", eta: "3 min", seats: "1 Seat", price: "৳120", icon: Bike },
  { id: "go", name: "RideGo", desc: "Comfortable air-conditioned sedans for daily commutes and errands.", eta: "5 min", seats: "4 Seats", price: "৳280", icon: Car, popular: true },
  { id: "xl", name: "RideXL", desc: "Spacious SUVs and microbuses for group travels and airport runs with luggage.", eta: "8 min", seats: "6 Seats", price: "৳450", icon: Users },
];

export default function FleetShowcase() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Our Fleet</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">Rides tailored to every journey</h2>
        </div>
        <p className="text-sm text-gray-500 max-w-md">Choose from flexible, dependable options designed to match your budget and group size.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FLEET_DATA.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              className="relative bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              {item.popular && (
                <span className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="h-3.5 w-3.5 text-emerald-600" /> {item.eta}
                </span>
                <span>{item.seats}</span>
                <span className="text-sm font-bold text-gray-900">From {item.price}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}