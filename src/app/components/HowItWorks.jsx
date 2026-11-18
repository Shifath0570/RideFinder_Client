import React from "react";
import { MapPin, Car, ShieldCheck } from "lucide-react";

const STEPS = [
  { step: "01", title: "Set Your Route", desc: "Enter your current pickup spot and destination to instantly view available routes.", icon: MapPin },
  { step: "02", title: "Select a Ride", desc: "Compare transparent fares across bikes, cars, and SUVs with zero hidden booking fees.", icon: Car },
  { step: "03", title: "Track & Arrive", desc: "Follow your background-verified driver in real time on the live map until you reach your stop.", icon: ShieldCheck },
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-white border-y border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Simple 3-Step Process</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">How RideFinder works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="bg-gray-50 p-7 rounded-2xl border border-gray-200/80 relative">
                <span className="text-4xl font-black text-emerald-200 absolute top-5 right-6 select-none">{item.step}</span>
                <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-5 shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}