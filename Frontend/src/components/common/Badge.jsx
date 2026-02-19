import { clsx } from "clsx";

const variants = {
  default: "bg-gray-100 text-gray-700",
  primary: "bg-primary-100 text-primary-700",
  secondary: "bg-secondary-100 text-secondary-700",
  success: "bg-success-50 text-success-600",
  warning: "bg-warning-50 text-warning-600",
  danger: "bg-danger-50 text-danger-600",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-sm",
};

export const Badge = ({
  children,
  variant = "default",
  size = "md",
  dot = false,
  className,
}) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center font-medium rounded-full",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {dot && (
        <span
          className={clsx(
            "w-1.5 h-1.5 rounded-full mr-1.5",
            variant === "success" && "bg-success-500",
            variant === "warning" && "bg-warning-500",
            variant === "danger" && "bg-danger-500",
            variant === "primary" && "bg-primary-500",
            variant === "default" && "bg-gray-500",
          )}
        />
      )}
      {children}
    </span>
  );
};
