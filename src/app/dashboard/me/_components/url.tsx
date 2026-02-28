'use client';
import { Button } from "@/components/ui/button";
import { createUsername } from "../_actions/create-username";
import { useState } from "react";
import Link from "next/link";
import { Link2 } from "lucide-react";

export function UrlPreview({ username: slug }: { username: string | null }) {

    const [error, setError] = useState<null | string>(null);
    const [username, setUsername] = useState(slug);

    async function submitAction(formData: FormData) {

        const username = formData.get("username") as string;

        if (username === "") {
            return
        }

        const response = await createUsername({ username })

        if (response.error) {
            setError(response.error)
            return
        }

        if (response.data) {
            setUsername(response.data);
        }
    }

    if (!!username) {
        return (
            <div className="flex items-center flex-1 p-2 justify-between text-gray-100">
                <div className="flex flex-col items-start md:flex-row md:items-center justify-center gap-2">
                    <h3 className="font-bold text-lgjj">Sua URL:</h3>
                    <Link target="_blank" href={`${process.env.NEXT_PUBLIC_HOST_URL}/creator/${username}`}>
                        {process.env.NEXT_PUBLIC_HOST_URL}/creator/{username}
                    </Link>
                </div>

                <Link
                    className="bg-blue-500 px-4 py-1 rounded-md"
                    href={`${process.env.NEXT_PUBLIC_HOST_URL}/creator/${username}`}
                    target="_blank">
                    <Link2 className="w-5 h-5 text-white cursor-pointer" />
                </Link>
            </div>
        )
    }

    return (
        <div className="w-full">
            <div className="flex items-center flex-1 p-2 text-gray-100">
                <form className="flex flex-1 flex-col gap-4 items-start md:items-center md:flex-row"
                    action={submitAction}>
                    <div className="flex items-center justify-center w-full">
                        <p>
                            {process.env.NEXT_PUBLIC_HOST_URL}/creator/
                        </p>

                        <input type="text"
                            placeholder="Digite o seu username"
                            name="username"
                            className="flex-1 outline-none border h-9 border-gray-300 text-white p-2 rounded-md" />
                    </div>

                    <Button type="submit"
                        className="bg-blue-500 h-9 w-full md:w-fit text-white px-4  rounded-md hover:bg-blue-600 cursor-pointer">
                        Salvar
                    </Button>
                </form>
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}