"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageCircle, Menu, X } from 'lucide-react';

const HomePage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header with Logo and Hamburger Menu */}
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center">
          <MessageCircle className="mr-2 text-blue-600" size={32} />
          <h1 className="text-2xl font-bold text-blue-800">AI Companion</h1>
        </div>
        
        <button 
          onClick={toggleMenu} 
          className="z-50 relative p-2 hover:bg-blue-100 rounded-md"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Hamburger Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center">
          <nav className="space-y-6 text-center">
            <Link 
              href="/chatbot" 
              className="block text-2xl text-blue-600 hover:text-blue-800 transition-colors"
              onClick={toggleMenu}
            >
              Chatbot
            </Link>
            <Link 
              href="#" 
              className="block text-2xl text-blue-600 hover:text-blue-800 transition-colors"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link 
              href="#" 
              className="block text-2xl text-blue-600 hover:text-blue-800 transition-colors"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-900 mb-6">
            Welcome to Your AI Companion
          </h2>
          <p className="text-xl text-blue-700 mb-8">
            An intelligent chatbot ready to assist you with any questions or conversations.
          </p>
          
          <Link 
            href="/chatbot" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Chatting
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;