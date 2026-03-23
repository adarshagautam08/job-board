// components/BounceLoader.tsx
import React from "react";

interface BounceLoaderProps {
  size?: number; // in rem
  colors?: string[]; // array of colors for the dots
}

const BounceLoader: React.FC<BounceLoaderProps> = ({
  size = 1.25, // default 1.25rem = 20px
  colors = ["#d991c2", "#9869b8", "#6756cc"],
}) => {
  return (
    <div className="w-full flex justify-center items-center gap-x-2">
      {colors.map((color, i) => (
        <div
          key={i}
          className="rounded-full animate-bounce animate-pulse"
          style={{
            width: `${size}rem`,
            height: `${size}rem`,
            backgroundColor: color,
            animationDelay: `${i * 0.2}s`, // stagger the bounce
          }}
        ></div>
      ))}
    </div>
  );
};

export default BounceLoader;