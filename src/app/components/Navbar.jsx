
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Search,
  MapPin,
  Menu,
  X,
  LogOut,
  User,
  Navigation,
  Clock,
  Sparkles,
} from "lucide-react";

const MotionLink = motion.create(Link);

const POPULAR_DESTINATIONS = [
  "Shah Amanat International Airport",
  "GEC Circle, Chattogram",
  "Agrabad Commercial Area",
  "Patenga Sea Beach",
];

export default function RideFinderNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll for dynamic navbar elevation & backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    console.log("Searching rides to:", searchQuery);
    setIsSearchFocused(false);
    setIsMobileMenuOpen(false);
  };

  const selectSuggestion = (destination) => {
    setSearchQuery(destination);
    setIsSearchFocused(false);
  };

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-md border-b border-gray-200/80 shadow-md"
          : "bg-white border-b border-gray-200 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* LEFT: Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <MotionLink
              href="/"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2.5 group"
            >
              <motion.div
                whileHover={{ rotate: -6 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="bg-emerald-600 p-2 rounded-xl text-white shadow-sm group-hover:bg-emerald-700 transition-colors"
              >
                <Car className="h-5 w-5" />
              </motion.div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Ride<span className="text-emerald-600">Finder</span>
              </span>
            </MotionLink>
          </div>

          {/* MIDDLE: Interactive Search Bar + Animated Suggestions */}
          <div className="hidden sm:flex flex-1 max-w-lg mx-4 relative">
            <motion.form
              onSubmit={handleSearch}
              animate={{ scale: isSearchFocused ? 1.015 : 1 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="w-full relative"
            >
              <div className="relative flex items-center w-full">
                <MapPin
                  className={`h-4 w-4 absolute left-3.5 pointer-events-none transition-colors duration-200 ${
                    isSearchFocused ? "text-emerald-600" : "text-gray-400"
                  }`}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 180)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Where are you heading? (e.g., Airport, Downtown)"
                  className="w-full pl-10 pr-24 py-2 text-sm bg-gray-100 border border-transparent rounded-full focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 outline-none transition-all"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-20 text-gray-400 hover:text-gray-600 p-1"
                    aria-label="Clear search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute right-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Search className="h-3.5 w-3.5" />
                  <span>Find</span>
                </motion.button>
              </div>
            </motion.form>

            {/* Quick Destination Dropdown */}
            <AnimatePresence>
              {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-200/90 shadow-xl p-2 z-50 overflow-hidden"
                >
                  <div className="px-3 py-1.5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    <span>Popular Destinations</span>
                    <Sparkles className="h-3 w-3 text-emerald-500" />
                  </div>
                  <div className="space-y-0.5">
                    {POPULAR_DESTINATIONS.filter((dest) =>
                      dest.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((destination) => (
                      <button
                        key={destination}
                        type="button"
                        onMouseDown={() => selectSuggestion(destination)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors"
                      >
                        <Clock className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                        <span className="truncate">{destination}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: Auth Links with Smooth State Transition */}
          <div className="hidden md:flex items-center gap-3 min-w-[180px] justify-end">
            <AnimatePresence mode="wait" initial={false}>
              {!isLoggedIn ? (
                <motion.div
                  key="logged-out"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2.5"
                >
                  <MotionLink
                    href="/Auth/signin"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Log in
                  </MotionLink>
                  <MotionLink
                    href="/Auth/signup"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-colors cursor-pointer"
                  >
                    Sign up
                  </MotionLink>
                </motion.div>
              ) : (
                <motion.div
                  key="logged-in"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2.5"
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-200/70 px-3.5 py-1.5 rounded-full">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <User className="h-4 w-4 text-emerald-600" />
                    <span>Rider</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setIsLoggedIn(false)}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Animated Mobile Dropdown Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-gray-200 bg-white/95 backdrop-blur-md"
          >
            <div className="px-4 pt-3 pb-5 space-y-3">
              {/* Mobile Search Bar */}
              <form onSubmit={handleSearch} className="sm:hidden">
                <div className="relative flex items-center">
                  <Navigation className="h-4 w-4 text-emerald-600 absolute left-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Where are you heading?"
                    className="w-full pl-9 pr-20 py-2.5 text-sm bg-gray-100 rounded-xl focus:bg-white focus:border-emerald-500 outline-none border border-gray-200"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 bg-emerald-600 text-white text-xs font-medium px-3.5 py-1.5 rounded-lg"
                  >
                    Find
                  </button>
                </div>
              </form>

              {/* Mobile Auth Links */}
              <div className="flex flex-col gap-2 pt-1">
                {!isLoggedIn ? (
                  <>
                    <MotionLink
                      href="/Auth/signin"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full py-2.5 text-center text-sm font-medium text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50"
                    >
                      Log in
                    </MotionLink>
                    <MotionLink
                      href="/Auth/signup"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full py-2.5 text-center text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-sm"
                    >
                      Sign up
                    </MotionLink>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-xl border border-gray-200/70">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <User className="h-4 w-4 text-emerald-600" />
                        <span>Signed in as Rider</span>
                      </div>
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsLoggedIn(false);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full py-2.5 flex items-center justify-center gap-2 text-sm font-medium text-red-600 border border-red-200 bg-red-50 rounded-xl"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}



