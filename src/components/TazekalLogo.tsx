interface TazekalLogoProps {
  size?: number;
  className?: string;
}

export function TazekalLogo({ size = 80, className = "" }: TazekalLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Circle */}
      <rect
        width="80"
        height="80"
        rx="24"
        fill="#0D9488"
      />
      
      {/* Stylized "T" with a leaf - representing freshness */}
      <path
        d="M25 28C25 26.8954 25.8954 26 27 26H53C54.1046 26 55 26.8954 55 28V32C55 33.1046 54.1046 34 53 34H44V52C44 53.1046 43.1046 54 42 54H38C36.8954 54 36 53.1046 36 52V34H27C25.8954 34 25 33.1046 25 32V28Z"
        fill="white"
      />
      
      {/* Fresh leaf accent on top right */}
      <path
        d="M52 22C52 22 54 22 55 23C56 24 56 26 56 26C56 26 54.5 25 53 25C51.5 25 52 22 52 22Z"
        fill="#A7F3D0"
      />
      
      {/* Small dot accent - representing attention to detail */}
      <circle
        cx="48"
        cy="46"
        r="2"
        fill="#A7F3D0"
      />
    </svg>
  );
}
