import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "") || "";
            const url = backendUrl ? `${backendUrl}/api/signup` : "/api/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                setSuccess("Usuario registrado correctamente. Redirigiendo al login...");
                setTimeout(() => navigate("/login"), 1200);
                return;
            }

            const data = await response.json();
            setError(data.msg || "Error al registrar usuario");
        } catch (error) {
            setError("No se pudo conectar al backend. Revisa la URL y el servidor.");
            console.error("Signup error:", error);
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: 420 }}>
            <h2>Registro</h2>
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Registrarse</button>
            </form>
        </div>
    );
};