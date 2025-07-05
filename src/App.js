import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./pages/About";
import Services from "./pages/Services";
import Clients from "./pages/Clients";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Nested routes go here */}
          <Route index element={<div>Home Page</div>} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="clients" element={<Clients />} />
          <Route path="contact" element={<Contact />} />
          {/* Add more pages here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
