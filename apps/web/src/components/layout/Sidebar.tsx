import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-6">

      <h1 className="text-xl font-bold mb-8">
        OmniCortex
      </h1>

      <nav className="flex flex-col gap-4">

        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/transactions">Transactions</NavLink>
        <NavLink to="/ai">AI Console</NavLink>
        <NavLink to="/legal">Legal</NavLink>

      </nav>

    </aside>
  );
}