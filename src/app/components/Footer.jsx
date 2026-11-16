"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Car,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  Heart,
  ArrowUpRight,
} from "lucide-react";

export default function RideFinderFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* COL 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-emerald-600 p-2 rounded-xl text-white shadow-sm">
                <Car className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Ride<span className="text-emerald-500">Finder</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Your reliable companion for effortless commuting and city-to-city travel. Compare routes, secure rides, and travel with total peace of mind.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-gray-400">
              <div className="flex items-center gap-1.5 bg-gray-800/80 px-3 py-1.5 rounded-full border border-gray-700/60">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Verified Drivers</span>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-800/80 px-3 py-1.5 rounded-full border border-gray-700/60">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span>Real-time Tracking</span>
              </div>
            </div>
          </div>

          {/* COL 3: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {["Find a Ride", "Become a Driver", "Safety Guidelines", "Pricing & Fares", "City Coverage"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1 group"
                  >
                    <span>{item}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 4: Legal & Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Support
            </h3>
            <ul className="space-y-2.5 text-sm">
              {["Help Center", "Terms of Service", "Privacy Policy", "Cookie Settings", "Contact Support"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 5: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Agrabad Commercial Area, Chattogram, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <a href="mailto:support@ridefinder.com" className="hover:text-emerald-400 transition-colors">
                  support@ridefinder.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <a href="tel:+8801700000000" className="hover:text-emerald-400 transition-colors">
                  +880 1700-000000
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {currentYear} RideFinder Project. All rights reserved.</p>
          <div className="flex items-center gap-1 text-gray-400">
            <span>Built with</span>
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
            <span>for seamless urban mobility.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}