import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#e6f1f0] dark:bg-blue-100 text-gray-900 dark:text-gray-100 transition-colors font-[Raleway,sans-serif]" style={{ fontFamily: 'Raleway, sans-serif' }}>
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
