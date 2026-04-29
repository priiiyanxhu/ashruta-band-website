import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const LOGO_URL = "/manus-storage/WhatsAppImage2026-04-29at01.56.32_3039dc2e.jpeg";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#members", label: "Members" },
  { href: "#music", label: "Music" },
  { href: "#tour", label: "Tour" },
  { href: "#blog", label: "Blog" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#about");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect active section on scroll
  useEffect(() => {
    const handleSectionDetection = () => {
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleSectionDetection);
    return () => window.removeEventListener("scroll", handleSectionDetection);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(href);
      setIsMobileOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-md border-b border-red-600/30 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, "#hero")} 
          className="flex items-center gap-3 group cursor-pointer"
        >
          <img
            src={LOGO_URL}
            alt="Ashruta Logo"
            className="w-10 h-10 object-contain rounded-sm group-hover:shadow-lg group-hover:shadow-red-600/30 transition-shadow"
          />
          <span
            className="text-2xl font-bold text-red-600 tracking-widest"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            ASHRUTA
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-200 relative group cursor-pointer ${
                activeSection === link.href
                  ? "text-red-500"
                  : "text-gray-300 hover:text-red-500"
              }`}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {link.label}
              <span 
                className={`absolute -bottom-1 left-0 h-[2px] bg-red-600 transition-all duration-300 ${
                  activeSection === link.href ? "w-full" : "w-0 group-hover:w-full"
                }`} 
              />
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden text-white hover:text-red-500 transition"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-black/98 border-t border-red-600/20 mt-2">
          <div className="container py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-lg font-bold uppercase tracking-wider transition-colors py-2 border-b cursor-pointer ${
                  activeSection === link.href
                    ? "text-red-500 border-red-600/50"
                    : "text-gray-300 hover:text-red-500 border-gray-800"
                }`}
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
