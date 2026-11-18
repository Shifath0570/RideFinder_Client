import React from "react";
import { ArrowRight } from "lucide-react";

const ROUTES = [
  { from: "GEC Circle", to: "Shah Amanat Airport", distance: "14.2 km", time: "28 min", fare: "৳340" },
  { from: "Agrabad Commercial Area", to: "Patenga Sea Beach", distance: "16.5 km", time: "32 min", fare: "৳390" },
  { from: "2 No. Gate", to: "Halishahar", distance: "8.4 km", time: "19 min", fare: "৳210" },
];

export default function PopularRoutes() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Quick Estimates</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">Popular routes in your city</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ROUTES.map((route, idx) => (
          <div
            key={idx}
            className="group p-5 rounded-2xl bg-white hover:bg-emerald-50/40 border border-gray-200 hover:border-emerald-300 transition cursor-pointer shadow-sm"
          >
            <div className="flex items-center justify-between text-sm font-bold text-gray-900">
              <span>{route.from}</span>
              <ArrowRight className="h-4 w-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
              <span>{route.to}</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <span>{route.distance} • {route.time}</span>
              <span className="px-2.5 py-1 rounded-lg bg-gray-100 border border-gray-200 font-bold text-emerald-700">
                Est. {route.fare}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}