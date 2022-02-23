import * as React from "react";

/**
 * Generates a Plus image component.
 * Needed so the .svg can be recolored on hover/interaction.
 */
function Plus(props) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        d="M6.875 1V6.875M6.875 6.875V12.75M6.875 6.875H12.75M6.875 6.875H1"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Plus;
