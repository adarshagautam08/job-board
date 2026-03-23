"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BounceLoader from "./component/BounceLoader";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      router.push("/jobs"); // client-side redirect
    }, 2000); // wait 2 seconds to show loader
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? <BounceLoader size={1.5} /> : null}
    </div>
  );
}