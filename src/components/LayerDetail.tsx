import React, { useState } from 'react';
import { 
  Check, Cpu, Shield, TrendingUp, Info, HelpCircle, 
  BookOpen, PlayCircle, ExternalLink, RefreshCw 
} from 'lucide-react';
import { K_LEVA_LAYERS } from '../data/layersData';
import PlaygroundSimulators from './PlaygroundSimulators';

interface LayerDetailProps {
  layerId: number;
}

export default function LayerDetail({ layerId }: LayerDetailProps) {
  const layer = K_LEVA_LAYERS.find(l => l.id === layerId);
  const [activeTab, setActiveTab] = useState<'specs' | 'simulation'>('simulation');

  if (!layer) {
    return (
      <div className="p-8 text-center text-gray-500 bg-gray-950/20 rounded-xl border border-gray-900">
        <Info className="h-8 w-8 mx-auto mb-2 opacity-40 text-gray-400" />
        <p className="text-sm font-semibold">Select a layer to view details</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-950/20 rounded-xl border border-gray-900 overflow-hidden flex flex-col h-full">
      {/* Layer Header */}
      <div className="p-5 border-b border-gray-900 bg-gray-950/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              L{layer.id.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider capitalize">
              {layer.category} Layer
            </span>
          </div>
          <h2 className="text-lg font-bold text-gray-100 mt-1 leading-tight">{layer.title}</h2>
          <p className="text-xs text-gray-400 mt-0.5 font-medium">{layer.subtitle}</p>
        </div>

        {/* Tab selector */}
        <div className="flex bg-gray-900 p-1 rounded-lg border border-gray-800 self-start sm:self-center">
          <button
            onClick={() => setActiveTab('simulation')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
              activeTab === 'simulation'
                ? 'bg-emerald-500 text-gray-950 shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <PlayCircle className="h-3 w-3 inline mr-1.5" />
            Interactive Simulator
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
              activeTab === 'specs'
                ? 'bg-emerald-500 text-gray-950 shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <BookOpen className="h-3 w-3 inline mr-1.5" />
            Specs & compliance
          </button>
        </div>
      </div>

      {/* Layer Contents */}
      <div className="p-5 flex-1 overflow-y-auto space-y-6">
        {activeTab === 'specs' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Specs */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Description</h4>
                <p className="text-xs text-gray-300 leading-relaxed font-medium">
                  {layer.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Key Features</h4>
                <ul className="space-y-2">
                  {layer.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-300 leading-normal">
                      <Check className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Specs */}
            <div className="space-y-4">
              {/* Technology Stack */}
              <div className="p-4 bg-gray-950/40 rounded-lg border border-gray-800">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5 text-blue-400" />
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {layer.techStack.map((tech, i) => (
                    <span key={i} className="text-[10px] font-mono bg-blue-950/20 text-blue-300 border border-blue-900/40 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* POPIA Compliance */}
              <div className="p-4 bg-gray-950/40 rounded-lg border border-gray-800">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-rose-400" />
                  POPIA Compliance
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed font-medium">
                  {layer.popiaCompliance}
                </p>
              </div>

              {/* Evaluation Metrics */}
              <div className="p-4 bg-gray-950/40 rounded-lg border border-gray-800">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                  Evaluation Metrics & KPIs
                </h4>
                <ul className="space-y-1.5">
                  {layer.evaluationMetrics.map((met, i) => (
                    <li key={i} className="text-xs font-semibold text-gray-300 font-mono flex items-center gap-1.5">
                      <span className="text-emerald-400">•</span>
                      {met}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-950/20 p-4 rounded-xl border border-gray-900/60 h-full">
            <PlaygroundSimulators layerId={layer.id} />
          </div>
        )}
      </div>
    </div>
  );
}
