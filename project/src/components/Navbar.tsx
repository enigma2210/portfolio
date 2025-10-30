import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { id: 'arrival', label: 'Arrival', href: '#arrival' },
  { id: 'hall', label: 'Hall of Origins', href: '#hall' },
  { id: 'artifacts', label: 'Artifacts', href: '#artifacts' },
  { id: 'runes', label: 'Runes of Power', href: '#runes' },
  { id: 'pillars', label: 'Pillars', href: '#pillars' },
  { id: 'raven', label: "Raven's Flight", href: '#raven' },
];

interface NavbarProps {
  theme: 'aurora' | 'ember';
}

export default function Navbar({ theme }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('arrival');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  const glowColor = theme === 'aurora' ? 'gow-aurora' : 'gow-ember';
  const bgGradient = theme === 'aurora' ? 'from-gow-aurora/20' : 'from-gow-ember/20';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? `bg-gow-near-black/80 backdrop-blur-md border-b border-${glowColor}/20 shadow-lg`
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a
              href="#arrival"
              onClick={(e) => handleNavClick(e, '#arrival')}
              className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-gow-gold rounded-sm"
              aria-label="Return to top"
            >
              <div className={`relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${bgGradient} to-transparent border-2 border-${glowColor}/50 group-hover:border-${glowColor} transition-all duration-300 flex items-center justify-center overflow-hidden`}>
                <img 
                  src="/assets/logo.png" 
                  alt="Rishabh Singh Logo" 
                  className="w-full h-full object-contain p-1"
                />
                <div className="absolute inset-0 border-2 border-gow-gold/30 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
              </div>
            </a>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gow-gold rounded-sm ${
                    activeSection === link.id
                      ? `text-${glowColor} shadow-[0_0_15px_rgba(218,181,106,0.4)]`
                      : 'text-gow-silver hover:text-gow-gold'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-${glowColor} to-transparent`}
                    />
                  )}
                </a>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 text-gow-silver hover:text-${glowColor} transition-colors focus:outline-none focus:ring-2 focus:ring-gow-gold rounded-sm`}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" strokeWidth={2.5} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-gow-black/90 backdrop-blur-md lg:hidden animate-fadeIn"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute top-20 left-0 right-0 bg-gow-near-black border-t border-b border-gow-gold/20 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-7xl mx-auto px-4 py-8 space-y-2">
              {navLinks.map((link, index) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`block px-6 py-4 text-lg font-medium tracking-wide transition-all duration-300 border-l-4 focus:outline-none focus:ring-2 focus:ring-gow-gold ${
                    activeSection === link.id
                      ? `text-${glowColor} border-${glowColor} bg-${glowColor}/10`
                      : `text-gow-silver border-transparent hover:border-gow-gold hover:text-gow-gold hover:bg-gow-gold/5`
                  }`}
                  style={{
                    animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both`,
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
