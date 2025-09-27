import React from "react";

interface GlobalTestScheduleIconProps {
  className?: string;
  size?: number;
}

export const GlobalTestScheduleIcon: React.FC<GlobalTestScheduleIconProps> = ({ 
  className = "", 
  size = 24 
}) => {
  return (
    <svg 
      height={size} 
      width={size} 
      fill="none" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M22 14V12C22 8.229 22 6.343 20.828 5.172C19.656 4.001 17.771 4 14 4H10C6.229 4 4.343 4 3.172 5.172C2.001 6.344 2 8.229 2 12V14C2 17.771 2 19.657 3.172 20.828C4.344 21.999 6.229 22 10 22H14M7 4V2.5M17 4V2.5" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeWidth="1.5"
      />
      <path 
        d="M18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15C16.3431 15 15 16.3431 15 18C15 19.6569 16.3431 21 18 21Z" 
        stroke="currentColor" 
        strokeWidth="1.5"
      />
      <path 
        d="M20.5 20.5L22 22M2.5 9H21.5" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeWidth="1.5"
      />
    </svg>
  );
};
