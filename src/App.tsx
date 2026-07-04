import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Compass, BookOpen, Terminal, Code2, Shield, Languages, 
  ChevronRight, Info, Award, Users, CloudRain, Star, Sparkles
} from 'lucide-react';
import ArchitectureGraph from './components/ArchitectureGraph';
import LayerDetail from './components/LayerDetail';
import EcosystemReport from './components/EcosystemReport';
import LizzyChatbot from './components/LizzyChatbot';

export default function App() {
  const [currentView, setCurrentView] = useState<'brain' | 'zero_mode' | 'kodemaster' | 'safety_pulse' | 'about'>('brain');
  const [selectedLayerId, setSelectedLayerId] = useState<number>(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Synchronize internal chatbot view changes
  const handleChatViewChange = (view: 'brain' | 'kodemaster' | 'safety_pulse' | 'ispani' | 'zero_mode') => {
    if (view === 'ispani') {
      // Treat Ispani carrier dispatch as part of home/brain module or map to home
      setCurrentView('brain');
    } else {
      setCurrentView(view as any);
    }
  };

  const navItems = [
    { label: 'Home', id: 'brain' as const },
    { label: 'ZeroMode', id: 'zero_mode' as const },
    { label: 'Kode.Kasi', id: 'kodemaster' as const },
    { label: 'Safety Pulse', id: 'safety_pulse' as const },
    { label: 'About', id: 'about' as const }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans antialiased selection:bg-[#00AEBB]/30 selection:text-white overflow-x-hidden relative">
      
      {/* BACKGROUND BEADWORK ACCENT (Header Border) */}
      <div className="h-1.5 w-full beadwork-border opacity-30 fixed top-0 left-0 right-0 z-50" />

      {/* FIXED TRANSLUCENT TOP NAVIGATION BAR */}
      <header className="fixed top-1.5 left-0 right-0 h-16 bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/10 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Container (Left-aligned, max 180px) */}
          <div className="w-[180px] flex items-center">
            <a href="#" onClick={() => setCurrentView('brain')} className="flex flex-col items-start select-none group">
              <div className="flex items-baseline font-sans text-xl font-bold tracking-tight text-white">
                <span>K'lev</span>
                <span className="text-white font-semibold">.</span>
                <span className="text-[#F5A623] transition-colors duration-300 group-hover:text-[#F5A623]/80">a</span>
                <span className="text-[#00AEBB] transition-shadow duration-300 group-hover:drop-shadow-[0_0_4px_#00AEBB]">i</span>
              </div>
              <span className="text-[7px] text-[#A0A0A0] font-sans tracking-[0.1em] uppercase opacity-80 leading-none mt-0.5">
                powered by TM Media Solutions ®
              </span>
            </a>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`relative py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'text-[#00AEBB] [text-shadow:0_0_8px_rgba(0,174,187,0.4)]' 
                      : 'text-[#A0A0A0] hover:text-white'
                  }`}
                >
                  {item.label}
                  {/* Underline Hover Animation */}
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#00AEBB] transition-transform duration-300 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
                  }`} />
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-[#1C1C1C] border border-white/10 hover:border-[#00AEBB]/50 transition text-white"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE DRAWER MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden flex justify-end">
          <div className="w-64 bg-[#1C1C1C] h-full p-6 flex flex-col space-y-6 border-l border-white/10 animate-fade-in relative pt-20">
            <div className="absolute top-6 left-6">
              <span className="font-sans text-lg font-bold text-white">
                K'lev<span className="text-[#F5A623]">.</span><span className="text-[#00AEBB]">ai</span>
              </span>
            </div>
            
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`py-2 px-3 rounded-lg text-left text-xs font-semibold uppercase tracking-wider transition ${
                      isActive 
                        ? 'bg-[#00AEBB]/10 text-[#00AEBB] border border-[#00AEBB]/30 shadow-[0_0_8px_rgba(0,174,187,0.15)]' 
                        : 'text-[#A0A0A0] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-auto border-t border-white/5 pt-4 text-center">
              <p className="text-[9px] text-[#A0A0A0]">TM Media Solutions ®</p>
              <p className="text-[7px] text-[#A0A0A0]/60 mt-1">Sovereign National OS Framework</p>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER WITH 12-COLUMN SYSTEM */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10 flex flex-col">
        
        {/* FAINT CULTURAL BEADWORK PATTERN OVERLAY */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none bg-[radial-gradient(#00AEBB_1px,transparent_1px)] [background-size:16px_16px] z-0" />
        
        {currentView !== 'about' ? (
          /* Render the LizzyChatbot core flow which handles internal Home, ZeroMode, Kode.Kasi and Safety Pulse sub-panels */
          <div className="flex-1 flex flex-col z-10 animate-fade-in">
            <LizzyChatbot 
              externalActiveView={currentView} 
              onViewChange={handleChatViewChange} 
            />
          </div>
        ) : (
          /* About Section (10-Layer Stack Visualizer & Strategy Report) */
          <div className="space-y-8 z-10 animate-fade-in">
            
            {/* Centered About Header & Tagline */}
            <div className="text-center max-w-3xl mx-auto space-y-3 py-4">
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
                Sovereign Knowledge Infrastructure
              </h1>
              <p className="text-base md:text-lg text-[#00AEBB] font-medium tracking-wide">
                Offline, On Purpose. Built for the South African Digital Renaissance.
              </p>
              <p className="text-xs text-[#A0A0A0] max-w-xl mx-auto leading-relaxed">
                K'lev.ai is the world's first multi-tiered, linguistically-aware national operating system designed to run smart in blackouts, comply fully with POPIA, and empower local ekasi developers.
              </p>
            </div>

            {/* Grid Layout: Stack Architecture Visualizer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Col: 10-Layer Stack Visualization */}
              <div className="lg:col-span-5 bg-[#1C1C1C] p-6 rounded-2xl border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.3)] backdrop-blur-md">
                <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
                  <Compass className="h-5 w-5 text-[#00AEBB]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    10-Layer National Stack
                  </span>
                </div>
                <ArchitectureGraph 
                  selectedLayerId={selectedLayerId} 
                  onSelectLayer={setSelectedLayerId} 
                />
              </div>

              {/* Right Col: Layer details & simulation interface */}
              <div className="lg:col-span-7">
                <LayerDetail layerId={selectedLayerId} />
              </div>

            </div>

            {/* Ecosystem Roadmap Section */}
            <div className="bg-[#1C1C1C] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
              <div className="flex items-center gap-2.5 mb-6 border-b border-white/5 pb-4">
                <BookOpen className="h-5 w-5 text-[#F5A623]" />
                <h2 className="text-base font-semibold uppercase tracking-wider text-white">
                  Strategic Deployment Roadmap & Ecosystem
                </h2>
              </div>
              <EcosystemReport />
            </div>

          </div>
        )}

      </main>

      {/* CULTURAL INTEGRATION SILHOUETTE (Table Mountain + Acacia Trees) */}
      <div className="w-full relative h-20 md:h-28 overflow-hidden pointer-events-none select-none mt-auto opacity-20">
        <svg viewBox="0 0 1440 120" className="absolute bottom-0 w-full h-full text-white fill-current" preserveAspectRatio="none">
          {/* Table Mountain Silhouette */}
          <path d="M 0 120 L 0 90 L 150 90 L 180 85 Q 240 85 270 70 L 400 70 L 420 50 L 580 50 L 600 65 L 750 65 L 790 75 Q 850 75 920 60 L 1100 60 L 1150 78 L 1300 78 L 1350 90 L 1440 90 L 1440 120 Z" />
          
          {/* Acacia tree profiles */}
          {/* Tree 1 (Left) */}
          <path d="M 120 90 Q 115 80 118 70 Q 112 71 110 65 Q 120 62 125 66 Q 130 55 120 54 Q 135 50 145 53 Q 140 68 135 70 Q 138 80 130 90 Z" />
          {/* Tree 2 (Right) */}
          <path d="M 1020 70 Q 1015 60 1018 50 Q 1010 48 1005 45 Q 1020 40 1028 44 Q 1035 32 1022 30 Q 1040 25 1052 30 Q 1045 48 1038 52 Q 1040 60 1030 70 Z" />
        </svg>
      </div>

      {/* FIXED CULTURAL BEADWORK FOOTER BORDER */}
      <div className="h-1 w-full beadwork-border opacity-20" />

      {/* SEAMLESS PREMIUM FOOTER */}
      <footer className="bg-[#0A0A0A] border-t border-white/5 py-6 px-6 text-center text-[10px] text-[#A0A0A0] font-sans">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="leading-relaxed">
            © 2026 K'lev.ai Initiative. Configured for South African POPIA specifications & linguistic charters. TM Media Solutions ®
          </p>
          <div className="flex items-center gap-2 font-sans text-[9px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#007A4D] animate-pulse" />
            <span className="text-[#007A4D] font-semibold tracking-wider uppercase">Mzansi Sovereign Security Network</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
