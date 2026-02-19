import { clsx } from "clsx";
import { User } from "lucide-react";

const sizes = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-12 h-12 text-lg",
  xl: "w-16 h-16 text-xl",
  "2xl": "w-20 h-20 text-2xl",
};

export const Avatar = ({ src, alt, name, size = "md", status, className }) => {
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={clsx("relative inline-block", className)}>
      {src ? (
        <img
          src={src}
          alt={alt || name}
          className={clsx("rounded-full object-cover bg-gray-200", sizes[size])}
        />
      ) : (
        <div
          className={clsx(
            "rounded-full bg-gradient-to-br from-primary-400 to-primary-600",
            "flex items-center justify-center text-white font-semibold",
            sizes[size],
          )}
        >
          {initials || <User className="w-1/2 h-1/2" />}
        </div>
      )}
      {status && (
        <span
          className={clsx(
            "absolute bottom-0 right-0 block rounded-full ring-2 ring-white",
            size === "xs" || size === "sm" ? "w-2 h-2" : "w-3 h-3",
            status === "online" && "bg-success-500",
            status === "offline" && "bg-gray-400",
            status === "busy" && "bg-danger-500",
            status === "away" && "bg-warning-500",
          )}
        />
      )}
    </div>
  );
};
