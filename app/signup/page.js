'use client'
import React from "react";
import signUp from "../../firebase/auth/signup";
import { useRouter } from 'next/navigation'

export default function SignUp() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()
        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error)
        }

        // Registro exitoso
        console.log(result)
        return router.push("/cartas")
    }

    return (
        <div className="max-w-md mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6 text-[#8B2C3B]">Registro</h1>
            <form onSubmit={handleForm} className="space-y-4">
                <div>
                    <label className="block mb-1 font-semibold">Email</label>
                    <input
                        type="email"
                        className="w-full border border-[#ffe6a0] rounded px-3 py-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Contraseña</label>
                    <input
                        type="password"
                        className="w-full border border-[#ffe6a0] rounded px-3 py-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 rounded-full bg-[#ffe6a0] text-[#8B2C3B] font-bold shadow-sm hover:bg-[#ffda6a] transition"
                >
                    Registrarse
                </button>
            </form>
        </div>
    );
}