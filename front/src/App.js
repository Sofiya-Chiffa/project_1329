import { Routes, Route } from "react-router-dom";
import { MenuPage } from "./pages/menu";
import { TablePage } from "./pages/table";
import { TestPage } from "./pages/test";
import { LoginPage } from "./pages/login";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/table" element={<TablePage />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
}
