import React from "react";

interface SidebarToggleIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const SidebarToggleIcon: React.FC<SidebarToggleIconProps> = ({
  size = 20,
  className,
  ...props
}) => (
  <svg
    height={size}
    width={size}
    fill="none"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M1.66675 9.16666C1.66675 6.02416 1.66675 4.45249 2.64341 3.47666C3.62008 2.50083 5.19091 2.49999 8.33341 2.49999H11.6667C14.8092 2.49999 16.3809 2.49999 17.3567 3.47666C18.3326 4.45333 18.3334 6.02416 18.3334 9.16666V10.8333C18.3334 13.9758 18.3334 15.5475 17.3567 16.5233C16.3801 17.4992 14.8092 17.5 11.6667 17.5H8.33341C5.19091 17.5 3.61925 17.5 2.64341 16.5233C1.66758 15.5467 1.66675 13.9758 1.66675 10.8333V9.16666Z"
      stroke="#515052"
      strokeWidth="1.4"
    />
    <path
      d="M4.5835 8.33333H9.5835M5.41683 11.6667H8.75016M12.5002 17.5V2.49999"
      stroke="#515052"
      strokeLinecap="round"
      strokeWidth="1.4"
    />
  </svg>
);
