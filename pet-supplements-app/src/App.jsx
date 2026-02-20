import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/ListingPage";
import ProductPage from "./pages/ProductPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <div className="app-mobile">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/listing" element={<ListingPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
