import { useAuthForm } from "../lib/use-auth-form";
import { Input } from "shared/ui/components/input";
import { InputPassword } from "shared/ui/components/input-password";
import { Checkbox } from "shared/ui/components/checkbox";
import { Button } from "shared/ui/components/button";
import { FieldError, FieldLabel } from "shared/ui/components/field";
import { Controller } from "react-hook-form";
import { Separator } from "shared/ui/components/separator";
import { Link } from "react-router";

export const AuthForm = () => {
  const { form, onSubmit, apiError, isLoading } = useAuthForm();

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <FieldLabel>Логин</FieldLabel>
          <Controller
            name="username"
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Имя пользователя"
                aria-invalid={!!form.formState.errors.username}
              />
            )}
          />
          {form.formState.errors.username && (
            <FieldError>{form.formState.errors.username.message}</FieldError>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <FieldLabel>Пароль</FieldLabel>
          <Controller
            name="password"
            control={form.control}
            render={({ field }) => (
              <InputPassword
                {...field}
                placeholder="Пароль"
                aria-invalid={!!form.formState.errors.password}
              />
            )}
          />
          {form.formState.errors.password && (
            <FieldError>{form.formState.errors.password.message}</FieldError>
          )}
        </div>

        {apiError && <FieldError>{apiError}</FieldError>}
      </div>

      <div className="flex gap-2 items-center">
        <Controller
          name="rememberMe"
          control={form.control}
          render={({ field }) => (
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
        <span className="text-body-2 font-medium text-gray-light">
          Запомнить меня
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Вход..." : "Войти"}
        </Button>
        <div className="flex items-center justify-center overflow-hidden gap-2.5">
          <Separator className="w-full bg-gray-light" />
          <span className="text-body-2 font-medium text-gray-light">или</span>
          <Separator className="w-full bg-gray-light" />
        </div>
      </div>

      <span className="text-center text-body-1 font-medium text-gray-dark">
        Нет аккаунта?{" "}
        <Link
          to="/register"
          className="text-accent hover:text-accent-light transition-colors cursor-pointer underline underline-offset-2 font-semibold"
        >
          Создать
        </Link>
      </span>
    </form>
  );
};
