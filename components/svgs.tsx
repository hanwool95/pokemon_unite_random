export const BottomArrow = ({
  onClick,
  isRotated,
}: {
  onClick?: () => void;
  isRotated?: boolean;
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <g
        transform={`translate(0,-540.3622) ${isRotated ? "rotate(180 256 796.5)" : ""}`}
      >
        <path
          style={{
            fill: "#222222",
            fillOpacity: 1,
            stroke: "#222222",
            strokeWidth: "38.88",
            strokeLinejoin: "round",
            strokeMiterlimit: 4,
            strokeOpacity: 1,
            strokeDasharray: "none",
          }}
          d="M 72.71772,732.21344 255.99937,915.49506 439.28228,732.21344 384.29689,677.22934 255.99937,805.52686 127.70315,677.22934 z"
        />
      </g>
    </svg>
  );
};
