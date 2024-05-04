interface Heart2Props {
  className?: string;
}

export const Heart2 = ({ className }: Heart2Props) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 100 100"
      width="100"
      height="100"
      preserveAspectRatio="xMidYMid meet"
      style={{
        width: "100%",
        height: "100%",
        transform: "translate3d(0px, 0px, 0px)",
        contentVisibility: "visible",
      }}
    >
      <defs>
        <clipPath id="__lottie_element_2">
          <rect width="100" height="100" x="0" y="0"></rect>
        </clipPath>
      </defs>
      <g clipPath="url(#__lottie_element_2)">
        <g
          transform="matrix(0.4000000059604645,0,0,0.4000000059604645,49.03379821777344,49.66679763793945)"
          opacity="1"
          style={{
            display: "block",
          }}
        >
          <g opacity="1" transform="matrix(1,0,0,1,0,0)">
            <path
              fillRule="evenodd"
              fillOpacity="1"
              d=" M-4.583000183105469,-10.166999816894531 C-9.416000366210938,-10.166999816894531 -11.25,-5.583000183105469 -11.25,-2.25 C-11.25,5.416999816894531 -0.4169999957084656,16.08300018310547 2.8329999446868896,16.08300018310547 C6.083000183105469,16.08300018310547 17.16699981689453,6 17.16699981689453,-2.3329999446868896 C17.16699981689453,-6.833000183105469 14.083999633789062,-10 10.166999816894531,-10 C6.25,-10 2.9170000553131104,-5.916999816894531 2.9170000553131104,-5.916999816894531 C2.9170000553131104,-5.916999816894531 0.25,-10.166999816894531 -4.583000183105469,-10.166999816894531z"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
};
