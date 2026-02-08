import { cn } from "../../lib/utils";
import React from "react";

export const LightRays = ({
  className,
  speed = 5, // Slower speed looks more majestic
  width = "100%",
  height = "100%",
  ...props
}) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      {...props}
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: `
            repeating-conic-gradient(
              from 0deg at 50% -50%, 
              transparent 0deg,
              #2dd4bf 10deg,  
              transparent 20deg,
              #a855f7 30deg,  
              transparent 40deg,
              #2dd4bf 50deg,  
              transparent 60deg
            )
          `,
          width,
          height,
          // Mask to fade out the bottom and sides
          maskImage:
            "radial-gradient(ellipse at 50% 0%, black 40%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 0%, black 40%, transparent 70%)",
          // The Sway Animation
          animation: `sway ${speed * 2}s ease-in-out infinite alternate`,
        }}
      />

      <style>{`
        @keyframes sway {
          0% { transform: rotate(-15deg) scale(1.5); }
          100% { transform: rotate(15deg) scale(1.5); }
        }
      `}</style>
    </div>
  );
};

export default LightRays;
