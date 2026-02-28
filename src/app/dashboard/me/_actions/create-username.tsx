"use server"
import { z } from "zod"
import { auth } from '@/lib/auth'
import { prisma } from "@/lib/prisma"
import { createSlug } from "@/utils/create-slug"

const usernameSchema = z.object({
    username: z.string().min(4, "Username deve ter pelo menos 4 caracteres").max(20, "Username deve ter no máximo 20 caracteres"),
})

type CreateUsernameFormData = z.infer<typeof usernameSchema>

export async function createUsername(data: CreateUsernameFormData) {

    const session = await auth()

    if (!session?.user) {
        return {
            data: null,
            error: "Usuário não autenticado"
        }
    }

    const schema = usernameSchema.safeParse(data)

    if (!schema.success) {
        return {
            data: null,
            error: schema.error.issues[0].message
        }
    }

    try {
        const userId = session.user.id;

        const slug = createSlug(data.username);

        const existSlug = await prisma.user.findFirst({
            where: {
                username: slug
            }
        })

        if (existSlug) {
            return {
                data: null,
                error: "Username já existe"
            }
        }

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                username: slug
            }
        })

        return {
            data: slug,
            error: null
        }

    } catch (error) {
        return {
            data: null,
            error: "Erro ao criar username"
        }
    }
}