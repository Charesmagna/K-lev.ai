import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, Smile, Languages, ShieldAlert, Database, MapPin, Users, WifiOff, Search, TrendingUp,
  Play, Pause, Send, Plus, RefreshCw, AlertTriangle, CheckCircle, Clock, Volume2, Shield,
  ArrowRight, ToggleLeft, ToggleRight, Sliders, Layers, Trash2, Cpu
} from 'lucide-react';
import { 
  CULTURAL_PERSONAS, 
  SOUTH_AFRICAN_LANGUAGES, 
  KNOWLEDGE_GRAPH_DATA, 
  KEY_EVALUATION_METRICS 
} from '../data/layersData';
import { SafetyAlert, GraphNode, GraphLink, Agent, PersonaType } from '../types';

interface PlaygroundSimulatorsProps {
  layerId: number;
}

export default function PlaygroundSimulators({ layerId }: PlaygroundSimulatorsProps) {
  switch (layerId) {
    case 1:
      return <RagSimulator />;
    case 2:
      return <PersonalitySimulator />;
    case 3:
      return <LanguagesSimulator />;
    case 4:
      return <SafetyLinkSimulator />;
    case 5:
      return <KnowledgeGraphSimulator />;
    case 6:
      return <HyperlocalDataSimulator />;
    case 7:
      return <AgentSimulator />;
    case 8:
      return <OfflineMeshSimulator />;
    case 9:
      return <SearchEngineSimulator />;
    case 10:
      return <ModelStrategySimulator />;
    default:
      return (
        <div className="p-8 text-center text-gray-400">
          Select a layer to start the interactive simulation.
        </div>
      );
  }
}

// ==========================================
// 1. SOUTH AFRICAN BRAIN (RAG SIMULATOR)
// ==========================================
const RAG_FILES = [
  {
    name: "SA_Constitution_BillOfRights.pdf",
    description: "Chapter 2: Fundamental Civil & Linguistic Rights",
    content: "Chapter 2 of the Constitution of South Africa contains the Bill of Rights. Section 6 guarantees all citizens the right to linguistic freedom, establishing 11 official languages. Section 9 guarantees equality, prohibiting discrimination on grounds of race, gender, language, or culture. Section 29 guarantees the right to basic education in the official language of choice where reasonably practicable."
  },
  {
    name: "Freedom_Charter_1955.docx",
    description: "Kliptown Congress of the People Resolution",
    content: "The Freedom Charter was adopted in Kliptown on 26 June 1955. It states: 'The People shall govern! All National Groups shall have Equal Rights! There shall be peace and friendship! All people shall have equal right to use their own languages, and to develop their own folk culture and customs. The doors of learning and culture shall be opened!'"
  },
  {
    name: "SafetyLink_Community_ByLaws.txt",
    description: "CPF Community Emergency Escalation Mandate",
    content: "SafetyLink operational safety guidelines dictate that in high-priority distress scenarios, the primary agent must initiate direct escalations. If SMS channels fail to deliver within 5 seconds, voice calling or P2P BLE mesh relays are automatically deployed. Data must be buffered locally using IndexedDB to prevent communication blackout during level 6 load shedding."
  }
];

const SUGGESTED_QUERIES = [
  { text: "What are my linguistic rights in SA?", fileIndex: 0 },
  { text: "What did the Freedom Charter say about language?", fileIndex: 1 },
  { text: "What happens to SafetyLink alerts when load shedding hits?", fileIndex: 2 }
];

