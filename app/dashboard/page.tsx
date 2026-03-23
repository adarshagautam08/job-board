"use client";

import { useSession } from "next-auth/react";
import EmployerDashboard from "../component/EmployerDashboard";
import SeekerDashboard from "../component/SeekerDashboard";
import BounceLoader from "../component/BounceLoader";

export default function Dashboard() {
  const { data: session, status } = useSession();

  // While session is loading, show loader
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <BounceLoader size={1.5} />
      </div>
    );
  }

  // Show Employer Dashboard
  if (session?.user?.role === "EMPLOYER") {
    return <EmployerDashboard session={session} />;
  }

  // Show Seeker Dashboard
  if (session?.user?.role === "SEEKER") {
    return <SeekerDashboard session={session} />;
  }

  // Optional: fallback if not logged in
  return (
    <div className="flex justify-center items-center h-screen text-white">
      You must be logged in to view this page.
    </div>
  );
}