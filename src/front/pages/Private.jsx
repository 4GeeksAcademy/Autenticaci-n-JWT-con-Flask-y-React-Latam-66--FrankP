import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "") || "";
        const url = backendUrl ? `${backendUrl}/api/profile` : "/api/profile";

        fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async (response) => {
                if (!response.ok) {
                    sessionStorage.removeItem("token");
                    navigate("/login");
                    return;
                }
                const data = await response.json();
                setEmail(data.email);
            })
            .catch(() => {
                sessionStorage.removeItem("token");
                navigate("/login");
            })
            .finally(() => setLoading(false));
    }, [navigate]);

    if (loading) {
        return <div className="text-center mt-5">Cargando información de usuario...</div>;
    }

    return (
        <div className="text-center mt-5">
            <h1>Bienvenido a tu área privada</h1>
            {email && <p className="lead">Has iniciado sesión como <strong>{email}</strong>.</p>}
        </div>
    );
};