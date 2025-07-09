import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"; // Assuming you use this icon

const SingleRequisitionSkeleton = () => {
  return (
    <div className="border rounded-md animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center bg-gray-100 p-4 rounded-md justify-between">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>{" "}
        {/* Solicitud ID */}
        <div className="h-6 bg-gray-200 rounded w-20"></div> {/* State */}
        <div className="h-4 bg-gray-200 rounded w-1/5"></div> {/* Date */}
        <div className="h-4 bg-gray-200 rounded w-1/5"></div> {/* Creator */}
        <div className="h-8 w-32 bg-blue-200 rounded-md"></div> {/* Button */}
      </div>

      {/* Expanded Content Skeleton (mimicking the horizontal scroll part) */}
      <div className="relative w-full py-12 flex items-start gap-12 px-12 overflow-hidden">
        {/* Scroll Buttons Placeholder */}
        <div className="absolute left-[-2.2rem] top-1/2 transform -translate-y-1/2 z-20 h-10 w-10 bg-gray-200 rounded-full"></div>
        <div className="absolute right-[-2.2rem] top-1/2 transform -translate-y-1/2 z-20 h-10 w-10 bg-gray-200 rounded-full"></div>

        {/* Individual Requisition Card Skeletons */}
        {/* You can render multiple of these if you want to show horizontal loading */}
        {Array.from({ length: 2 }).map(
          (
            _,
            idx // Showing 2 requisition cards in expanded view by default
          ) => (
            <div
              key={idx}
              className="flex-shrink-0 min-w-[24rem] relative flex flex-col items-center z-10"
            >
              <div className="flex flex-col items-center mb-4 relative">
                <div className="h-3 bg-gray-200 rounded w-24 mb-1"></div>{" "}
                {/* Date */}
                <div className="h-4 w-4 rounded-full border-2 border-white shadow-md bg-gray-300 z-10"></div>{" "}
                {/* Dot */}
                {idx === 0 && (
                  <div className="w-0.5 h-6 bg-gray-300 absolute top-full"></div>
                )}
              </div>
              <div className="bg-gray-50 border rounded-lg p-6 w-full h-48">
                <div className="flex justify-end mb-4">
                  <div className="h-6 w-20 bg-gray-200 rounded-full"></div>{" "}
                  {/* State badge */}
                </div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>{" "}
                {/* Title */}
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-1"></div>{" "}
                {/* Type */}
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>{" "}
                {/* Employee */}
                <div className="h-12 bg-gray-200 rounded w-full"></div>{" "}
                {/* Details */}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const RequisitionSkn = ({ count = 5 }) => {
  // Default to 5 skeletons
  return (
    <div className="space-y-4 p-4">
      {Array.from({ length: count }).map((_, index) => (
        <SingleRequisitionSkeleton key={index} />
      ))}
    </div>
  );
};

export default RequisitionSkn;
