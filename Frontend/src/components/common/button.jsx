import { clsx } from "clsx";
import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
  secondary:
    "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-primary-500",
  success:
    "bg-success-600 text-white hover:bg-success-500 focus:ring-success-500",
  danger: "bg-danger-600 text-white hover:bg-danger-500 focus:ring-danger-500",
  ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
  link: "bg-transparent text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
  xl: "px-8 py-4 text-lg",
};

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className,
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center font-semibold rounded-xl",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
      ) : leftIcon ? (
        <span className="mr-2">{leftIcon}</span>
      ) : null}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};
