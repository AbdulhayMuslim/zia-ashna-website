"use client";

import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const handleClick = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed top-20 md:top-25 left-4 flex gap-2 text-sm items-center z-50 rounded-full bg-[#fbd9bd] text-brand-primary p-2 shadow-lg hover:bg-gray-800 transition"
      aria-label="Go back"
    >
      <ArrowLeftCircle className="h-5 w-5" />
    </button>
  );
}
