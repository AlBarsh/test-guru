import { useState, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { LockIcon } from "shared/ui/icons/lock-icon";

export const InputPassword = (props: React.ComponentProps<"input">) => {
  const isControlled = props.value !== undefined;
  const [internalValue, setInternalValue] = useState(props.defaultValue || "");
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentValue = isControlled ? String(props.value || "") : String(internalValue || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    props.onChange?.(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <label className="flex rounded-3 border-2 w-full border-gray-1 px-4 py-3.5 justify-between gap-[3.5px]">
      <LockIcon />
      <input
        ref={inputRef}
        type={showPassword ? "text" : "password"}
        className="w-full border-none outline-none active:border-none focus:border-none focus:outline-none active:outline-none"
        {...props}
        value={isControlled ? currentValue : undefined}
        defaultValue={isControlled ? undefined : currentValue}
        onChange={handleChange}
      />
      <button
        type="button"
        className="size-fit cursor-pointer"
        title={showPassword ? "Скрыть пароль" : "Показать пароль"}
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <Eye /> : <EyeOff />}
      </button>
    </label>
  );
};
