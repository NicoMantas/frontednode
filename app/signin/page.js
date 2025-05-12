'use client'
import React from "react";
import signIn from "../../firebase/auth/signin";
import { useRouter } from 'next/navigation'
import Link from 'next/link';

export default function SignIn() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState('');
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()
        setErrorMessage('');

        const { result, error } = await signIn(email, password);

        if (error) {
            console.log("Sign-in error:", error);
            if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
                setErrorMessage(
                    <span>
                        Usuario no encontrado o credenciales inválidas.{' '}
                        <Link href="/signup" className="text-blue-600 hover:underline">
                            ¿Deseas registrarte?
                        </Link>
                    </span>
                );
            } else {
                setErrorMessage('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
            }
            return;
        }

        // Inicio de sesión exitoso
        console.log(result)
        return router.push("/cartas")
    }

    return (
        <div className="max-w-md mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6 text-[#8B2C3B]">Iniciar Sesión</h1>
            <form onSubmit={handleForm} className="space-y-4">
                <div>
                    <label className="block mb-1 font-semibold">Email</label>
                    <input
                        type="email"
                        className={`w-full border rounded px-3 py-2 ${errorMessage ? 'border-red-500' : 'border-[#ffe6a0]'}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Contraseña</label>
                    <input
                        type="password"
                        className={`w-full border rounded px-3 py-2 ${errorMessage ? 'border-red-500' : 'border-[#ffe6a0]'}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && (
                    <div className="text-red-600 text-sm">
                        {errorMessage}
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full py-2 rounded-full bg-[#ffe6a0] text-[#8B2C3B] font-bold shadow-sm hover:bg-[#ffda6a] transition"
                >
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
}