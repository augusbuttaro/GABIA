import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./pages/About";
import Services from "./pages/Services";
import Clients from "./pages/Clients";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Nested routes go here */}
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="clients" element={<Clients />} />
            <Route path="contact" element={<Contact />} />
            {/* Add more pages here */}
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
