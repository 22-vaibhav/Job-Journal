import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-8 sm:py-10">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;