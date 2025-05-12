"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import signOutUser from "../../firebase/auth/signout";
import { useAuthContext } from "../context/AuthContext";

export default function Cartas() {
    const { user, loading: authLoading } = useAuthContext();
    const [cartas, setCartas] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/signin");
        }
    }, [user, authLoading, router]);

    const handleSignOut = async () => {
        setPageLoading(true);
        const { error } = await signOutUser();
        if (!error) {
            router.push("/");
        } else {
            setPageLoading(false);
            console.error("Error signing out:", error);
            alert("Error al cerrar sesión");
        }
    };

    useEffect(() => {
        if (user) {
            fetch("/api/firestore")
                .then(res => res.json())
                .then(data => {
                    setCartas(data);
                    setPageLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching cartas:", err);
                    setPageLoading(false);
                });
        } else if (!authLoading && !user) {
            setPageLoading(false);
        }
    }, [user, authLoading]);

    if (authLoading || !user) {
        return <div className="text-center py-10">Cargando...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#8B2C3B]">Cartas disponibles</h1>
                <div className="flex gap-2">
                    <Link href="/nueva-carta">
                        <button className="px-4 py-1 rounded-full bg-[#ffe6a0] text-[#8B2C3B] text-sm font-bold shadow-sm hover:bg-[#ffda6a] transition" disabled={pageLoading}>
                            Enviar nueva carta
                        </button>
                    </Link>
                    <button 
                        onClick={handleSignOut}
                        disabled={pageLoading}
                        className="px-4 py-1 rounded-full bg-gray-300 text-gray-700 text-sm font-bold shadow hover:bg-gray-400 transition disabled:opacity-50"
                     >
                        Cerrar sesión
                     </button>
                </div>
            </div>
            {pageLoading ? (
                <p className="text-[#8B2C3B]">Cargando cartas...</p>
            ) : (
                <ul className="space-y-4">
                    {cartas.map((carta) => (
                        <li key={carta.id} className="bg-[#fff8e1] rounded-xl p-4 shadow flex flex-col gap-2">
                            <span className="font-semibold text-[#8B2C3B]">{carta.nombre}</span>
                            <span className="text-[#222]">{carta.mensaje}</span>
                            <span className="text-xs text-[#bfa77a]">ID: {carta.id}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}