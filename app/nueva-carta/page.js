"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import signOutUser from "../../firebase/auth/signout";
import { useAuthContext } from "../context/AuthContext";

export default function NuevaCarta() {
    const { user, loading: authLoading } = useAuthContext();
    const [nombre, setNombre] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/signin");
        }
    }, [user, authLoading, router]);

    const handleSignOut = async () => {
        setLoading(true);
        const { error } = await signOutUser();
        setLoading(false);
        if (!error) {
            router.push("/");
        } else {
            console.error("Error signing out:", error);
            alert("Error al cerrar sesión");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch("/api/firestore", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: { nombre, mensaje } }),
        });
        setLoading(false);
        if (res.ok) {
            router.push("/cartas");
        } else {
            alert("Error al enviar la carta");
        }
    };

    if (authLoading || !user) {
        return <div className="text-center py-10">Cargando...</div>;
    }

    return (
        <div className="max-w-md mx-auto py-10 px-4">
            <div className="flex justify-end mb-4">
                <button
                    onClick={handleSignOut}
                    disabled={loading}
                    className="px-4 py-1 rounded-full bg-gray-300 text-gray-700 text-sm font-bold shadow hover:bg-gray-400 transition disabled:opacity-50"
                >
                    Cerrar sesión
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input className="w-full border border-[#ffe6a0] rounded px-3 py-2" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" required />
                <textarea className="w-full border border-[#ffe6a0] rounded px-3 py-2" value={mensaje} onChange={e => setMensaje(e.target.value)} placeholder="Mensaje" required />
                <button type="submit" className="w-full py-2 rounded-full bg-[#ffe6a0] text-[#8B2C3B] font-bold shadow-sm transition hover:bg-[#ffda6a]" disabled={loading}>
                    {loading ? "Enviando..." : "Enviar carta"}
                </button>
            </form>
        </div>
    );
}