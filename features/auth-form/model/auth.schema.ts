import z from "zod"

const authSchema = z.object({
    username: z.string().min(1, { message: "Введите имя" }),
    password: z.string().min(1, { message: "Введите пароль" }),
    rememberMe: z.boolean(),
})

export type AuthFormData = z.infer<typeof authSchema>

export {authSchema}
