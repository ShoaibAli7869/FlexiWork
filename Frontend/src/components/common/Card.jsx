import { clsx } from "clsx";

export const Card = ({
  children,
  className,
  hover = false,
  padding = "md",
  ...props
}) => {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={clsx(
        "bg-white rounded-2xl border border-gray-200",
        hover
          ? "shadow-soft hover:shadow-card hover:border-gray-300 transition-all duration-300"
          : "shadow-soft",
        paddings[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
