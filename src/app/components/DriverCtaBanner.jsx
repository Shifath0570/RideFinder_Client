import React from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle2, CreditCard } from "lucide-react";

export default function DriverCtaBanner() {
  return (
    <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-lg">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Star className="h-4 w-4 fill-emerald-400" />
            <span>Partner With Us</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold">Drive on your schedule. Earn on every trip.</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Join thousands of verified drivers earning competitive payouts with instant cashouts and zero rigid shifts.
          </p>
          <div className="flex flex-wrap gap-4 pt-2 text-xs text-gray-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Weekly & instant payouts
            </span>
            <span className="flex items-center gap-1.5">
              <CreditCard className="h-4 w-4 text-emerald-400" /> Low platform commission
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl shadow-md transition shrink-0 cursor-pointer"
        >
          Register as a Driver
        </motion.button>
      </div>
    </section>
  );
}