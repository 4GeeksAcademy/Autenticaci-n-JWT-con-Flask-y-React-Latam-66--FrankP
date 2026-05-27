import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-light bg-light mb-3">
            <Link to="/">
                <span className="navbar-brand mb-0 h1">Instagram Clone</span>
            </Link>
            <div className="ml-auto">
                {!sessionStorage.getItem("token") ? (
                    <>
                        <Link to="/login" className="btn btn-primary mx-2">Login</Link>
                        <Link to="/signup" className="btn btn-secondary">Signup</Link>
                    </>
                ) : (
                    <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                )}
            </div>
        </nav>
    );
};