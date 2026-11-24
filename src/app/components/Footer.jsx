
"use client";

import React from "react";
import Link from "next/link";
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

const NAVIGATION_LINKS = [
  { label: "Find a Ride", href: "/PublicRoute/findride" },
  { label: "Become a Driver", href: "/PublicRoute/becomedriver" },
  { label: "Safety Guidelines", href: "/PublicRoute/safetyguidelines" },
  { label: "Pricing & Fares", href: "/PublicRoute/pricingfares" },
  { label: "City Coverage", href: "/PublicRoute/citycoverage" },
];

const SUPPORT_LINKS = [
  { label: "Help Center", href: "/support/help-center" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Cookie Settings", href: "/legal/cookies" },
  { label: "Contact Support", href: "/support/contact" },
];

const CONTACT_ITEMS = [
  {
    id: "address",
    text: "Agrabad Commercial Area, Chattogram, Bangladesh",
    href: "/coverage",
    icon: MapPin,
    multiline: true,
  },
  {
    id: "email",
    text: "support@ridefinder.com",
    href: "mailto:support@ridefinder.com",
    icon: Mail,
    external: true,
  },
  {
    id: "phone",
    text: "+880 1700-000000",
    href: "tel:+8801700000000",
    icon: Phone,
    external: true,
  },
];

const TRUST_BADGES = [
  { label: "Verified Drivers", icon: ShieldCheck },
  { label: "Real-time Tracking", icon: MapPin },
];

export default function RideFinderFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45 }}
      className="w-full bg-gray-900 text-gray-300 border-t border-gray-800 mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* COL 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <motion.div
                whileHover={{ rotate: -6, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 16 }}
                className="bg-emerald-600 p-2 rounded-xl text-white shadow-sm group-hover:bg-emerald-500 transition-colors"
              >
                <Car className="h-5 w-5" />
              </motion.div>
              <span className="text-xl font-bold tracking-tight text-white">
                Ride<span className="text-emerald-500">Finder</span>
              </span>
            </Link>

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Your reliable companion for effortless commuting and city-to-city
              travel. Compare routes, secure rides, and travel with total peace
              of mind.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-gray-400">
              {TRUST_BADGES.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 bg-gray-800/80 px-3 py-1.5 rounded-full border border-gray-700/60"
                >
                  <Icon className="h-4 w-4 text-emerald-400" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* COL 3: Dynamic Navigation Routes */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {NAVIGATION_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-emerald-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 4: Dynamic Support & Legal Routes */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Support
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SUPPORT_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-emerald-400" />
                  </Link>
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
              {CONTACT_ITEMS.map(({ id, text, href, icon: Icon, external, multiline }) => (
                <li
                  key={id}
                  className={multiline ? "flex items-start gap-2.5" : "flex items-center gap-2.5"}
                >
                  <Icon
                    className={`h-4 w-4 text-emerald-400 shrink-0 ${multiline ? "mt-0.5" : ""
                      }`}
                  />
                  {external ? (
                    <a
                      href={href}
                      className="hover:text-emerald-400 transition-colors"
                    >
                      {text}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="hover:text-emerald-400 transition-colors"
                    >
                      {text}
                    </Link>
                  )}
                </li>
              ))}
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
    </motion.footer>
  );
}





