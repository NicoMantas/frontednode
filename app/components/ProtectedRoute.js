'use client'
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
    const { user } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/signin");
        }
    }, [user]);

    if (!user) {
        return null;
    }

    return children;
}