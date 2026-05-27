import React from "react";
import { Outlet } from "react-router-dom"; // Asegúrate de importar desde 'react-router-dom'
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

// El Layout envuelve a los componentes y utiliza <Outlet /> para renderizar las rutas hijas
export const Layout = () => {
    return (
        <ScrollToTop>
            <Navbar />
            <div className="main-content">
                <Outlet />
            </div>
            <Footer />
        </ScrollToTop>
    );
};

export default Layout;