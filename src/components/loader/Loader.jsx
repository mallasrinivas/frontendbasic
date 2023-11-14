import React from "react";

export default function Loader() {
  return (
    <div
      className={`${
        window.innerWidth <= 768
          ? "w-4 h-4 border-t-4 border-blue-500"
          : "w-8 h-8 border-t-8 border-blue-500"
      } border-transparent rounded-full animate-spin fixed inset-0 m-auto`}
      style={{ transform: "translate(-50%, -50%)" }} // Offset the positioning to truly center it
      role="status"
      aria-live="assertive"
    >
      <span class="sr-only">Loading...</span>
    </div>
  );
}
