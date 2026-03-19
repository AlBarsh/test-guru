import { AuthForm } from "features/auth-form/ui/auth-form";
import { LoginIcon } from "shared/ui/icons/login-icon";

export const AuthPage = () => {
  return (
    <main className="flex items-center justify-center flex-1 pt-16 pb-4 container">
      <div className="bg-bg-white rounded-10 p-1.5">
        <div className="p-12 rounded-10 flex flex-col items-center gap-8 bg-linear-to-b from-gray-1/20 to-gray-1/0">
          <LoginIcon />
          <div className="flex flex-col items-center gap-3 px-[17px] w-[419px]">
            <h1 className="text-h1 font-semibold text-dark">
              Добро пожаловать!
            </h1>
            <p className="text-body-1 font-medium text-gray-light">
              Пожалуйста, авторизируйтесь
            </p>
          </div>
          <AuthForm />
        </div>
      </div>
    </main>
  );
};
