import React from "react";

const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "border-b-accent-dark bg-juvu-white flex h-10 w-full border-2 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      className={`peer size-4 shrink-0 cursor-pointer border border-gray-900 accent-gray-900 ring-offset-gray-800 focus-visible:ring-2 focus-visible:ring-gray-600 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-gray-900 data-[state=checked]:text-gray-100 ${className}}`}
      {...props}
    />
  ),
);
Checkbox.displayName = "Checkbox";

type RadioProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="radio"
      className={cn(
        "peer size-4 shrink-0 cursor-pointer rounded border border-gray-900 accent-gray-900 ring-offset-gray-800 focus-visible:ring-2 focus-visible:ring-gray-600 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-gray-900 data-[state=checked]:text-gray-100",
        className,
      )}
      {...props}
    />
  ),
);
Radio.displayName = "Radio";
