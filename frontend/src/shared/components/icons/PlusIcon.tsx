import React from "react";

interface PlusIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const PlusIcon: React.FC<PlusIconProps> = ({
  size = 16,
  className,
  ...props
}) => (
  <svg
    height={size}
    width={size}
    fill="none"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M8 4.5V11.5M4.5 8H11.5"
      stroke="#515052"
      strokeLinecap="round"
      strokeWidth="1.2"
    />
  </svg>
);