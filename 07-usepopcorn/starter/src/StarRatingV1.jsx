// export default function App() {
//   return (
//     <div>
//       <TextExpander>
//         Space travel is the ultimate adventure! Imagine soaring past the stars
//         and exploring new worlds. It's the stuff of dreams and science fiction,
//         but believe it or not, space travel is a real thing. Humans and robots
//         are constantly venturing out into the cosmos to uncover its secrets and
//         push the boundaries of what's possible.
//       </TextExpander>

//       <TextExpander
//         collapsedNumWords={20}
//         expandButtonText="Show text"
//         collapseButtonText="Collapse text"
//         buttonColor="#ff6622"
//       >
//         Space travel requires some seriously amazing technology and
//         collaboration between countries, private companies, and international
//         space organizations. And while it's not always easy (or cheap), the
//         results are out of this world. Think about the first time humans stepped
//         foot on the moon or when rovers were sent to roam around on Mars.
//       </TextExpander>

//       <TextExpander expanded={true} className="box">
//         Space missions have given us incredible insights into our universe and
//         have inspired future generations to keep reaching for the stars. Space
//         travel is a pretty cool thing to think about. Who knows what we'll
//         discover next!
//       </TextExpander>
//     </div>
//   );
// }

// const TextExpander = ({
//   children,
//   expandButtonText = " Show More",
//   collapseButtonText = " Show Less",
//   buttonColor = "green",
//   collapsedNumWords = 10,
//   expanded = false,
//   className,
// }) => {
//   const [isExpanded, setIsExpanded] = useState(expanded);
//   const shoten = (text) => {
//     return text.split(" ").slice(0, collapsedNumWords).join(" ") + "...";
//   };

//   const handlenext = () => {
//     setIsExpanded(!isExpanded);
//   };

//   const buttonStyle = {
//     background: "none",
//     border: "none",
//     font: "inherit",
//     cursor: "pointer",
//     marginLeft: "6px",
//     color: buttonColor,
//   };
//   return (
//     <div className={className}>
//       {isExpanded ? children : shoten(children)}
//       <span>
//         <button style={buttonStyle} onClick={handlenext}>
//           {!isExpanded ? expandButtonText : collapseButtonText}
//         </button>
//       </span>
//     </div>
//   );
// };

import React, { useState } from "react";
import PropTypes from "prop-types";

const StarRating = ({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  message = [],
  onSetRating,
}) => {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };

  const starContinerStyle = {
    display: "flex",
  };

  const textStyle = {
    lineHeight: "0",
    margin: "0",
    color,
    fontSize: `${size / 2}px`,
  };
  const handleRating = (rating) => {
    setRating(rating);
    onSetRating(rating);
  };
  return (
    <div style={containerStyle}>
      <div style={starContinerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverin={() => setTempRating(i + 1)}
            onHoverout={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {message.length === maxRating
          ? message[tempRating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
};

export default StarRating;

StarRating.propTypes = {
  maxRating: PropTypes.number,
  message: PropTypes.array,
  color: PropTypes.string,
};

const Star = ({ onRate, full, onHoverin, onHoverout, color, size }) => {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
    color,
  };

  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverin}
      onMouseLeave={onHoverout}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke="#000"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
};

// import React, { useState } from "react";

// const StarRating = ({ maxRating = 5 }) => {
//   const [rating, setRating] = useState(0);
//   const [tempRating, setTempRating] = useState(0);

//   const containerStyle = {
//     display: "flex",
//     alignItems: "center",
//     gap: "16px",
//   };

//   const starContinerStyle = {
//     display: "flex",
//   };

//   const textStyle = {
//     lineHeight: "0",
//     margin: "0",
//   };

//   const handleRating = (rating) => {
//     setRating(rating);
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={starContinerStyle}>
//         {Array.from({ length: maxRating }, (_, i) => (
//           <Star
//             key={i}
//             onRate={() => handleRating(i + 1)}
//             full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
//             onHoverin={() => setTempRating(i + 1)}
//             onHoverout={() => setTempRating(0)}
//           />
//         ))}
//       </div>
//       <p style={textStyle}>{rating || tempRating || ""}</p>
//     </div>
//   );
// };

// export default StarRating;

// const starStyle = {
//   width: "48px",
//   height: "48px",
//   display: "block",
//   cursor: "pointer",
// };

// const Star = ({ onRate, full, onHoverin, onHoverout }) => {
//   return (
//     <span
//       style={starStyle}
//       role="button"
//       onClick={onRate}
//       onMouseEnter={onHoverin}
//       onMouseLeave={onHoverout}
//     >
//       {full ? (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill="#000"
//           stroke="#000"
//         >
//           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//         </svg>
//       ) : (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="#000"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="{2}"
//             d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
//           />
//         </svg>
//       )}
//     </span>
//   );
// };

/*
SPACING SYSTEM (px)
2 / 4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 128

FONT SIZE SYSTEM (px)
10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 /52 / 62 / 74 / 86 / 98
*/

/*
FULL STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="#000"
  stroke="#000"
>
  <path
    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
  />
</svg>


EMPTY STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="#000"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="{2}"
    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
  />
</svg>

*/
