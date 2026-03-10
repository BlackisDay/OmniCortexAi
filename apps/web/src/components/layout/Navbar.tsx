import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function Navbar() {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <header className="flex justify-between items-center bg-white p-4 border-b">

      <input
        className="border rounded px-3 py-2"
        placeholder="Search..."
      />

      <button
        onClick={toggleTheme}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Toggle Theme
      </button>

    </header>
  );
}