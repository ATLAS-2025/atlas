import React from "react";

interface PeopleIconProps {
  className?: string;
  size?: number;
}

export const PeopleIcon: React.FC<PeopleIconProps> = ({ 
  className = "", 
  size = 16 
}) => {
  return (
    <svg 
      height={size} 
      width={size} 
      fill="none" 
      viewBox="0 0 16 16" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M7.99967 6.66665C9.47243 6.66665 10.6663 5.47274 10.6663 3.99998C10.6663 2.52722 9.47243 1.33331 7.99967 1.33331C6.52691 1.33331 5.33301 2.52722 5.33301 3.99998C5.33301 5.47274 6.52691 6.66665 7.99967 6.66665Z" 
        stroke="currentColor" 
        strokeWidth="1.2"
      />
      <path 
        d="M12 5.99996C13.1047 5.99996 14 5.25329 14 4.33329C14 3.41329 13.1047 2.66663 12 2.66663M4 5.99996C2.89533 5.99996 2 5.25329 2 4.33329C2 3.41329 2.89533 2.66663 4 2.66663" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeWidth="1.2"
      />
      <path 
        d="M8 14C10.2091 14 12 12.8061 12 11.3333C12 9.86053 10.2091 8.66663 8 8.66663C5.79086 8.66663 4 9.86053 4 11.3333C4 12.8061 5.79086 14 8 14Z" 
        stroke="currentColor" 
        strokeWidth="1.2"
      />
      <path 
        d="M13.3332 12.6666C14.5025 12.41 15.3332 11.7606 15.3332 11C15.3332 10.2393 14.5025 9.58998 13.3332 9.33331M2.6665 12.6666C1.49717 12.41 0.666504 11.7606 0.666504 11C0.666504 10.2393 1.49717 9.58998 2.6665 9.33331" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeWidth="1.2"
      />
    </svg>
  );
};
