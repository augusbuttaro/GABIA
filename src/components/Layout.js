import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DiagonalBackground from "../components/DiagonalBackground";

const Layout = () => {
  return (
    <div className="relative min-h-screen bg-[#e6f1f0] dark:bg-blue-100 text-gray-900 dark:text-gray-100 transition-colors font-[Raleway,sans-serif]">
      
      {/* Fondo diagonal 
      <DiagonalBackground />
        */}

      {/* Contenido */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Outlet />
        </main>

        <Footer />
      </div>

    </div>
  );
};

export default Layout;
