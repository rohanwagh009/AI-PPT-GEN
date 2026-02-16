import React from "react";

export const Meteors = ({ number = 20 }) => {
  const meteors = new Array(number).fill(true);

  return (
    <>
      {meteors.map((_, idx) => (
        <span
          key={"meteor" + idx}
          style={{
            position: "absolute",
            top: 0, // Start from the very top
            // CHANGE: Random position between 0% and 100% of the screen width
            left: Math.floor(Math.random() * 100) + "%",

            height: "2px",
            width: "2px",
            borderRadius: "9999px",
            backgroundColor: "#ffffff",
            boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.1)",
            transform: "rotate(215deg)",
            opacity: 0,

            // Randomize Animation Speed
            animation: `meteor 5s linear infinite`,
            animationDelay: Math.random() * 1 + 0.2 + "s",
            animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
          }}
        >
          {/* The Tail */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              zIndex: -10,
              height: "1px",
              width: "150px", // Longer tail for dramatic effect
              transform: "translateY(-50%)",
              background: "linear-gradient(to right, #ffffff, transparent)",
            }}
          />
        </span>
      ))}

      <style>{`
        @keyframes meteor {
          0% {
            transform: rotate(215deg) translateX(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(215deg) translateX(-1000px); /* Travel further */
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default Meteors;
