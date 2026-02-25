"use server"
import { z } from "zod"

const usernameSchema = z.object({
    username: z.string().min(4, "Username deve ter pelo menos 4 caracteres").max(20, "Username deve ter no máximo 20 caracteres"),
})

type CreateUsernameFormData = z.infer<typeof usernameSchema>

export async function createUsername(data: CreateUsernameFormData) {

    const schema = usernameSchema.safeParse(data)

    if (!schema.success) {
        return {
            data: null,
            error: schema.error.issues[0].message
        }
    }

    return {
        data: "Username criado",
        error: null
    }

}