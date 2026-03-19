import {useForm} from "react-hook-form"
import { authSchema, type AuthFormData } from "../model/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { toast } from "sonner"
import { useNavigate } from "react-router"

const AUTH_API_URL = "https://dummyjson.com/auth/login"
const ACCESS_TOKEN_KEY = "accessToken"
const REFRESH_TOKEN_KEY = "refreshToken"

export const useAuthForm = () => {
    const navigate = useNavigate()
    const [apiError, setApiError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    
    const form = useForm<AuthFormData>({
        resolver: zodResolver(authSchema),
        defaultValues: { username: "", password: "", rememberMe: false },
        mode: "onSubmit"
    })

    const onSubmit = async (data: AuthFormData) => {
        setApiError(null)
        setIsLoading(true)

        try {
            const response = await fetch(AUTH_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password,
                    expiresInMins: 30,
                }),
            })

            const result = await response.json()

            if (!response.ok) {
                let errorMessage = result.message || "Ошибка авторизации"
                
                if (result.message === "Invalid credentials" || errorMessage.toLowerCase().includes("invalid credentials")) {
                    errorMessage = "Неверное имя пользователя или пароль"
                }
                
                setApiError(errorMessage)
                toast.error(errorMessage)
                return
            }

            // Сохранение токенов в зависимости от rememberMe
            const storage = data.rememberMe ? localStorage : sessionStorage
            
            if (result.accessToken) {
                storage.setItem(ACCESS_TOKEN_KEY, result.accessToken)
            }
            if (result.refreshToken) {
                storage.setItem(REFRESH_TOKEN_KEY, result.refreshToken)
            }

            toast.success("Успешная авторизация!")
            
            navigate("/")
            
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Произошла ошибка при авторизации"
            setApiError(errorMessage)
            toast.error(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        form,
        onSubmit: form.handleSubmit(onSubmit),
        apiError,
        isLoading,
    }
}
