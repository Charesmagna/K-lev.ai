import React, { useState, useEffect, useRef } from 'react';
import { 
  MoreVertical, Sparkles, Compass, BookOpen, Terminal, Code2, Shield, Languages, ChevronRight
} from 'lucide-react';
import ArchitectureGraph from './components/ArchitectureGraph';
import LayerDetail from './components/LayerDetail';
import EcosystemReport from './components/EcosystemReport';
import SiriChatbot from './components/SiriChatbot';

export default function App() {
  const [activeTab, setActiveTab] = useState<'assistant' | 'visualizer' | 'strategy'>('assistant');
  const [selectedLayerId, setSelectedLayerId] = useState<number>(1);

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 flex flex-col justify-between font-sans antialiased selection:bg-purple-500/30 selection:text-purple-800 overflow-x-hidden relative">
      
      {/* Siri Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center relative z-10">
        
        {activeTab === 'assistant' ? (
          /* Siri/ChatGPT & Kasi Kode unified experience is self-contained inside SiriChatbot */
          <SiriChatbot />
        ) : activeTab === 'visualizer' ? (
          /* Interactive Blueprint Screen */
          <div className="space-y-6 animate-fade-in">
            {/* Minimal Subheader and Return Option */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div>
                <h1 className="text-lg font-black tracking-tight text-gray-950 flex items-center gap-2">
                  <Compass className="h-5 w-5 text-purple-600" />
                  K'lev.ai 10-Layer Blueprint Stack
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  National knowledge operating system architectural blueprint. Click any node to inspect.
                </p>
              </div>
              <button 
                onClick={() => setActiveTab('assistant')}
                className="text-xs bg-white hover:bg-gray-50 px-4 py-2 border border-gray-200 rounded-xl font-bold transition text-purple-600 shadow-sm"
              >
                Back to Siri Chatbot
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Col: The Layer Stack Graph */}
              <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
                <ArchitectureGraph 
                  selectedLayerId={selectedLayerId} 
                  onSelectLayer={setSelectedLayerId} 
                />
              </div>

              {/* Right Col: Layer details and embedded playground */}
              <div className="lg:col-span-7">
                <LayerDetail layerId={selectedLayerId} />
              </div>
            </div>
          </div>
        ) : (
          /* Strategy Paper / Roadmap Screen */
          <div className="space-y-6 animate-fade-in">
            {/* Subheader */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div>
                <h1 className="text-lg font-black tracking-tight text-gray-950 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  Ecosystem & Roadmap Strategy
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  National Deployment and competitive comparisons of K'lev.ai.
                </p>
              </div>
              <button 
                onClick={() => setActiveTab('assistant')}
                className="text-xs bg-white hover:bg-gray-50 px-4 py-2 border border-gray-200 rounded-xl font-bold transition text-purple-600 shadow-sm"
              >
                Back to Siri Chatbot
              </button>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
              <EcosystemReport />
            </div>
          </div>
        )}

      </main>

      {/* Unified Extra Switch Bar: Quick Access floating at the very bottom */}
      <div className="p-4 flex justify-center gap-3 relative z-20">
        <button
          onClick={() => setActiveTab('assistant')}
          className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition border ${
            activeTab === 'assistant'
              ? 'bg-purple-100 border-purple-300 text-purple-700'
              : 'bg-white border-gray-200 text-gray-600 hover:text-gray-950 shadow-sm'
          }`}
        >
          Siri Assist
        </button>
        <button
          onClick={() => setActiveTab('visualizer')}
          className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition border ${
            activeTab === 'visualizer'
              ? 'bg-purple-100 border-purple-300 text-purple-700'
              : 'bg-white border-gray-200 text-gray-600 hover:text-gray-950 shadow-sm'
          }`}
        >
          10-Layer Stack
        </button>
        <button
          onClick={() => setActiveTab('strategy')}
          className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition border ${
            activeTab === 'strategy'
              ? 'bg-purple-100 border-purple-300 text-purple-700'
              : 'bg-white border-gray-200 text-gray-600 hover:text-gray-950 shadow-sm'
          }`}
        >
          Roadmap
        </button>
      </div>

      {/* Discrete Premium Footer */}
      <footer className="border-t border-gray-200 bg-white/60 py-4 px-6 text-center text-[10px] text-gray-500 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>
            © 2026 K'lev.ai Initiative. Designed in alignment with South African POPIA regulations & linguistic charters.
          </p>
          <div className="flex items-center gap-1.5 font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Sovereign Security Framework Active</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
