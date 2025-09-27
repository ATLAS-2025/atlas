import React from "react";

interface DocumentsInstructionsIconProps {
  className?: string;
  size?: number;
}

export const DocumentsInstructionsIcon: React.FC<DocumentsInstructionsIconProps> = ({ 
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
        d="M3 10C3 6.229 3 4.343 4.172 3.172C5.344 2.001 7.229 2 11 2H13C16.771 2 18.657 2 19.828 3.172C20.999 4.344 21 6.229 21 10V14C21 17.771 21 19.657 19.828 20.828C18.656 21.999 16.771 22 13 22H11C7.229 22 5.343 22 4.172 20.828C3.001 19.656 3 17.771 3 14V10Z" 
        stroke="currentColor" 
        strokeWidth="1.5"
      />
      <path 
        d="M8 12H16M8 8H16M8 16H13" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeWidth="1.5"
      />
    </svg>
  );
};
