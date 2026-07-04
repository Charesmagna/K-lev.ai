import React, { useState } from 'react';
import { 
  CheckCircle, Clock, AlertCircle, TrendingUp, TrendingDown, HelpCircle,
  TrendingUp as TrendUp, Layers, UserPlus, FileText, ArrowRight, BookOpen, BarChart3, Star
} from 'lucide-react';
import { IMPLEMENTATION_ROADMAP, KEY_EVALUATION_METRICS } from '../data/layersData';

export default function EcosystemReport() {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'comparison' | 'kpis' | 'report'>('roadmap');

  return (
    <div className="space-y-6">
      {/* Tab Selectors */}
      <div className="flex flex-wrap border-b border-gray-900 gap-1 pb-px">
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition ${
            activeTab === 'roadmap'
              ? 'border-emerald-500 text-emerald-400 font-bold'
              : 'border-transparent text-gray-500 hover:text-gray-300'
          }`}
        >
          <Clock className="h-3 w-3 inline mr-1.5" />
          Implementation Roadmap
        </button>

        <button
          onClick={() => setActiveTab('comparison')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition ${
            activeTab === 'comparison'
              ? 'border-emerald-500 text-emerald-400 font-bold'
              : 'border-transparent text-gray-500 hover:text-gray-300'
          }`}
        >
          <Layers className="h-3 w-3 inline mr-1.5" />
          Competitive Advantage
        </button>

        <button
          onClick={() => setActiveTab('kpis')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition ${
            activeTab === 'kpis'
              ? 'border-emerald-500 text-emerald-400 font-bold'
              : 'border-transparent text-gray-500 hover:text-gray-300'
          }`}
        >
          <BarChart3 className="h-3 w-3 inline mr-1.5" />
          Key Evaluation Metrics (KPIs)
        </button>

        <button
          onClick={() => setActiveTab('report')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition ${
            activeTab === 'report'
              ? 'border-emerald-500 text-emerald-400 font-bold'
              : 'border-transparent text-gray-500 hover:text-gray-300'
          }`}
        >
          <FileText className="h-3 w-3 inline mr-1.5" />
          Full Research Paper
        </button>
      </div>

      {/* Tab Outputs */}
      <div className="min-h-[350px]">
        {activeTab === 'roadmap' && <RoadmapTab />}
        {activeTab === 'comparison' && <ComparisonTab />}
        {activeTab === 'kpis' && <KpiTab />}
        {activeTab === 'report' && <ReportTab />}
      </div>
    </div>
  );
}

