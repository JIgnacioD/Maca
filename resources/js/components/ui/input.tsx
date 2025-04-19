import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string; // Propiedad opcional para el label
}

function Input({ className, type, label, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label
          htmlFor={id} // Asociar el label al input mediante el id
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={id} // Asegurarse de que el input tiene un id para asociarlo al label
        type={type}
        data-slot="input"
        className={cn(
          "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
