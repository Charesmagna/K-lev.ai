import React from 'react';
import { 
  Brain, Smile, Languages, ShieldAlert, Database, MapPin, Users, WifiOff, Search, TrendingUp,
  Layers, CheckCircle, Shield, AlertCircle
} from 'lucide-react';
import { K_LEVA_LAYERS } from '../data/layersData';
import { Layer } from '../types';

interface ArchitectureGraphProps {
  selectedLayerId: number;
  onSelectLayer: (id: number) => void;
}

const CATEGORY_STYLES: Record<string, { bg: string; border: string; text: string; label: string }> = {
  core: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", label: "Core Layer" },
  adaptation: { bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-400", label: "Cultural" },
  safety: { bg: "bg-rose-500/10", border: "border-rose-500/30", text: "text-rose-400", label: "Safety" },
  data: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", label: "Regional Data" },
  orchestration: { bg: "bg-teal-500/10", border: "border-teal-500/30", text: "text-teal-400", label: "Agent Engine" },
  infrastructure: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", label: "Infrastructure" }
};

export default function ArchitectureGraph({ selectedLayerId, onSelectLayer }: ArchitectureGraphProps) {
  
  const getIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className={className} />;
      case 'Smile': return <Smile className={className} />;
      case 'Languages': return <Languages className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'Database': return <Database className={className} />;
      case 'MapPin': return <MapPin className={className} />;
      case 'Users': return <Users className={className} />;
      case 'WifiOff': return <WifiOff className={className} />;
      case 'Search': return <Search className={className} />;
      case 'TrendingUp': return <TrendingUp className={className} />;
      default: return <Layers className={className} />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-emerald-400" />
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">K'lev.ai 10-Layer Stack</h4>
        </div>
        <span className="text-[10px] font-mono text-gray-500">Sovereign National OS</span>
      </div>

      <div className="flex flex-col gap-2">
        {K_LEVA_LAYERS.map((layer) => {
          const isSelected = layer.id === selectedLayerId;
          const style = CATEGORY_STYLES[layer.category] || { bg: "bg-gray-800/10", border: "border-gray-800", text: "text-gray-400", label: "System" };

          return (
            <button
              key={layer.id}
              onClick={() => onSelectLayer(layer.id)}
              className={`w-full text-left p-3 rounded-lg border transition duration-150 relative overflow-hidden flex items-center justify-between gap-3 ${
                isSelected
                  ? `bg-gray-900 border-2 ${style.border.replace('/30', '/80')} shadow-[0_0_15px_rgba(16,185,129,0.05)]`
                  : 'bg-gray-900/40 border-gray-800/60 hover:bg-gray-900/60 hover:border-gray-700/80'
              }`}
            >
              {/* Highlight bar for selected layer */}
              {isSelected && (
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${style.text.replace('text-', 'bg-')}`} />
              )}

              <div className="flex items-center gap-3 min-w-0">
                {/* Layer Badge / Number */}
                <span className="font-mono text-xs font-bold text-gray-500 bg-gray-950 px-2 py-1 rounded">
                  L{layer.id.toString().padStart(2, '0')}
                </span>

                {/* Layer Icon */}
                <div className={`p-2 rounded-lg ${isSelected ? style.bg : 'bg-gray-950/60'} ${style.text} shrink-0`}>
                  {getIcon(layer.icon, "h-4 w-4")}
                </div>

                {/* Layer Details */}
                <div className="min-w-0">
                  <p className={`text-xs font-bold truncate leading-tight ${isSelected ? 'text-gray-100' : 'text-gray-300'}`}>
                    {layer.title}
                  </p>
                  <p className="text-[10px] text-gray-500 truncate leading-snug mt-0.5">
                    {layer.subtitle}
                  </p>
                </div>
              </div>

              {/* Status & Categorization tags */}
              <div className="flex items-center gap-2 shrink-0">
                <span className={`hidden sm:inline-block text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${style.bg} ${style.border} ${style.text}`}>
                  {style.label}
                </span>
                {layer.id <= 4 ? (
                  <span className="flex items-center gap-1 text-[8px] text-emerald-400 font-mono font-bold bg-emerald-500/5 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                    <CheckCircle className="h-2 w-2" /> PILOT
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[8px] text-indigo-400 font-mono font-bold bg-indigo-500/5 border border-indigo-500/20 px-1.5 py-0.5 rounded">
                    <AlertCircle className="h-2 w-2" /> PLAN
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
