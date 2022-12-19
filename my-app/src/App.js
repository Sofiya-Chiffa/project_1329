import { Routes, Route } from "react-router-dom";
import { MenuPage } from "./pages/menu";
import { TablePage } from "./pages/table";
import { TestPage } from "./pages/test";

export default function App() {
  return (
    <Routes>
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/table" element={<TablePage />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
}
