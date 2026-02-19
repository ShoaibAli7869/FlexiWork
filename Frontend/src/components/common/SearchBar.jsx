import { useState } from "react";
import { Search, X } from "lucide-react";
import { clsx } from "clsx";

export const SearchBar = ({
  placeholder = "Search...",
  onSearch,
  className,
  size = "md",
}) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(value);
  };

  const handleClear = () => {
    setValue("");
    onSearch?.("");
  };

  const sizes = {
    sm: "py-2 pl-10 pr-4 text-sm",
    md: "py-3 pl-12 pr-4",
    lg: "py-4 pl-14 pr-6 text-lg",
  };

  const iconSizes = {
    sm: "left-3 w-4 h-4",
    md: "left-4 w-5 h-5",
    lg: "left-5 w-6 h-6",
  };

  return (
    <form onSubmit={handleSubmit} className={clsx("relative", className)}>
      <Search
        className={clsx(
          "absolute top-1/2 -translate-y-1/2 text-gray-400",
          iconSizes[size],
        )}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={clsx(
          "w-full bg-white border border-gray-300 rounded-xl",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
          "transition-all duration-200 placeholder:text-gray-400",
          sizes[size],
        )}
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </form>
  );
};
