import React, { useState } from 'react';
import logo from '../../assets/logo.svg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Productos', href: '#productos' },
    { name: 'Convertir', href: '#convertir' },
    { name: 'Demo', href: '#demo' },
    { name: 'Contactanos', href: '#contacto' },
  ];

  const logoSrc = typeof logo === 'string' ? logo : (logo as any).src;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Space */}
          <div className="flex-shrink-0 flex items-center h-full">
            <a href="/" className="flex items-center h-full py-1">
              <img src={logoSrc} alt="JookERP" className="h-[100px] w-auto object-contain" />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-jook-dark font-medium hover:opacity-70 px-2 py-1 text-sm transition-all"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#login"
                className="bg-jook-deep-purple hover:bg-opacity-90 text-white px-10 py-2.5 rounded-[8px] text-sm font-bold transition-all shadow-md active:scale-95"
              >
                Login
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-jook-dark hover:bg-gray-50 focus:outline-none"
            >
              <span className="sr-only">Abrir menú</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'translate-x-0' : 'translate-x-full'} fixed inset-0 z-40 bg-white md:hidden transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between h-20 px-4 border-b border-gray-100">
            <a href="/" onClick={() => setIsOpen(false)} className="flex items-center h-full py-1">
              <img src={logoSrc} alt="JookERP" className="h-[60px] w-auto object-contain" />
            </a>
            <button
              onClick={() => setIsOpen(false)}
              className="text-jook-dark p-2"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-center space-y-6 pt-16 px-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-jook-dark text-2xl font-bold hover:opacity-70 transition-all font-sans"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#login"
              onClick={() => setIsOpen(false)}
              className="w-full max-w-[240px] bg-jook-deep-purple text-white text-center py-5 rounded-[8px] text-2xl font-bold mt-10 shadow-lg font-sans"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
