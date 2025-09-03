import React from "react";

export const ArrowDownIcon: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <svg
      height="18"
      width="18"
      fill="none"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12.5 7.5L9 10.5L5.5 7.5"
        stroke="#8B8B9D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
