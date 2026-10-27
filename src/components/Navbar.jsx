import { NavLink } from "react-router-dom";
import logo from "../assets/321.webp";

const links = [
  { to: "/", label: "HOME" },
  { to: "/resources", label: "RESOURCES" },
  { to: "/artifacts", label: "ARTIFACTS" },
  { to: "/combination-of-heroes", label: "COMBINATION OF HEROES" },
  { to: "/Allhero", label: "INTRODUCING THE HEROES" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[oklch(13%_0.015_25)] border-b border-[oklch(30%_0.04_35)]">
      <div className="max-w-10xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Links */}
        <ul className="flex items-center gap-1">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  [
                    "relative px-4 py-2 text-xs font-semibold tracking-widest transition-colors duration-150 rounded",
                    "hover:text-[oklch(68%_0.19_38)] hover:bg-[oklch(19%_0.02_25)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(68%_0.19_38)]",
                    isActive
                      ? "text-[oklch(68%_0.19_38)] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:rounded-full after:bg-[oklch(68%_0.19_38)]"
                      : "text-[oklch(62%_0.02_25)]",
                  ].join(" ")
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Logo */}
        <div className="flex items-center gap-2 ml-12">
          <img
            src={logo}
            alt="LAST-LAND:COE"
            className="h-10 w-10 rounded-full object-cover border border-[oklch(30%_0.04_35)]"
          />
          <span className="text-[14px] font-bold tracking-widest text-[oklch(62%_0.02_25)]">
            LAST-LAND:COE
          </span>
        </div>
      </div>
    </nav>
  );
}
