import Image from "next/image";
import QuickRideCard from "./components/QuickRideCard";
import FleetShowcase from "./components/FleetShowcase";
import HowItWorks from "./components/HowItWorks";
import PopularRoutes from "./components/PopularRoutes";
import DriverCtaBanner from "./components/DriverCtaBanner";

export default function Home() {
  return (
    <div>
      <QuickRideCard />
      <FleetShowcase />
      <HowItWorks />
      <PopularRoutes />
      <DriverCtaBanner />
    </div>
  );
}
