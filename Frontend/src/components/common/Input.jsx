import { clsx } from "clsx";
import { forwardRef } from "react";

export const Input = forwardRef(
  (
    { label, error, helperText, leftIcon, rightIcon, className, ...props },
    ref,
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={clsx(
              "w-full px-4 py-3 bg-white border rounded-xl",
              "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
              "transition-all duration-200 placeholder:text-gray-400",
              error ? "border-danger-500" : "border-gray-300",
              leftIcon && "pl-12",
              rightIcon && "pr-12",
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p
            className={clsx(
              "mt-2 text-sm",
              error ? "text-danger-500" : "text-gray-500",
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