// ==========================================
// ROADMAP TAB COMPONENT
// ==========================================
function RoadmapTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-100">National Deployment & Phasing Strategy</h3>
          <p className="text-xs text-gray-500 mt-0.5">A structured plan aligned with economic and technological dependencies</p>
        </div>
        <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">4-PHASE CYCLE</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {IMPLEMENTATION_ROADMAP.map((p, i) => (
          <div key={i} className="p-4 bg-gray-950/20 rounded-xl border border-gray-900/80 flex flex-col justify-between hover:border-gray-800 transition">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-emerald-400">{p.phase}</span>
                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${
                  p.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
                  p.status === 'current' ? 'bg-amber-500/10 text-amber-400 animate-pulse' :
                  'bg-gray-900 text-gray-500'
                }`}>{p.status}</span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-200">{p.title}</h4>
                <span className="text-[9px] font-mono text-gray-500 block mt-0.5">{p.duration}</span>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-gray-950">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Objectives</p>
                <ul className="space-y-1">
                  {p.objectives.map((obj, j) => (
                    <li key={j} className="text-[10px] text-gray-400 leading-normal flex items-start gap-1">
                      <span className="text-emerald-500 shrink-0 mt-0.5">•</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-1.5 pt-4">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Milestone Deliverables</p>
              <div className="space-y-1">
                {p.deliverables.map((del, j) => (
                  <div key={j} className="text-[9px] bg-gray-950 border border-gray-900/60 p-1.5 rounded text-gray-300 font-medium">
                    {del}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// COMPARISON TAB COMPONENT
// ==========================================
function ComparisonTab() {
  const compFeatures = [
    {
      feat: "Local-first RAG engine",
      kleva: "Yes, fully offline and private. Zero leakages.",
      global: "No, cloud-centric. Personal metadata leaves country.",
      local: "Absent or highly limited in scale."
    },
    {
      feat: "Eleven-language support",
      kleva: "Comprehensive. Native voice/synthesis in 11 official tongues.",
      global: "English-centric. Indigenous dialects neglected.",
      local: "Surface level, lacks synthesis and ASR."
    },
    {
      feat: "Cultural Personality Adaptations",
      kleva: "Deep persona profiles reflecting local norms (Ubuntu principles).",
      global: "Generic text with minimal custom context.",
      local: "Rarely designed structurally."
    },
    {
      feat: "SafetyLink Integration",
      kleva: "Multi-channel, redundant alert routing with local audit logs.",
      global: "Standard chat safety filtering, no system escalation.",
      local: "Fragmented, proprietary protocols."
    },
    {
      feat: "Offline Resilience",
      kleva: "Full edge functionality + BLE P2P device packet mesh.",
      global: "Completely dependent on solid internet connectivity.",
      local: "Strictly cloud-based REST APIs."
    },
    {
      feat: "Regulatory Alignment",
      kleva: "POPIA compliant, with automatic client-side sanitizers.",
      global: "US/EU GDPR models, ignoring local Information Regulator mandates.",
      local: "Compliance treated as an after-thought."
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-gray-100">National Sovereign Competitive Advantage</h3>
        <p className="text-xs text-gray-500 mt-0.5">How K'lev.ai compares to global commercial models and basic local chatbots</p>
      </div>

      <div className="overflow-x-auto border border-gray-900/80 rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-950/60 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-900">
              <th className="p-4 font-semibold">Features & Capabilities</th>
              <th className="p-4 text-emerald-400 font-semibold bg-emerald-500/5">K'lev.ai (Proposed)</th>
              <th className="p-4 font-semibold">Global Assistants (GPT-4 / Gemini)</th>
              <th className="p-4 font-semibold">Basic Local Conversational Chatbots</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-900 font-medium">
            {compFeatures.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-950/20 text-xs">
                <td className="p-4 font-bold text-gray-300">{row.feat}</td>
                <td className="p-4 text-gray-200 bg-emerald-500/5 font-semibold">
                  <div className="flex items-start gap-1.5">
                    <Star className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0 fill-emerald-400/20" />
                    <span>{row.kleva}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-400">{row.global}</td>
                <td className="p-4 text-gray-500">{row.local}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// KPI TAB COMPONENT
// ==========================================
function KpiTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-gray-100">Operational KPIs & Quality Indicators</h3>
        <p className="text-xs text-gray-500 mt-0.5">Objective metrics to evaluate systemic accuracy, safety latency, and local alignment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {KEY_EVALUATION_METRICS.map((k, i) => (
          <div key={i} className="p-4 bg-gray-950/20 rounded-xl border border-gray-900 flex flex-col justify-between hover:border-gray-800 transition">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-semibold text-gray-400 uppercase">
                <span>{k.name}</span>
                {k.trend === 'up' ? (
                  <span className="text-emerald-400 flex items-center gap-0.5 font-mono">
                    <TrendUp className="h-3 w-3" /> STABLE
                  </span>
                ) : (
                  <span className="text-gray-500 flex items-center gap-0.5 font-mono">
                    STABLE
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-2xl font-bold font-mono text-gray-100">{k.value}</span>
                <span className="text-xs font-mono text-gray-500">Target: {k.target}</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 leading-normal mt-3 pt-3 border-t border-gray-950 italic">
              {k.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// REPORT TAB COMPONENT
// ==========================================
function ReportTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-gray-100">National Intelligence Layer Research Manuscript</h3>
        <p className="text-xs text-gray-500 mt-0.5">The complete architectural specification document of K'lev.ai</p>
      </div>

      <div className="p-6 bg-gray-950/40 rounded-xl border border-gray-900 max-h-[480px] overflow-y-auto space-y-6 font-sans text-gray-300 leading-relaxed text-xs">
        <div className="text-center space-y-2 pb-6 border-b border-gray-900">
          <h1 className="text-lg font-extrabold text-gray-100 tracking-tight">K'lev.ai: A South African National Knowledge Intelligence Layer</h1>
          <p className="font-mono text-[10px] text-emerald-400">ARCHITECTURAL DESIGN PROSPECTUS & BLUEPRINT SPECIFICATIONS</p>
          <p className="text-[10px] text-gray-500">Published: July 2026 • Sovereign Architecture Review</p>
        </div>

        <section className="space-y-2">
          <h2 className="font-bold text-gray-100 text-sm border-l-2 border-emerald-500 pl-2">1. Executive Overview</h2>
          <p>
            K'lev.ai represents a fundamental paradigm shift in sovereign artificial intelligence infrastructure. 
            Designed specifically for the unique socio-economic, infrastructural, and linguistic realities of South Africa, 
            the platform acts as a decentralized operating system for national knowledge, public safety, and administrative execution. 
            By deploying a modular, ten-layer containerized architecture, K'lev.ai is capable of running fully offline, 
            complying directly with POPIA, and communicating seamlessly across all eleven official national languages.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-gray-100 text-sm border-l-2 border-emerald-500 pl-2">2. Architecture Matrix</h2>
          <p>
            The system divides operations into ten distinct, isolated modules. 
            From the core RAG Engine (The South African Brain) utilizing local vector collections and parameter-stripped models (Llama 3.2), 
            to the edge BLE Mesh routing network, the stack handles processing near-user. 
            This structural edge-first positioning minimizes latency, provides full immunity against rolling electrical blackouts (load shedding), 
            and eliminates data transit risks, guaranteeing total adherence to national sovereignty guidelines.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-gray-100 text-sm border-l-2 border-emerald-500 pl-2">3. Regulatory & Social Impact</h2>
          <p>
            Through robust multi-channel safety alerting built on the SafetyLink specification, the layer guarantees that emergency triggers 
            reach community responders under worst-case communication failure states. 
            Linguistic diversity is addressed structurally rather than cosmetically—native speech models handle conversational code-switching, 
            whilst the local personality framework embeds Ubuntu values (consensus, collective mutual aid, and respectful address) 
            into every model turn. K'lev.ai is not merely an AI; it is an intelligent civic utility.
          </p>
        </section>
      </div>
    </div>
  );
}
