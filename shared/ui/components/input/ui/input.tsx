import { useState, useRef } from "react";
import { XIcon } from "lucide-react";
import { PersonIcon } from "shared/ui/icons/person-icon";

export const Input = (props: React.ComponentProps<"input">) => {
  const isControlled = props.value !== undefined;
  const [internalValue, setInternalValue] = useState(props.defaultValue || "");
  const inputRef = useRef<HTMLInputElement>(null);

  const currentValue = isControlled
    ? String(props.value || "")
    : String(internalValue || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    props.onChange?.(e);
  };

  const handleClear = () => {
    if (isControlled) {
      const syntheticEvent = {
        target: { value: "" },
        currentTarget: inputRef.current || { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;
      props.onChange?.(syntheticEvent);
    } else {
      setInternalValue("");
      if (inputRef.current) {
        inputRef.current.value = "";
        const syntheticEvent = {
          target: { value: "" },
          currentTarget: inputRef.current,
        } as React.ChangeEvent<HTMLInputElement>;
        props.onChange?.(syntheticEvent);
      }
    }
  };

  return (
    <label className="flex rounded-3 border-2 w-full border-gray-1 px-4 py-3.5 justify-between gap-[3.5px]">
      <PersonIcon />
      <input
        ref={inputRef}
        type="text"
        className="w-full border-none outline-none text-body-1 font-medium  active:border-none focus:border-none focus:outline-none active:outline-none"
        {...props}
        value={isControlled ? currentValue : undefined}
        defaultValue={isControlled ? undefined : currentValue}
        onChange={handleChange}
      />
      {currentValue && (
        <button
          type="button"
          className="size-fit cursor-pointer"
          title="Очистить"
          onClick={handleClear}
        >
          <XIcon />
        </button>
      )}
    </label>
  );
};
