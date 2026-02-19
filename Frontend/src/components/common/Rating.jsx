import { Star } from "lucide-react";
import { clsx } from "clsx";

export const Rating = ({
  value,
  max = 5,
  size = "md",
  showValue = true,
  reviewCount,
  className,
}) => {
  const sizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className={clsx("flex items-center gap-1", className)}>
      <div className="flex">
        {[...Array(max)].map((_, index) => (
          <Star
            key={index}
            className={clsx(
              sizes[size],
              index < Math.floor(value)
                ? "text-yellow-400 fill-yellow-400"
                : index < value
                  ? "text-yellow-400 fill-yellow-400 opacity-50"
                  : "text-gray-300",
            )}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-gray-700 ml-1">
          {value.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-sm text-gray-500">({reviewCount})</span>
      )}
    </div>
  );
};