function RagSimulator() {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [query, setQuery] = useState(SUGGESTED_QUERIES[0].text);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<number>(0); // 0: Idle, 1: Chunking, 2: Embedding, 3: Searching, 4: Finished
  const [results, setResults] = useState<{
    chunks: { text: string; score: number }[];
    answer: string;
    source: string;
  } | null>(null);

  const handleSuggestClick = (q: string, idx: number) => {
    setQuery(q);
    setSelectedFileIndex(idx);
  };

  const handleSimulate = () => {
    if (!query.trim()) return;
    setIsProcessing(true);
    setStep(1);
    setResults(null);

    // Timeline steps for visual effect
    setTimeout(() => {
      setStep(2);
      setTimeout(() => {
        setStep(3);
        setTimeout(() => {
          setStep(4);
          setIsProcessing(false);

          // Generate response based on selected file and query
          let answer = "";
          let matchedChunks: { text: string; score: number }[] = [];
          const file = RAG_FILES[selectedFileIndex];

          if (selectedFileIndex === 0) {
            matchedChunks = [
              { text: "Section 6 guarantees all citizens the right to linguistic freedom, establishing 11 official languages.", score: 0.94 },
              { text: "Section 29 guarantees the right to basic education in the official language of choice where reasonably practicable.", score: 0.81 }
            ];
            answer = "According to Section 6 of the Bill of Rights in the South African Constitution, all citizens are guaranteed linguistic freedom, which is supported by the establishment of 11 official languages. Furthermore, Section 29 ensures that everyone has the right to receive basic education in the official language of their choice where practicable.";
          } else if (selectedFileIndex === 1) {
            matchedChunks = [
              { text: "All National Groups shall have Equal Rights! ... All people shall have equal right to use their own languages, and to develop their own folk culture.", score: 0.96 },
              { text: "The doors of learning and culture shall be opened!", score: 0.75 }
            ];
            answer = "The Freedom Charter (1955) emphasizes linguistic equality as a core pillar of a democratic South Africa, stating that 'All National Groups shall have Equal Rights!' and explicitly declaring that all people shall have an equal right to use their own languages and develop their own custom and culture.";
          } else {
            matchedChunks = [
              { text: "Data must be buffered locally using IndexedDB to prevent communication blackout during level 6 load shedding.", score: 0.91 },
              { text: "If SMS channels fail to deliver within 5 seconds, voice calling or P2P BLE mesh relays are automatically deployed.", score: 0.87 }
            ];
            answer = "In extreme circumstances like level 6 load shedding, SafetyLink addresses communication blackouts by buffering alert telemetry client-side using IndexedDB. If traditional cellular SMS channels fail to deliver within 5 seconds, it automatically triggers redundant dispatches through voice calling or local Bluetooth Low Energy (BLE) peer-to-peer mesh relays.";
          }

          setResults({
            chunks: matchedChunks,
            answer,
            source: file.name
          });
        }, 1000);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-emerald-400" />
          <h3 className="font-semibold text-gray-100">South African Brain Playground</h3>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">Offline RAG</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left pane: File explorer & settings */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Select Context Document</label>
            <div className="space-y-2">
              {RAG_FILES.map((file, idx) => (
                <button
                  key={file.name}
                  onClick={() => setSelectedFileIndex(idx)}
                  className={`w-full text-left p-3 rounded-lg border transition duration-150 ${
                    selectedFileIndex === idx
                      ? "bg-emerald-950/20 border-emerald-500/50 text-gray-100"
                      : "bg-gray-900/50 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-300"
                  }`}
                >
                  <p className="font-mono text-xs font-semibold">{file.name}</p>
                  <p className="text-xs mt-0.5 opacity-80">{file.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-gray-950/40 rounded-lg border border-gray-800">
            <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Ingested File Preview</h4>
            <p className="text-xs text-gray-400 italic line-clamp-4 leading-relaxed">
              "{RAG_FILES[selectedFileIndex].content}"
            </p>
          </div>
        </div>

        {/* Right pane: Search Console */}
        <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Pre-loaded Queries</label>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUERIES.map((sq, idx) => (
                  <button
                    key={sq.text}
                    onClick={() => handleSuggestClick(sq.text, sq.fileIndex)}
                    className="text-xs bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-300 px-3 py-1.5 rounded-full transition"
                  >
                    {sq.text}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Custom Sovereign Query</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type your question to search local memory..."
                  className="flex-1 text-sm bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-gray-100 focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={handleSimulate}
                  disabled={isProcessing}
                  className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800 text-gray-950 px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-1.5 transition"
                >
                  <Send className="h-4 w-4" />
                  Ask
                </button>
              </div>
            </div>
          </div>

          {/* Simulation steps */}
          {isProcessing && (
            <div className="p-4 bg-gray-950/60 rounded-lg border border-gray-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <RefreshCw className="h-3 w-3 animate-spin" />
                  Local Sovereign Inference Running
                </span>
                <span className="text-[10px] font-mono text-gray-500">Device: 8GB RAM Laptop (Simulated)</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className={`p-2 rounded border text-center transition ${step >= 1 ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' : 'bg-gray-900 border-gray-800 text-gray-600'}`}>
                  <p className="text-[10px] font-bold">STEP 1</p>
                  <p className="text-[9px] uppercase mt-0.5">Chunk Parsing</p>
                </div>
                <div className={`p-2 rounded border text-center transition ${step >= 2 ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' : 'bg-gray-900 border-gray-800 text-gray-600'}`}>
                  <p className="text-[10px] font-bold">STEP 2</p>
                  <p className="text-[9px] uppercase mt-0.5">Fastembed Vectors</p>
                </div>
                <div className={`p-2 rounded border text-center transition ${step >= 3 ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' : 'bg-gray-900 border-gray-800 text-gray-600'}`}>
                  <p className="text-[10px] font-bold">STEP 3</p>
                  <p className="text-[9px] uppercase mt-0.5">FAISS Scan</p>
                </div>
              </div>
            </div>
          )}

          {/* Results section */}
          {results && !isProcessing && (
            <div className="p-4 bg-gray-950/50 rounded-lg border border-gray-800 space-y-4 mt-4">
              <div className="space-y-1">
                <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Llama 3.2 Answer</h4>
                <p className="text-sm text-gray-200 leading-relaxed bg-gray-900/40 p-3 rounded-lg border border-gray-800/40">{results.answer}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-gray-900">
                <div>
                  <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Source Attribution</h4>
                  <div className="flex items-center gap-1.5 p-1.5 bg-gray-900 rounded border border-gray-800">
                    <Database className="h-3.5 w-3.5 text-blue-400" />
                    <span className="font-mono text-[10px] text-blue-300 truncate">{results.source}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Semantic Confidence</h4>
                  <div className="space-y-1">
                    {results.chunks.map((c, i) => (
                      <div key={i} className="flex items-center justify-between text-[10px] bg-gray-900/30 px-2 py-1 rounded border border-gray-800/50">
                        <span className="truncate max-w-[120px] text-gray-400 italic">"{c.text}"</span>
                        <span className="font-mono text-emerald-400 font-bold">{(c.score * 100).toFixed(0)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. LOCAL PERSONALITY LAYER
// ==========================================
function PersonalitySimulator() {
  const [selectedPersona, setSelectedPersona] = useState<PersonaType>('mzansi_elder');
  const [inputText, setInputText] = useState("Explain how to conserve electrical energy in my house during load shedding.");
  const [adaptedText, setAdaptedText] = useState("");
  const [isAdapting, setIsAdapting] = useState(false);

  const personaInfo = CULTURAL_PERSONAS.find(p => p.id === selectedPersona)!;

  const handleAdapt = () => {
    setIsAdapting(true);
    setAdaptedText("");

    setTimeout(() => {
      setIsAdapting(false);
      let answer = "";
      if (selectedPersona === 'mzansi_elder') {
        answer = `Sawubona mntanami. Ubuntu teaches us that our light is shared. When Eskom calls for load shedding, we must be careful with our stove, geyser, and heavy lights. \n\n"Isitsha esihle asidleli" – a beautiful vessel is kept safe. Let us switch off our big appliances immediately. Keep your lamps charged and share warmth with your neighbors, as Gogo used to do in the village. This is how we look after one another. Ngiyabonga, my child.`;
      } else if (selectedPersona === 'soweto_youth') {
        answer = `Heita, my leader! Sharp-sharp! Look, load shedding is eating our flow, standard. But we don't go down, we hustle smart. \n\nHere's the play: kill the geyser and turn off that heavy oven, my leader. Switch to LED, standard ekasi style, and run your gadgets on a power bank. No load shedding can kill our digital hustle if we stay fully charged. Stay safe, sharp-sharp!`;
      } else {
        answer = `Good day. In alignment with our collective commitment to corporate responsibility and community sustainability, managing electrical consumption is paramount. \n\nUnder the framework of corporate Ubuntu stewardship, we recommend executing a partial demand-side curtailment: immediately isolate heavy thermal elements (geysers and space heating) and utilize high-efficiency LED technologies. Let us build cooperative energy resilience, ensuring compliance with local supply parameters.`;
      }
      setAdaptedText(answer);
    }, 800);
  };

  useEffect(() => {
    handleAdapt();
  }, [selectedPersona]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2">
          <Smile className="h-5 w-5 text-amber-400" />
          <h3 className="font-semibold text-gray-100">Local Cultural Personality Modeler</h3>
        </div>
        <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400">Ubuntu Prompting</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Persona Selectors */}
        <div className="md:col-span-4 space-y-3">
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Select Cultural Persona</label>
          <div className="space-y-2">
            {CULTURAL_PERSONAS.map((persona) => (
              <button
                key={persona.id}
                onClick={() => setSelectedPersona(persona.id)}
                className={`w-full text-left p-3 rounded-lg border transition duration-150 flex items-start gap-2.5 ${
                  selectedPersona === persona.id
                    ? "bg-amber-950/20 border-amber-500/50 text-gray-100"
                    : "bg-gray-900/50 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-300"
                }`}
              >
                <span className="text-2xl mt-0.5 leading-none">{persona.avatar}</span>
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate">{persona.name}</p>
                  <p className="text-[10px] mt-0.5 opacity-80 leading-snug line-clamp-2">{persona.tagline}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="p-3 bg-gray-950/40 rounded-lg border border-gray-800 space-y-2">
            <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider block">Ubuntu Principle Injected</span>
            <p className="text-[11px] text-gray-400 leading-relaxed italic">
              "{personaInfo.ubuntuPrinciple}"
            </p>
          </div>
        </div>

        {/* Console */}
        <div className="md:col-span-8 space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Instruction Input</label>
            <textarea
              rows={2}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full text-xs bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-amber-500 leading-normal"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleAdapt}
              disabled={isAdapting}
              className="bg-amber-500 hover:bg-amber-400 disabled:bg-amber-800 text-gray-950 font-semibold px-4 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition"
            >
              <RefreshCw className={`h-3 w-3 ${isAdapting ? 'animate-spin' : ''}`} />
              Generate Cultural Adaptation
            </button>
          </div>

          <div className="p-4 bg-gray-950/50 rounded-lg border border-gray-800 min-h-[160px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-gray-900">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Model Personality Output</span>
                <span className="text-[9px] font-mono text-gray-500">Injected Persona: {selectedPersona.toUpperCase()}</span>
              </div>
              {isAdapting ? (
                <div className="space-y-2 py-4">
                  <div className="h-3 bg-gray-900 rounded animate-pulse w-3/4"></div>
                  <div className="h-3 bg-gray-900 rounded animate-pulse w-5/6"></div>
                  <div className="h-3 bg-gray-900 rounded animate-pulse w-2/3"></div>
                </div>
              ) : (
                <p className="text-xs text-gray-200 whitespace-pre-line leading-relaxed italic">
                  {adaptedText}
                </p>
              )}
            </div>

            {!isAdapting && adaptedText && (
              <div className="mt-4 pt-2 border-t border-gray-900 flex flex-wrap gap-1.5">
                <span className="text-[9px] font-semibold text-gray-400 uppercase mr-1">Colloquial tags:</span>
                {personaInfo.keyPhrases.slice(0, 2).map((phrase, i) => (
                  <span key={i} className="text-[9px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 max-w-full truncate">
                    {phrase}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. ELEVEN LANGUAGES LAYER (TTS / TRANSLATION)
// ==========================================
const TRANSLATION_MAP: Record<string, string> = {
  zu: "Siyakwamukela ku-K'lev.ai, isistimu yokusebenza yolwazi lukazwelonke. Singakha kanjani umphakathi ndawonye namuhla?",
  xh: "Wamkelekile ku-K'lev.ai, inkqubo yokusebenza yolwazi lwesizwe. Singakha njani uluntu kunye namhlanje?",
  af: "Welkom by K'lev.ai, jou nasionale kennisbedryfstelsel. Hoe kan ons vandag saam gemeenskap bou?",
  en: "Welcome to K'lev.ai, your national knowledge operating system. How can we build community together today?",
  nso: "O amogetswe go K'lev.ai, tshepediso ya go šoma ya tsebo ya bosetšhaba. Re ka aga bjang setšhaba mmogo lehono?",
  tn: "O amogetswe kwa K'lev.ai, tsamaiso ya go dira ya kitso ya bosetšhaba. Re ka aga jang setšhaba mmogo gompieno?",
  st: "O amogetswe ho K'lev.ai, mokgwa wa ho sebetsa wa tsebo ya setjhaba. Re ka haha jwang setjhaba mmoho kajeno?",
  ts: "U amukeriwile eka K'lev.ai, sisitemu yo tirha ya vutivi bya tiko. Hi nga aka njhani vaaki swin'we namuntlha?",
  ss: "Uyamukelwa ku-K'lev.ai, luhlelo lwekusebenta lwalwati lwasive. Singakha njani umphakatsi kanyekanye namuhla?",
  ve: "Vho tanganedzwa kha K'lev.ai, sisitemu ya u shuma ya ndivho ya lushaka. Ri nga fhaṱa hani vhapo vha u shuma vhoṱhe ṋamusi?",
  nr: "Uyamukelwa ku-K'lev.ai, isistimu yokusebenza yelwazi lephasi. Singakha njani umphakathi kanyekanye namhlanje?"
};

function LanguagesSimulator() {
  const [selectedLangCode, setSelectedLangCode] = useState("zu");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [inputText, setInputText] = useState("Welcome to K'lev.ai, your national knowledge operating system. How can we build community together today?");
  const [translationResult, setTranslationResult] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  const selectedLang = SOUTH_AFRICAN_LANGUAGES.find(l => l.code === selectedLangCode)!;

  const handleTranslate = () => {
    setIsTranslating(true);
    setIsPlaying(false);
    setProgress(0);
    setTimeout(() => {
      setIsTranslating(false);
      // Map back to realistic language translation
      setTranslationResult(TRANSLATION_MAP[selectedLangCode] || "Translation complete.");
    }, 500);
  };

  useEffect(() => {
    handleTranslate();
  }, [selectedLangCode]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 5;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2">
          <Languages className="h-5 w-5 text-indigo-400" />
          <h3 className="font-semibold text-gray-100">Eleven Languages Layer Simulator</h3>
        </div>
        <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs font-medium text-indigo-400">Multilingual synthesis</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Language Grid Selector */}
        <div className="lg:col-span-5 space-y-3">
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Select Target Language</label>
          <div className="grid grid-cols-2 gap-1.5 max-h-[220px] overflow-y-auto pr-1">
            {SOUTH_AFRICAN_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLangCode(lang.code)}
                className={`p-2 rounded border text-left transition duration-150 flex flex-col justify-between ${
                  selectedLangCode === lang.code
                    ? "bg-indigo-950/20 border-indigo-500/50 text-gray-100"
                    : "bg-gray-900/50 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-300"
                }`}
              >
                <div className="flex justify-between items-start w-full">
                  <span className="text-xs font-bold">{lang.name}</span>
                  <span className="text-[9px] font-mono text-gray-500">{lang.speakersPct}%</span>
                </div>
                <span className="text-[10px] opacity-70 mt-1">{lang.englishName}</span>
              </button>
            ))}
          </div>

          <div className="p-3 bg-gray-950/40 rounded-lg border border-gray-800 text-[10px] text-gray-400 space-y-1.5">
            <p className="font-semibold text-gray-300 uppercase tracking-wider">Linguistic Technology Status</p>
            <div className="grid grid-cols-3 gap-1">
              <div className="p-1.5 bg-gray-900 border border-gray-800/60 rounded text-center">
                <span className="block text-gray-500 uppercase text-[8px]">NLU</span>
                <span className={`font-bold ${selectedLang.nluStatus === 'Full' ? 'text-emerald-400' : 'text-amber-400'}`}>{selectedLang.nluStatus}</span>
              </div>
              <div className="p-1.5 bg-gray-900 border border-gray-800/60 rounded text-center">
                <span className="block text-gray-500 uppercase text-[8px]">Speech TTS</span>
                <span className={`font-bold ${selectedLang.ttsStatus === 'Full' ? 'text-emerald-400' : selectedLang.ttsStatus === 'In Progress' ? 'text-amber-400' : 'text-gray-500'}`}>{selectedLang.ttsStatus}</span>
              </div>
              <div className="p-1.5 bg-gray-900 border border-gray-800/60 rounded text-center">
                <span className="block text-gray-500 uppercase text-[8px]">ASR Code-sw</span>
                <span className={`font-bold ${selectedLang.asrStatus === 'Full' ? 'text-emerald-400' : selectedLang.asrStatus === 'In Progress' ? 'text-amber-400' : 'text-gray-500'}`}>{selectedLang.asrStatus}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Translation Console */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Source (English Reference)</label>
            <p className="p-2.5 bg-gray-950 rounded-lg text-xs border border-gray-900 italic text-gray-400">
              "{inputText}"
            </p>
          </div>

          <div className="p-4 bg-gray-950/50 rounded-lg border border-gray-800 space-y-3">
            <div className="flex items-center justify-between pb-1.5 border-b border-gray-900">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Translation to {selectedLang.name}</span>
              <span className="text-[9px] font-mono text-gray-500">Pipeline: NLLB-200 Fine-Tuned</span>
            </div>

            {isTranslating ? (
              <div className="space-y-2 py-2">
                <div className="h-3.5 bg-gray-900 rounded animate-pulse w-5/6"></div>
                <div className="h-3.5 bg-gray-900 rounded animate-pulse w-2/3"></div>
              </div>
            ) : (
              <p className="text-xs text-gray-200 font-medium leading-relaxed">
                {translationResult}
              </p>
            )}

            {/* TTS Audio Player Mock */}
            <div className="pt-4 border-t border-gray-900 flex items-center justify-between gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={selectedLang.ttsStatus === 'Planned'}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                  selectedLang.ttsStatus === 'Planned'
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : isPlaying
                      ? "bg-amber-500 hover:bg-amber-400 text-gray-950"
                      : "bg-indigo-500 hover:bg-indigo-400 text-gray-950"
                }`}
              >
                {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {selectedLang.ttsStatus === 'Planned' 
                  ? "TTS Planned" 
                  : isPlaying 
                    ? "Pause Voice" 
                    : "Generate Speech (TTS)"
                }
              </button>

              {/* Fake Audio Visualizer */}
              <div className="flex-1 flex items-center gap-1.5 h-6">
                {isPlaying ? (
                  Array.from({ length: 18 }).map((_, i) => {
                    const h = [10, 24, 16, 20, 12, 18, 22, 14, 8, 20, 24, 12, 18, 14, 22, 10, 16, 8][i];
                    const randH = Math.max(4, h + Math.sin(progress + i) * 6);
                    return (
                      <span
                        key={i}
                        className="w-1 bg-indigo-400 rounded-full transition-all duration-150"
                        style={{ height: `${randH}px` }}
                      ></span>
                    );
                  })
                ) : (
                  <div className="w-full h-[2px] bg-gray-800 rounded"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. SAFETYLINK INTEGRATION
// ==========================================
function SafetyLinkSimulator() {
  const [emergencyType, setEmergencyType] = useState<'Medical' | 'Security' | 'Fire'>('Medical');
  const [isOffline, setIsOffline] = useState(false);
  const [activeAlert, setActiveAlert] = useState<SafetyAlert | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const triggerAlert = () => {
    setIsSimulating(true);

    const newAlert: SafetyAlert = {
      id: Math.random().toString(36).substring(4, 8).toUpperCase(),
      timestamp: new Date().toLocaleTimeString(),
      type: emergencyType,
      status: 'Triggered',
      location: "Gauteng, Johannesburg, Soweto Zone 3",
      recipient: "Soweto Community CPF Dispatch & Emergency EMS",
      channels: {
        sms: 'pending',
        whatsapp: 'pending',
        voice: 'pending',
        mesh: 'pending'
      },
      logs: []
    };

    setActiveAlert(newAlert);

    // Timeline simulation logs
    const appendLog = (msg: string, updateState: Partial<SafetyAlert> = {}) => {
      setActiveAlert(prev => {
        if (!prev) return null;
        return {
          ...prev,
          ...updateState,
          logs: [...prev.logs, `${new Date().toLocaleTimeString()} - ${msg}`]
        };
      });
    };

    setTimeout(() => {
      appendLog("INCOMING PANIC SIGNAL INGESTED. GeoCoordinates: -26.2415, 27.8542.");
      
      setTimeout(() => {
        if (!isOffline) {
          appendLog("Primary channel cell tower available. Deploying Multichannel routing...", { status: 'Sent' });
          
          setTimeout(() => {
            appendLog("Twilio SMS dispatched successfully.", {
              channels: { sms: 'sent', whatsapp: 'pending', voice: 'pending', mesh: 'pending' }
            });

            setTimeout(() => {
              appendLog("WhatsApp notification delivered to CPF responder group. Status: [DELIVERED]", {
                channels: { sms: 'sent', whatsapp: 'delivered', voice: 'pending', mesh: 'pending' }
              });

              setTimeout(() => {
                appendLog("Interactive Voice Response (IVR) phone call initiated to Duty EMS Supervisor. Ringing...", {
                  channels: { sms: 'sent', whatsapp: 'delivered', voice: 'sent', mesh: 'pending' }
                });

                setTimeout(() => {
                  appendLog("EMS Supervisor call ANSWERED. Speech synthezier playback: 'K'lev.ai Alert Ref " + newAlert.id + " Ingested.'", {
                    channels: { sms: 'sent', whatsapp: 'delivered', voice: 'completed', mesh: 'pending' },
                    status: 'Acknowledged'
                  });
                  setIsSimulating(false);
                }, 1000);
              }, 1000);
            }, 1000);
          }, 1000);
        } else {
          appendLog("CELLULAR TOWER OFFLINE (Load Shedding Blackout detected). Buffering alarm telemetry locally in IndexedDB...", { status: 'Queued' });
          
          setTimeout(() => {
            appendLog("Initializing BLE (Bluetooth Low Energy) Mesh Relay Protocol.", {
              channels: { sms: 'pending', whatsapp: 'pending', voice: 'pending', mesh: 'pending' }
            });

            setTimeout(() => {
              appendLog("Relaying packet from sender edge device to CPF_Mesh_Node_03 (Community Gatehouse).", {
                channels: { sms: 'pending', whatsapp: 'pending', voice: 'pending', mesh: 'pending' },
                hops: 1
              });

              setTimeout(() => {
                appendLog("Relaying packet from CPF_Mesh_Node_03 to Gateway_Router_Backup (Solar powered).", {
                  hops: 2
                });

                setTimeout(() => {
                  appendLog("Gateway Router connected to satellite backup link. Broad-dispatching alerts.", {
                    channels: { sms: 'pending', whatsapp: 'pending', voice: 'pending', mesh: 'delivered' },
                    status: 'Delivered'
                  });
                  setIsSimulating(false);
                }, 1000);
              }, 1000);
            }, 1000);
          }, 1000);
        }
      }, 1000);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-rose-500" />
          <h3 className="font-semibold text-gray-100">SafetyLink Multichannel Alert Engine</h3>
        </div>
        <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-xs font-medium text-rose-400">Emergency Redundancy</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left config pane */}
        <div className="md:col-span-5 space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Emergency Severity & Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Medical', 'Security', 'Fire'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setEmergencyType(type)}
                  className={`py-2 rounded border text-xs font-bold transition ${
                    emergencyType === type
                      ? "bg-rose-950/20 border-rose-500/50 text-rose-300"
                      : "bg-gray-900/50 border-gray-800 text-gray-400 hover:border-gray-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Network status toggler */}
          <div className="p-4 bg-gray-950/40 rounded-lg border border-gray-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-300 block">Simulate Grid Integrity</span>
              <span className="text-[10px] text-gray-500">Force load shedding communication failure</span>
            </div>
            <button
              onClick={() => setIsOffline(!isOffline)}
              className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition ${
                isOffline ? "bg-amber-600/20 border border-amber-500/40 text-amber-300" : "bg-emerald-600/20 border border-emerald-500/40 text-emerald-300"
              }`}
            >
              <WifiOff className="h-3.5 w-3.5" />
              {isOffline ? "Load Shedding Mode" : "Normal Grid Online"}
            </button>
          </div>

          <button
            onClick={triggerAlert}
            disabled={isSimulating}
            className="w-full bg-rose-600 hover:bg-rose-500 disabled:bg-rose-900 text-white font-bold py-3 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition animate-pulse"
          >
            <ShieldAlert className="h-5 w-5" />
            TRIGGER EMERGENCY PANIC
          </button>
        </div>

        {/* Real-time incident console */}
        <div className="md:col-span-7 space-y-4">
          <div className="p-4 bg-gray-950/50 rounded-lg border border-gray-800 min-h-[220px] flex flex-col justify-between">
            {activeAlert ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-gray-900">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-rose-400">INCIDENT ID: #{activeAlert.id}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                      activeAlert.status === 'Acknowledged' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>{activeAlert.status}</span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-500">{activeAlert.timestamp}</span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                  <div className={`p-1.5 rounded border ${activeAlert.channels.sms === 'sent' ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' : 'bg-gray-900 border-gray-800 text-gray-500'}`}>
                    <span className="block text-[8px] uppercase font-semibold">SMS</span>
                    <span>{activeAlert.channels.sms.toUpperCase()}</span>
                  </div>
                  <div className={`p-1.5 rounded border ${activeAlert.channels.whatsapp === 'delivered' ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' : 'bg-gray-900 border-gray-800 text-gray-500'}`}>
                    <span className="block text-[8px] uppercase font-semibold">WhatsApp</span>
                    <span>{activeAlert.channels.whatsapp.toUpperCase()}</span>
                  </div>
                  <div className={`p-1.5 rounded border ${activeAlert.channels.voice === 'completed' ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' : activeAlert.channels.voice === 'sent' ? 'bg-amber-950/20 border-amber-500/40 text-amber-300' : 'bg-gray-900 border-gray-800 text-gray-500'}`}>
                    <span className="block text-[8px] uppercase font-semibold">Voice Call</span>
                    <span>{activeAlert.channels.voice.toUpperCase()}</span>
                  </div>
                  <div className={`p-1.5 rounded border ${activeAlert.channels.mesh === 'delivered' ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' : 'bg-gray-900 border-gray-800 text-gray-500'}`}>
                    <span className="block text-[8px] uppercase font-semibold">BLE Mesh</span>
                    <span>{activeAlert.hops ? `${activeAlert.hops} HOPS` : activeAlert.channels.mesh.toUpperCase()}</span>
                  </div>
                </div>

                {/* Audit trail feed */}
                <div className="space-y-1.5 max-h-[120px] overflow-y-auto bg-gray-950 p-2.5 rounded border border-gray-900 font-mono text-[9px] text-gray-300 leading-normal">
                  {activeAlert.logs.map((log, i) => (
                    <p key={i} className={log.includes("Status:") || log.includes("ANSWERED") ? "text-emerald-400 font-bold" : ""}>
                      {log}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500 space-y-2">
                <ShieldAlert className="h-8 w-8 opacity-40 text-rose-500" />
                <div>
                  <p className="text-xs font-bold text-gray-300">Operational Safety Console Idle</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Configure parameters on the left and trigger a simulated crisis signal.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. SA MEMORY (KNOWLEDGE GRAPH)
// ==========================================
function KnowledgeGraphSimulator() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("1");
  const activeNode = KNOWLEDGE_GRAPH_DATA.nodes.find(n => n.id === selectedNodeId)!;

  const connectedLinks = KNOWLEDGE_GRAPH_DATA.links.filter(
    l => l.source === selectedNodeId || l.target === selectedNodeId
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-sky-400" />
          <h3 className="font-semibold text-gray-100">SA Memory (Provenance Knowledge Graph)</h3>
        </div>
        <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-xs font-medium text-sky-400">Provenance Registry</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Graphical Representation Box */}
        <div className="lg:col-span-7 bg-gray-950/60 p-4 rounded-lg border border-gray-800 flex flex-col justify-between min-h-[280px]">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-4">Interactive Topology</span>
            <div className="flex flex-wrap justify-center gap-3">
              {KNOWLEDGE_GRAPH_DATA.nodes.map((node) => {
                const isSelected = node.id === selectedNodeId;
                const isConnected = connectedLinks.some(
                  l => l.source === node.id || l.target === node.id
                );

                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition flex items-center gap-1.5 border ${
                      isSelected
                        ? "bg-sky-500 text-gray-950 border-sky-400 font-bold"
                        : isConnected
                          ? "bg-sky-950/20 border-sky-900 text-sky-300"
                          : "bg-gray-900/50 border-gray-800 text-gray-400 hover:border-gray-700"
                    }`}
                  >
                    <span className="text-[10px] leading-none opacity-80">
                      {node.type === 'document' ? '📄' : node.type === 'regulation' ? '⚖️' : node.type === 'person' ? '👤' : '💡'}
                    </span>
                    {node.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-gray-900 text-[10px] text-gray-500 flex justify-between items-center">
            <span>💡 Click nodes to trace knowledge connections & legal source codes.</span>
            <span className="font-mono text-sky-500">Neo4j Local Instance</span>
          </div>
        </div>

        {/* Metadata Inspector Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 bg-gray-950/40 rounded-lg border border-gray-800 space-y-3">
            <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">Provenance Inspector</span>
            
            <div className="space-y-1">
              <span className="text-[9px] text-gray-500 uppercase block">Selected Entity</span>
              <span className="text-sm font-semibold text-gray-100">{activeNode.label}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] text-gray-500 uppercase block">Category Type</span>
              <span className="text-xs font-semibold text-sky-300 capitalize bg-sky-950/20 border border-sky-900 px-2 py-0.5 rounded-full inline-block">
                {activeNode.type}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] text-gray-500 uppercase block">Source Document Provenance</span>
              <p className="text-xs text-gray-400 italic bg-gray-950 p-2 rounded border border-gray-900 leading-normal font-mono">
                {activeNode.provenance}
              </p>
            </div>
          </div>

          {/* Connected Relations */}
          <div className="p-3 bg-gray-950/40 rounded-lg border border-gray-800 space-y-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Connected Relationships</span>
            <div className="space-y-1.5 max-h-[100px] overflow-y-auto">
              {connectedLinks.map((link, i) => {
                const isSource = link.source === selectedNodeId;
                const sourceNode = KNOWLEDGE_GRAPH_DATA.nodes.find(n => n.id === link.source)!;
                const targetNode = KNOWLEDGE_GRAPH_DATA.nodes.find(n => n.id === link.target)!;
                return (
                  <div key={i} className="flex items-center justify-between text-xs bg-gray-900/60 p-2 rounded border border-gray-800/50">
                    <span className="font-bold text-gray-300 truncate max-w-[120px]">{sourceNode.label}</span>
                    <span className="text-[10px] font-mono text-sky-400 font-semibold px-2 border border-sky-950 bg-sky-950/10 rounded-full">{link.relationship}</span>
                    <span className="font-bold text-gray-300 truncate max-w-[120px]">{targetNode.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. HYPER-LOCAL DATA SOURCES
// ==========================================
interface LocalFeed {
  id: string;
  source: string;
  time: string;
  category: 'Telemetry' | 'Weather' | 'Civic' | 'Alert';
  message: string;
  status: 'active' | 'processed';
  score: number;
}

function HyperlocalDataSimulator() {
  const [feeds, setFeeds] = useState<LocalFeed[]>([
    { id: "F1", source: "SA Weather Service (SAWS)", time: "13:10", category: "Weather", message: "Level 4 Sever Thunderstorm warning declared for Gauteng Province.", status: "active", score: 98 },
    { id: "F2", source: "Eskom load_shedding Core", time: "12:45", category: "Telemetry", message: "Stage 4 load shedding load reduction initialized in Zone 12.", status: "processed", score: 100 },
    { id: "F3", source: "Gauteng CPF CPF_3", time: "11:30", category: "Alert", message: "Suspicious vehicle reported casing around Republic Road.", status: "processed", score: 75 }
  ]);
  const [customNotice, setCustomNotice] = useState("");
  const [isIngesting, setIsIngesting] = useState(false);

  const handleIngestNotice = () => {
    if (!customNotice.trim()) return;
    setIsIngesting(true);
    
    setTimeout(() => {
      const newFeed: LocalFeed = {
        id: "F" + (feeds.length + 1),
        source: "User Ad-hoc Ingest Node",
        time: new Date().toLocaleTimeString().substring(0, 5),
        category: "Civic",
        message: customNotice,
        status: "active",
        score: 85
      };
      setFeeds([newFeed, ...feeds]);
      setCustomNotice("");
      setIsIngesting(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-rose-400" />
          <h3 className="font-semibold text-gray-100">Hyper-Local Telemetry Ingestion Panel</h3>
        </div>
        <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-xs font-medium text-rose-400">Ground Feeds</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Ad-hoc feed ingester */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 bg-gray-950/40 rounded-lg border border-gray-800 space-y-3">
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">Ingest Municipal/Community Notice</span>
            <p className="text-[10px] text-gray-500 leading-normal">
              Convert raw community messages or PDF alerts into clean vector search segments.
            </p>
            <textarea
              rows={3}
              value={customNotice}
              onChange={(e) => setCustomNotice(e.target.value)}
              placeholder="E.g., Rand Water announces emergency water shutdown in Melville on Thursday from 8 AM."
              className="w-full text-xs bg-gray-950 border border-gray-800 rounded-lg p-2 text-gray-100 focus:outline-none focus:border-rose-500"
            />
            <button
              onClick={handleIngestNotice}
              disabled={isIngesting || !customNotice.trim()}
              className="w-full bg-rose-500 hover:bg-rose-400 disabled:bg-rose-900 text-gray-950 font-semibold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 transition"
            >
              <RefreshCw className={`h-3 w-3 ${isIngesting ? 'animate-spin' : ''}`} />
              Parse & Structurize Notice
            </button>
          </div>

          <div className="p-3 bg-gray-950/40 rounded-lg border border-gray-800 space-y-1 text-[10px] text-gray-400">
            <span className="font-bold text-gray-300 block">Active Telemetry Connectors</span>
            <div className="flex justify-between items-center border-b border-gray-900 py-1">
              <span>Eskom load_shedding MQTT Broker</span>
              <span className="text-emerald-400 font-mono">● Active</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-900 py-1">
              <span>SAWS Warning RSS Feed</span>
              <span className="text-emerald-400 font-mono">● Active</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span>Municipal Ward CPF Broadcasts</span>
              <span className="text-emerald-400 font-mono">● Active</span>
            </div>
          </div>
        </div>

        {/* Dynamic feeds observer */}
        <div className="lg:col-span-7 space-y-3">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Ingested Telemetry Streams</span>
          <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
            {feeds.map((f) => (
              <div key={f.id} className="p-3 bg-gray-950/50 rounded-lg border border-gray-800 hover:border-gray-700/60 transition flex flex-col justify-between gap-1">
                <div className="flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="text-rose-400 font-bold">{f.id}</span>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-300 font-bold">{f.source}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 font-mono">{f.time}</span>
                    <span className="text-emerald-400 font-mono font-semibold">Q-Score: {f.score}%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-200 leading-normal font-medium mt-0.5">"{f.message}"</p>
                <div className="flex justify-end gap-1.5 mt-1.5 pt-1.5 border-t border-gray-900 text-[9px] uppercase font-bold text-rose-300/80">
                  <span>Category: {f.category}</span>
                  <span>•</span>
                  <span>Indexed Offline</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. AGENT SYSTEM (ORCHESTRATION)
// ==========================================
function AgentSimulator() {
  const [agents, setAgents] = useState<Agent[]>([
    { id: "A1", name: "Kasi-Document Ingestion", role: "Document Processor", status: "idle", currentAction: "Waiting for task...", tokensUsed: 0 },
    { id: "A2", name: "Zulu-Translator Bot", role: "Language Translator", status: "idle", currentAction: "Waiting for task...", tokensUsed: 0 },
    { id: "A3", name: "SafetyLink Escalator Node", role: "Safety Escalator", status: "idle", currentAction: "Waiting for task...", tokensUsed: 0 },
    { id: "A4", name: "Sovereign Compliance Guard", role: "Compliance Auditor", status: "idle", currentAction: "Waiting for task...", tokensUsed: 0 }
  ]);
  const [task, setTask] = useState("Ingest municipality emergency water guidelines, audit details for privacy, and translate alerts into isiZulu.");
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [totalTokens, setTotalTokens] = useState(0);

  const startOrchestration = () => {
    setIsRunning(true);
    setLogs([]);
    setTotalTokens(0);

    // Reset agents to idle
    setAgents(prev => prev.map(a => ({ ...a, status: 'idle', currentAction: 'Queued', tokensUsed: 0 })));

    const writeLog = (msg: string) => {
      setLogs(prev => [...prev, `${new Date().toLocaleTimeString()} - ${msg}`]);
    };

    setTimeout(() => {
      writeLog("Orchestration initialized. Ingesting Task: " + task);
      
      // Agent 1 works
      setAgents(prev => prev.map(a => a.id === 'A1' ? { ...a, status: 'working', currentAction: 'Analyzing water guidelines.pdf', tokensUsed: 420 } : a));
      setTotalTokens(420);
      writeLog("Document Processor Agent assigned to 'water guidelines.pdf'. Extracting paragraphs.");

      setTimeout(() => {
        setAgents(prev => prev.map(a => a.id === 'A1' ? { ...a, status: 'completed', currentAction: 'Extracted 12 sections' } : a));
        writeLog("Document Processor finished extracting. Passing context to Compliance Auditor.");

        // Agent 4 works
        setAgents(prev => prev.map(a => a.id === 'A4' ? { ...a, status: 'working', currentAction: 'Auditing data for POPIA compliance', tokensUsed: 310 } : a));
        setTotalTokens(prev => prev + 310);
        writeLog("Compliance Auditor scrubbing metadata. Checking for PII leaks.");

        setTimeout(() => {
          setAgents(prev => prev.map(a => a.id === 'A4' ? { ...a, status: 'completed', currentAction: 'Passed security parameters' } : a));
          writeLog("Compliance Auditor verified text: 100% POPIA clean. Forwarding to Translator & Safety Escalator.");

          // Agent 2 & 3 work in parallel
          setAgents(prev => prev.map(a => {
            if (a.id === 'A2') return { ...a, status: 'working', currentAction: 'Translating warnings to isiZulu', tokensUsed: 650 };
            if (a.id === 'A3') return { ...a, status: 'working', currentAction: 'Evaluating safety threshold', tokensUsed: 220 };
            return a;
          }));
          setTotalTokens(prev => prev + 870);
          writeLog("Language Translator generating Zulu corpus. Safety Escalator scanning text for emergency alert criteria.");

          setTimeout(() => {
            setAgents(prev => prev.map(a => {
              if (a.id === 'A2') return { ...a, status: 'completed', currentAction: 'Translation complete' };
              if (a.id === 'A3') return { ...a, status: 'completed', currentAction: 'Evaluated: alert trigger not required' };
              return a;
            }));
            writeLog("Translator successfully outputted translated asset: 'Imikhombandlela Yamanzi Yesimo Esiphuthumayo'.");
            writeLog("Orchestration workflow completed successfully.");
            setIsRunning(false);
          }, 1200);
        }, 1200);
      }, 1200);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-teal-400" />
          <h3 className="font-semibold text-gray-100">K'LEVA Multi-Agent Orchestrator</h3>
        </div>
        <span className="rounded-full bg-teal-500/10 px-2 py-0.5 text-xs font-medium text-teal-400">Autonomous sandbox</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Agents monitor */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Agent Registry Status</span>
          <div className="space-y-2">
            {agents.map((a) => (
              <div key={a.id} className="p-3 bg-gray-950/40 rounded-lg border border-gray-800 flex justify-between items-center gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold text-teal-400">{a.id}</span>
                    <span className="text-xs font-bold text-gray-200 truncate">{a.name}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 font-medium">{a.role}</p>
                  <p className="text-[9px] text-gray-400 italic truncate mt-1">↳ {a.currentAction}</p>
                </div>

                <div className="text-right flex flex-col items-end gap-1 justify-between h-full">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold ${
                    a.status === 'working' ? 'bg-amber-500/10 text-amber-400 animate-pulse' :
                    a.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
                    'bg-gray-800 text-gray-500'
                  }`}>{a.status}</span>
                  {a.tokensUsed > 0 && (
                    <span className="text-[9px] font-mono text-gray-500">{a.tokensUsed} tkn</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Console */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Multi-Agent Task Dispatcher</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="flex-1 text-xs bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-gray-100 focus:outline-none focus:border-teal-500"
              />
              <button
                onClick={startOrchestration}
                disabled={isRunning}
                className="bg-teal-500 hover:bg-teal-400 disabled:bg-teal-800 text-gray-950 font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-1 transition"
              >
                <RefreshCw className={`h-3 w-3 ${isRunning ? 'animate-spin' : ''}`} />
                Orchestrate
              </button>
            </div>
          </div>

          <div className="p-4 bg-gray-950/50 rounded-lg border border-gray-800 min-h-[180px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-1.5 border-b border-gray-900 mb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Sandbox Collaboration Logs</span>
                <span className="text-[9px] font-mono text-gray-500">Total Incurred: {totalTokens} tokens</span>
              </div>

              {logs.length > 0 ? (
                <div className="space-y-1 max-h-[120px] overflow-y-auto font-mono text-[9px] text-gray-300 leading-normal">
                  {logs.map((log, i) => (
                    <p key={i} className={log.includes("completed successfully") ? "text-emerald-400 font-bold" : ""}>
                      {log}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-600 text-[10px] italic">
                  Dispatch task to watch local agents collaborate.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 8. OFFLINE MODE (EDGE DEPLOYMENT & MESH RELAY)
// ==========================================
interface MeshNode {
  name: string;
  type: string;
  battery: number;
  active: boolean;
}

function OfflineMeshSimulator() {
  const [offlineState, setOfflineState] = useState(true);
  const [meshNodes, setMeshNodes] = useState<MeshNode[]>([
    { name: "Sender Mobile Edge", type: "Mobile Node", battery: 84, active: true },
    { name: "Nomsa Phone Gateway", type: "Peer Node", battery: 67, active: true },
    { name: "CPF Gatehouse Hub", type: "Static Relay", battery: 98, active: true },
    { name: "Satellite Mesh Ingress", type: "Gateway", battery: 100, active: true }
  ]);
  const [hopIndex, setHopIndex] = useState(-1);
  const [isHopping, setIsHopping] = useState(false);

  const addNode = () => {
    const names = ["Street_Battery_Unit", "Community_Solar_Router", "Neighbor_Edge_Phone"];
    const name = names[Math.floor(Math.random() * names.length)] + "_" + Math.floor(Math.random() * 90 + 10);
    const newNode: MeshNode = {
      name,
      type: "Relay Node",
      battery: Math.floor(Math.random() * 40 + 60),
      active: true
    };
    // Insert before Gateway
    const list = [...meshNodes];
    list.splice(list.length - 1, 0, newNode);
    setMeshNodes(list);
  };

  const runHopSim = () => {
    setIsHopping(true);
    setHopIndex(0);

    const runNext = (curr: number) => {
      if (curr >= meshNodes.length) {
        setIsHopping(false);
        return;
      }
      setHopIndex(curr);
      setTimeout(() => {
        runNext(curr + 1);
      }, 1000);
    };

    runNext(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2">
          <WifiOff className="h-5 w-5 text-orange-400" />
          <h3 className="font-semibold text-gray-100">Offline mode & BLE Mesh Relay Playground</h3>
        </div>
        <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-xs font-medium text-orange-400">Edge deployment</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* State and control panel */}
        <div className="md:col-span-4 space-y-4">
          <div className="p-4 bg-gray-950/40 rounded-lg border border-gray-800 space-y-3">
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider block">Edge Connectivity State</span>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-300">Device Status</span>
              <span className={`text-xs font-bold uppercase ${offlineState ? 'text-orange-400' : 'text-emerald-400'}`}>
                {offlineState ? "Offline / Grid Outage" : "Online / Cloud Sync"}
              </span>
            </div>
            <button
              onClick={() => setOfflineState(!offlineState)}
              className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 text-xs font-bold py-2 rounded transition"
            >
              Toggle Device Online/Offline
            </button>
          </div>

          <div className="space-y-2">
            <button
              onClick={addNode}
              disabled={isHopping}
              className="w-full bg-orange-600 hover:bg-orange-500 disabled:bg-orange-900 text-gray-950 font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 transition"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Local BLE Relay Node
            </button>
            <button
              onClick={runHopSim}
              disabled={isHopping}
              className="w-full border border-orange-500/40 bg-orange-950/10 text-orange-400 hover:bg-orange-950/30 disabled:border-gray-800 disabled:text-gray-500 font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 transition"
            >
              <Play className="h-3.5 w-3.5" />
              Simulate BLE Packet Hopping
            </button>
          </div>
        </div>

        {/* Packet routing simulator */}
        <div className="md:col-span-8 bg-gray-950/50 p-4 rounded-lg border border-gray-800 flex flex-col justify-between min-h-[220px]">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-4">BLE Mesh Topology (Simulated)</span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {meshNodes.map((node, idx) => {
                const isActiveHop = hopIndex === idx;
                const isPassedHop = hopIndex > idx;

                return (
                  <React.Fragment key={idx}>
                    <div className={`p-2.5 rounded-lg border text-center transition-all duration-300 ${
                      isActiveHop 
                        ? "bg-orange-500 text-gray-950 border-orange-400 font-bold scale-105 shadow-[0_0_15px_rgba(249,115,22,0.3)]" 
                        : isPassedHop 
                          ? "bg-orange-950/20 border-orange-900 text-orange-400" 
                          : "bg-gray-900/50 border-gray-800 text-gray-400"
                    }`}>
                      <p className="text-[10px] font-semibold">{node.name}</p>
                      <div className="flex justify-between items-center text-[8px] mt-1 opacity-80">
                        <span>{node.type}</span>
                        <span>🔋 {node.battery}%</span>
                      </div>
                    </div>
                    {idx < meshNodes.length - 1 && (
                      <ArrowRight className={`h-4 w-4 transition duration-300 ${
                        idx === hopIndex ? "text-orange-400 animate-pulse scale-125" : isPassedHop ? "text-orange-900" : "text-gray-800"
                      }`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-gray-900 text-[10px] text-gray-500 flex justify-between items-center">
            <span>
              {isHopping ? `Packet hopping at hop ${hopIndex + 1}...` : "Topology idle. Trigger hopping to watch peer-to-peer data relaying."}
            </span>
            <span className="font-mono text-orange-500">P2P BLE Mesh Protocol</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 9. SOUTH AFRICAN SEARCH ENGINE
// ==========================================
interface SearchResult {
  title: string;
  url: string;
  relevance: number;
  provenance: string;
  summary: string;
}

function SearchEngineSimulator() {
  const [query, setQuery] = useState("load shedding schedules");
  const [weights, setWeights] = useState({ local: 8, provenance: 7, recency: 5 });
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = () => {
    setIsSearching(true);
    setResults([]);

    setTimeout(() => {
      setIsSearching(false);
      const corpus: SearchResult[] = [
        {
          title: "Soweto Zone 7 Scheduled Load Shedding reduction parameters",
          url: "https://www.joburg.gov.za/notices/loadshedding-zone7",
          relevance: 95,
          provenance: "City of Johannesburg Ward Portal",
          summary: "Official ward bulletin outlining electrical demand reduction calendars and safety coordinates for transformer clusters."
        },
        {
          title: "Constitution Hill South Africa Educational Resources",
          url: "https://www.constitutionhill.org.za/education-archives",
          relevance: 72,
          provenance: "Constitutional Trust Archive",
          summary: "Linguistic and historical reference materials explaining Chapter 2 rights and indigenous development frameworks."
        },
        {
          title: "Sovereign AI development in developing economies",
          url: "https://www.up.ac.za/research/sovereign-ai-paper",
          relevance: 84,
          provenance: "University of Pretoria Repository",
          summary: "Academic analysis mapping local deployment cost savings, data governance models under POPIA, and indigenous language training."
        }
      ];

      // Re-rank based on mock weights calculation
      const ranked = corpus.map((r) => {
        let score = r.relevance;
        if (r.provenance.includes("Government") || r.provenance.includes("City")) {
          score += weights.provenance * 1.5;
        }
        if (r.title.includes(query) || r.summary.includes(query)) {
          score += weights.local * 2;
        }
        return { ...r, score };
      }).sort((a, b) => b.score - a.score);

      setResults(ranked);
    }, 400);
  };

  useEffect(() => {
    performSearch();
  }, [weights]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-cyan-400" />
          <h3 className="font-semibold text-gray-100">South African Search Engine Ranker</h3>
        </div>
        <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-xs font-medium text-cyan-400">Sovereign crawler</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left weights panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Search Query</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 text-xs bg-gray-950 border border-gray-800 rounded-lg px-3 py-1.5 text-gray-100 focus:outline-none"
              />
              <button
                onClick={performSearch}
                className="bg-cyan-500 hover:bg-cyan-400 text-gray-950 px-3 py-1 text-xs font-semibold rounded-lg transition"
              >
                Search
              </button>
            </div>
          </div>

          <div className="p-4 bg-gray-950/40 rounded-lg border border-gray-800 space-y-4">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">Custom Rank Scorer Weights</span>
            
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-gray-400">Local Relevance Weight</span>
                <span className="text-cyan-300 font-bold">{weights.local}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={weights.local}
                onChange={(e) => setWeights({ ...weights, local: parseInt(e.target.value) })}
                className="w-full accent-cyan-400 h-1 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-gray-400">Provenance / Trust Rank</span>
                <span className="text-cyan-300 font-bold">{weights.provenance}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={weights.provenance}
                onChange={(e) => setWeights({ ...weights, provenance: parseInt(e.target.value) })}
                className="w-full accent-cyan-400 h-1 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="lg:col-span-7 space-y-3">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Ranked Index Matches</span>

          {isSearching ? (
            <div className="space-y-2">
              <div className="h-16 bg-gray-950 border border-gray-900 rounded-lg animate-pulse"></div>
              <div className="h-16 bg-gray-950 border border-gray-900 rounded-lg animate-pulse"></div>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[240px] overflow-y-auto pr-1">
              {results.map((res, i) => (
                <div key={i} className="p-3 bg-gray-950/50 rounded-lg border border-gray-800 flex flex-col justify-between gap-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-cyan-300 font-bold hover:underline cursor-pointer truncate max-w-[220px]">{res.title}</span>
                    <span className="font-mono text-emerald-400 font-bold text-[9px] bg-emerald-950/10 border border-emerald-950 px-2 py-0.5 rounded-full">
                      Rank-Score: {res.score}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 italic font-mono mt-0.5">{res.url}</p>
                  <p className="text-xs text-gray-300 leading-relaxed mt-1">"{res.summary}"</p>
                  <div className="flex items-center gap-1.5 mt-2 text-[9px] text-gray-500">
                    <span className="font-semibold text-cyan-400 uppercase">Provenance:</span>
                    <span className="italic">{res.provenance}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 10. LONG-TERM MODEL STRATEGY
// ==========================================
function ModelStrategySimulator() {
  const [modelVersion, setModelVersion] = useState("Llama-3.2-3B-Kasi-v1.1");
  const [epoch, setEpoch] = useState(0);
  const [loss, setLoss] = useState<number[]>([]);
  const [isTraining, setIsTraining] = useState(false);

  const startTrainingSim = () => {
    setIsTraining(true);
    setEpoch(0);
    setLoss([]);

    let count = 1;
    const interval = setInterval(() => {
      setEpoch(count);
      setLoss(prev => [...prev, parseFloat((3.8 - count * 0.45 + Math.random() * 0.15).toFixed(3))]);
      
      if (count >= 6) {
        clearInterval(interval);
        setIsTraining(false);
      }
      count++;
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-amber-500" />
          <h3 className="font-semibold text-gray-100">Sovereign Model Lifecycle & Continual Learning</h3>
        </div>
        <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-500">Model strategy</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Model configurations */}
        <div className="md:col-span-5 space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Base Model</label>
            <select
              value={modelVersion}
              onChange={(e) => setModelVersion(e.target.value)}
              className="w-full text-xs bg-gray-950 border border-gray-800 rounded-lg p-2 text-gray-100 focus:outline-none"
            >
              <option value="Llama-3.2-3B-Kasi-v1.1">Llama 3.2 3B (Soweto-Tuned)</option>
              <option value="Ollama-Zulu-Lg-v2.0">Ollama Zulu Long-context v2</option>
              <option value="NLLB-200-African-Langs-v3">NLLB-200 African Translation v3</option>
            </select>
          </div>

          <div className="p-4 bg-gray-950/40 rounded-lg border border-gray-800 space-y-3">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Synthetic Dialect Generator</span>
            <p className="text-[10px] text-gray-500 leading-normal">
              Fine-tune the model against simulated multi-lingual dialogs to increase bilingual code-switching accuracy.
            </p>
            <button
              onClick={startTrainingSim}
              disabled={isTraining}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-amber-800 text-gray-950 font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 transition"
            >
              <RefreshCw className={`h-3 w-3 ${isTraining ? 'animate-spin' : ''}`} />
              Run Sovereign Fine-Tuning
            </button>
          </div>
        </div>

        {/* Training stats / logs */}
        <div className="md:col-span-7 bg-gray-950/50 p-4 rounded-lg border border-gray-800 flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="flex items-center justify-between pb-1.5 border-b border-gray-900 mb-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Continual Learning Training Logs</span>
              <span className="text-[9px] font-mono text-gray-500">Epoch: {epoch}/6</span>
            </div>

            {epoch > 0 ? (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-gray-500 uppercase text-[9px] block">Training Loss</span>
                    <span className="text-amber-400 font-bold">{loss[loss.length - 1] || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 uppercase text-[9px] block">Model Perplexity</span>
                    <span className="text-emerald-400 font-bold">{(8.2 - epoch * 0.15).toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-1 mt-4">
                  <span className="text-[9px] font-semibold text-gray-500 uppercase block">Convergence Trend</span>
                  <div className="flex items-end gap-1.5 h-16 bg-gray-950 p-2 rounded border border-gray-900">
                    {loss.map((l, i) => {
                      const h = Math.max(5, (l / 3.8) * 100);
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <span className="text-[8px] font-mono text-gray-500">{l}</span>
                          <div className="w-full bg-amber-500/80 rounded-t transition-all duration-300" style={{ height: `${h}%`, minHeight: '6px' }}></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-gray-600 text-[10px] italic">
                Trigger fine-tuning to run mock synthetic weight training and loss calculation.
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-gray-900 text-[10px] text-gray-500 flex justify-between items-center">
            <span>
              {isTraining ? "Training epochs processing in local Sandbox..." : "Training lifecycle idle."}
            </span>
            <span className="font-mono text-amber-500">Local Weight-Training</span>
          </div>
        </div>
      </div>
    </div>
  );
}
