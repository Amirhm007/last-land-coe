import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Artifacts from "./pages/Artifacts";
import CombinationOfHeroes from "./pages/CombinationOfHeroes";
import NotFound from "./pages/NotFound";
import Allhero from "./pages/Allhero";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[oklch(13%_0.015_25)]">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/artifacts" element={<Artifacts />} />
            <Route path="/Allhero" element={<Allhero />} />

            <Route
              path="/combination-of-heroes"
              element={<CombinationOfHeroes />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
