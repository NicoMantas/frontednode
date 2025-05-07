"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevaCarta() {
    const [nombre, setNombre] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

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

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <input className="w-full border border-[#ffe6a0] rounded px-3 py-2" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" required />
            <textarea className="w-full border border-[#ffe6a0] rounded px-3 py-2" value={mensaje} onChange={e => setMensaje(e.target.value)} placeholder="Mensaje" required />
            <button type="submit" className="w-full py-2 rounded-full bg-[#ffe6a0] text-[#8B2C3B] font-bold shadow-sm transition hover:bg-[#ffda6a]" disabled={loading}>
                {loading ? "Enviando..." : "Enviar carta"}
            </button>
        </form>
    );
}