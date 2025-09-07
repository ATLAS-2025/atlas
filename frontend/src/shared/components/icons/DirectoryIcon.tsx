

import React from "react";

interface DirectoryIconProps {
  className?: string;
  color?: "purple" | "teal" | "orange" | "gray";
  testCount?: number;
  lastTest?: string;
  projectName?: string;
}

export const DirectoryIcon: React.FC<DirectoryIconProps> = ({
  className = "",
  color = "purple",
  testCount = 0,
  lastTest = "Beta",
  projectName = "Project",
}) => {
  const getColorClasses = () => {
    switch (color) {
      case "purple":
        return {
          folder: "#6945F7",
          progress: "#8C54EF",
          badge: "#6945F7",
        };
      case "teal":
        return {
          folder: "#0EFF4F",
          progress: "#00D4AA",
          badge: "#6945F7",
        };
      case "orange":
        return {
          folder: "#FF6B35",
          progress: "#FF8C42",
          badge: "#6945F7",
        };
      case "gray":
        return {
          folder: "#8B8B9D",
          progress: "#676776",
          badge: "#6945F7",
        };
      default:
        return {
          folder: "#6945F7",
          progress: "#8C54EF",
          badge: "#6945F7",
        };
    }
  };

  const colors = getColorClasses();

  return (
    <svg
      height="208"
      width="242"
      fill="none"
      viewBox="0 0 242 208"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g filter="url(#filter0_dddd_11825_15939)">
        <path
          d="M14.7144 11C14.7144 6.58172 18.2961 3 22.7144 3H98.8682C101.117 3 103.261 3.94615 104.777 5.60679L119.235 21.4464C120.75 23.107 122.895 24.0532 125.143 24.0532H219.572C223.99 24.0532 227.572 27.6349 227.572 32.0532V149.4C227.572 153.818 223.99 157.4 219.572 157.4H22.7143C18.2961 157.4 14.7144 153.818 14.7144 149.4V11Z"
          fill="url(#paint0_linear_11825_15939)"
          fillOpacity="0.2"
        />
        <path
          d="M22.7144 3.5H98.8687C100.976 3.50012 102.987 4.38758 104.408 5.94434L118.866 21.7832C120.476 23.5475 122.754 24.5527 125.143 24.5527H219.572C223.714 24.5528 227.072 27.9109 227.072 32.0527V149.4C227.072 153.542 223.714 156.9 219.572 156.9H22.7144C18.5724 156.9 15.2146 153.542 15.2144 149.4V11C15.2144 6.85786 18.5722 3.5 22.7144 3.5Z"
          stroke="url(#paint1_linear_11825_15939)"
          strokeOpacity="0.4"
        />
      </g>
      
      {/* Progress bars with different colors */}
      <g filter="url(#filter1_i_11825_15939)">
        <rect
          height="68.48"
          width="204.857"
          fill={colors.progress}
          fillOpacity="0.12"
          rx="4"
          x="18.7144"
          y="35"
        />
      </g>
      <g filter="url(#filter2_i_11825_15939)">
        <rect
          height="68.48"
          width="204.857"
          fill={colors.progress}
          fillOpacity="0.12"
          rx="4"
          x="18.7144"
          y="39.4805"
        />
      </g>
      <g filter="url(#filter3_i_11825_15939)">
        <rect
          height="68.48"
          width="204.857"
          fill={colors.progress}
          fillOpacity="0.12"
          rx="4"
          x="18.7144"
          y="43.9609"
        />
      </g>
      <g filter="url(#filter4_i_11825_15939)">
        <rect
          height="68.48"
          width="204.857"
          fill={colors.progress}
          fillOpacity="0.12"
          rx="4"
          x="18.7144"
          y="48.4395"
        />
      </g>
      <g filter="url(#filter5_i_11825_15939)">
        <rect
          height="68.48"
          width="204.857"
          fill={colors.progress}
          fillOpacity="0.12"
          rx="4"
          x="18.7144"
          y="52.9199"
        />
      </g>
      
      {/* Main content area */}
      <g filter="url(#filter6_i_11825_15939)">
        <rect
          height="96"
          width="204.857"
          fill="#0E0C17"
          fillOpacity="0.8"
          rx="4"
          x="18.7144"
          y="57.4004"
        />
        <rect
          height="31"
          width="31"
          fill="#0E0C17"
          fillOpacity="0.8"
          rx="3.5"
          x="184.072"
          y="113.9"
        />
        <rect
          height="31"
          width="31"
          rx="3.5"
          stroke="#1D1D26"
          x="184.072"
          y="113.9"
        />
        
        {/* Test count badge */}
        <rect
          height="20"
          width="24"
          fill={colors.badge}
          fillOpacity="0.8"
          rx="3"
          x="190"
          y="130"
        />
        <text
          x="202"
          y="142"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#FFFFFF"
          fontSize="10"
          fontWeight="600"
        >
          {testCount}
        </text>
        
        {/* Last test text */}
        <text
          x="27"
          y="125"
          fill="#8B8B9D"
          fontSize="9"
        >
          Last test - {lastTest}
        </text>
        
        {/* Project name text */}
        <text
          x="27"
          y="140"
          fill="#FFFFFF"
          fontSize="11"
          fontWeight="600"
        >
          {projectName}
        </text>
      </g>

      <defs>
        <filter
          height="282.4"
          id="filter0_dddd_11825_15939"
          width="340.857"
          x="-49.2856"
          y="-61"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood result="BackgroundImageFix" floodOpacity="0" />
          <feGaussianBlur stdDeviation="2.5" />
          <feGaussianBlur stdDeviation="4.5" />
          <feGaussianBlur stdDeviation="6" />
          <feGaussianBlur stdDeviation="7" />
          <feBlend result="effect1_dropShadow_11825_15939" in2="BackgroundImageFix" />
          <feBlend result="effect2_dropShadow_11825_15939" in2="effect1_dropShadow_11825_15939" />
          <feBlend result="effect3_dropShadow_11825_15939" in2="effect2_dropShadow_11825_15939" />
          <feBlend result="effect4_dropShadow_11825_15939" in2="effect3_dropShadow_11825_15939" />
          <feBlend result="shape" in="SourceGraphic" in2="effect4_dropShadow_11825_15939" />
        </filter>
        <filter
          height="69.4805"
          id="filter1_i_11825_15939"
          width="204.857"
          x="18.7144"
          y="35"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood result="BackgroundImageFix" floodOpacity="0" />
          <feBlend result="shape" in="SourceGraphic" in2="BackgroundImageFix" />
          <feBlend result="effect1_innerShadow_11825_15939" in2="shape" />
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
        <filter
          height="69.4805"
          id="filter2_i_11825_15939"
          width="204.857"
          x="18.7144"
          y="39.4805"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood result="BackgroundImageFix" floodOpacity="0" />
          <feBlend result="shape" in="SourceGraphic" in2="BackgroundImageFix" />
          <feBlend result="effect1_innerShadow_11825_15939" in2="shape" />
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
        <filter
          height="69.4805"
          id="filter3_i_11825_15939"
          width="204.857"
          x="18.7144"
          y="43.9609"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood result="BackgroundImageFix" floodOpacity="0" />
          <feBlend result="shape" in="SourceGraphic" in2="BackgroundImageFix" />
          <feBlend result="effect1_innerShadow_11825_15939" in2="shape" />
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
        <filter
          height="69.4805"
          id="filter4_i_11825_15939"
          width="204.857"
          x="18.7144"
          y="48.4395"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood result="BackgroundImageFix" floodOpacity="0" />
          <feBlend result="shape" in="SourceGraphic" in2="BackgroundImageFix" />
          <feBlend result="effect1_innerShadow_11825_15939" in2="shape" />
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
        <filter
          height="69.4805"
          id="filter5_i_11825_15939"
          width="204.857"
          x="18.7144"
          y="52.9199"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood result="BackgroundImageFix" floodOpacity="0" />
          <feBlend result="shape" in="SourceGraphic" in2="BackgroundImageFix" />
          <feBlend result="effect1_innerShadow_11825_15939" in2="shape" />
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
        <filter
          height="224"
          id="filter6_i_11825_15939"
          width="332.857"
          x="-45.2856"
          y="-6.59961"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood result="BackgroundImageFix" floodOpacity="0" />
          <feBlend result="shape" in="SourceGraphic" in2="BackgroundImageFix" />
          <feBlend result="effect1_innerShadow_11825_15939" in2="shape" />
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
        <linearGradient
          id="paint0_linear_11825_15939"
          gradientUnits="userSpaceOnUse"
          x1="14.7144"
          x2="24.1528"
          y1="3"
          y2="168.968"
        >
          <stop stopColor="#444456" />
          <stop offset="1" stopColor="#101017" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_11825_15939"
          gradientUnits="userSpaceOnUse"
          x1="121.143"
          x2="121.143"
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
