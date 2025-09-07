

import React from "react";

interface CreateProjectIconProps {
  className?: string;
}

export const CreateProjectIcon: React.FC<CreateProjectIconProps> = ({
  className = "",
}) => {
  return (
    <svg
      height="208"
      width="241"
      fill="none"
      viewBox="0 0 241 208"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g filter="url(#filter0_dddd_11820_21424)">
        <path
          d="M14 11C14 6.58172 17.5817 3 22 3H98.1539C100.402 3 102.547 3.94615 104.063 5.60679L118.52 21.4464C120.036 23.107 122.181 24.0532 124.429 24.0532H218.857C223.275 24.0532 226.857 27.6349 226.857 32.0532V149.4C226.857 153.818 223.275 157.4 218.857 157.4H22C17.5817 157.4 14 153.818 14 149.4V11Z"
          fill="url(#paint0_linear_11820_21424)"
          fillOpacity="0.2"
        />
        <path
          d="M22 3.5H98.1543C100.262 3.50012 102.272 4.38758 103.693 5.94434L118.151 21.7832C119.762 23.5475 122.04 24.5527 124.429 24.5527H218.857C222.999 24.5528 226.357 27.9109 226.357 32.0527V149.4C226.357 153.542 222.999 156.9 218.857 156.9H22C17.858 156.9 14.5002 153.542 14.5 149.4V11C14.5 6.85786 17.8579 3.5 22 3.5Z"
          stroke="url(#paint1_linear_11820_21424)"
          strokeOpacity="0.4"
        />
      </g>
      
      {/* Plus icon */}
      <path
        d="M113.762 70.1493C115.788 68.9769 118.088 68.3614 120.429 68.3653C127.793 68.3653 133.762 74.3346 133.762 81.6986C133.762 89.0626 127.793 95.0319 120.429 95.0319C113.065 95.0319 107.095 89.0626 107.095 81.6986C107.095 79.2706 107.745 76.9919 108.879 75.0319"
        opacity="0.4"
        stroke="white"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M124.429 81.6992H120.429M120.429 81.6992H116.429M120.429 81.6992V77.6992M120.429 81.6992V85.6992"
        stroke="white"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      
      {/* Text */}
      <text
        x="120"
        y="140"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#DCDCE1"
        fontSize="12"
        fontWeight="500"
      >
        Create a new project
      </text>

      <defs>
        <filter
          height="282.4"
          id="filter0_dddd_11820_21424"
          width="340.857"
          x="-50"
          y="-61"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood result="BackgroundImageFix" floodOpacity="0" />
          <feGaussianBlur stdDeviation="2.5" />
          <feGaussianBlur stdDeviation="4.5" />
          <feGaussianBlur stdDeviation="6" />
          <feGaussianBlur stdDeviation="7" />
          <feBlend result="effect1_dropShadow_11820_21424" in2="BackgroundImageFix" />
          <feBlend result="effect2_dropShadow_11820_21424" in2="effect1_dropShadow_11820_21424" />
          <feBlend result="effect3_dropShadow_11820_21424" in2="effect2_dropShadow_11820_21424" />
          <feBlend result="effect4_dropShadow_11820_21424" in2="effect3_dropShadow_11820_21424" />
          <feBlend result="shape" in="SourceGraphic" in2="effect4_dropShadow_11820_21424" />
        </filter>
        <clipPath id="bgblur_0_11820_21424_clip_path" transform="translate(50 61)">
          <path d="M14 11C14 6.58172 17.5817 3 22 3H98.1539C100.402 3 102.547 3.94615 104.063 5.60679L118.52 21.4464C120.036 23.107 122.181 24.0532 124.429 24.0532H218.857C223.275 24.0532 226.857 27.6349 226.857 32.0532V149.4C226.857 153.818 223.275 157.4 218.857 157.4H22C17.5817 157.4 14 153.818 14 149.4V11Z" />
        </clipPath>
        <linearGradient
          id="paint0_linear_11820_21424"
          gradientUnits="userSpaceOnUse"
          x1="14"
          x2="23.4384"
          y1="3"
          y2="168.968"
        >
          <stop stopColor="#444456" />
          <stop offset="1" stopColor="#101017" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_11820_21424"
          gradientUnits="userSpaceOnUse"
          x1="120.429"
          x2="120.429"
          y1="3"
          y2="157.4"
        >
          <stop stopColor="#6F6F85" />
          <stop offset="0.64" stopColor="#353541" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
