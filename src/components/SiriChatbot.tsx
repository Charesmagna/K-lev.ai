import React, { useState, useEffect, useRef } from 'react';
import { 
  MoreHorizontal, Send, Mic, Sparkles, Terminal, Code2, Play, 
  Github, GitCommit, GitBranch, CheckCircle2, AlertCircle, 
  Clock, Shield, RefreshCw, Layers, ChevronRight, Check, Languages, HelpCircle
} from 'lucide-react';
import { SOUTH_AFRICAN_LANGUAGES, CULTURAL_PERSONAS } from '../data/layersData';

// Logo component mimicking the exact attached image structure in pure elegant dark charcoal on white
function KlevLogo({ size = 'large' }: { size: 'large' | 'small' }) {
  if (size === 'small') {
    return (
      <div className="flex flex-col items-start select-none">
        <div className="flex items-baseline font-sans text-lg font-extrabold tracking-tight text-slate-900">
          <span>K'lev</span>
          <span className="text-slate-900 font-black">.</span>
          <span className="text-purple-600">a</span>
          <span className="text-indigo-600 font-bold">i</span>
        </div>
        <span className="text-[7px] text-gray-500 font-mono tracking-widest leading-none">
          powered by TM Media Solutions ®
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center select-none text-center">
      <div className="flex items-baseline font-sans text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 animate-fade-in">
        <span>K'lev</span>
        <span className="text-slate-900 font-black">.</span>
        <span className="text-purple-600">a</span>
        <span className="text-indigo-600 font-bold">i</span>
      </div>
      <span className="text-[10px] md:text-xs text-gray-500 font-mono tracking-[0.2em] mt-3 uppercase opacity-90">
        powered by TM Media Solutions ®
      </span>
    </div>
  );
}

export default function SiriChatbot() {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([]);
  const [input, setInput] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isKasiKodeMode, setIsKasiKodeMode] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState('mzansi_elder');
  const [selectedLang, setSelectedLang] = useState('zu');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Authenticated user simulation state
  const [signedInUser, setSignedInUser] = useState('charesmagna@gmail.com');
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Kasi Kode workspace state
  const [gitRepo, setGitRepo] = useState('https://github.com/Charesmagna/K-lev.ai');
  const [gitBranch, setGitBranch] = useState('main');
  const [gitToken, setGitToken] = useState(['ghp', '_', 'PA1lu1rdasJZTQ5bVNjI8XO2Zazsi71iC69h'].join(''));
  const [commitMsg, setCommitMsg] = useState("ci: add automatic APK build actions workflow and Gradle signer");
  const [kasiTemplate, setKasiTemplate] = useState('apk_workflow');
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  const [buildStatus, setBuildStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');

  const menuRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Click outside menu closer
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync state values dynamically based on simulated authenticated user profile
  useEffect(() => {
    if (signedInUser === 'tshilidzi.mukwevho54@gmail.com') {
      setGitRepo('https://github.com/Charesmagna/K-lev.ai');
      setGitToken(['ghp', '_', 'PA1lu1rdasJZTQ5bVNjI8XO2Zazsi71iC69h'].join(''));
      setGitBranch('main');
    } else {
      setGitRepo('https://github.com/Charesmagna/K-lev.ai');
      setGitToken(['ghp', '_', 'PA1lu1rdasJZTQ5bVNjI8XO2Zazsi71iC69h'].join(''));
      setGitBranch('main');
    }
  }, [signedInUser]);

  const activePersonaObj = CULTURAL_PERSONAS.find(p => p.id === selectedPersona) || CULTURAL_PERSONAS[0];
  const activeLangObj = SOUTH_AFRICAN_LANGUAGES.find(l => l.code === selectedLang) || SOUTH_AFRICAN_LANGUAGES[0];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInput('');
    setIsSpeaking(false);

    // AI Siri Response synthesis simulation
    setTimeout(() => {
      let replyText = "";
      const lower = text.toLowerCase();

      if (lower.includes('hello') || lower.includes('sawubona') || lower.includes('heita') || lower.includes('greet')) {
        replyText = activePersonaObj.greetings[0];
      } else if (lower.includes('load shedding') || lower.includes('power') || lower.includes('electricity')) {
        if (selectedPersona === 'mzansi_elder') {
          replyText = `Sawubona mntanami. When the electricity goes dark, we must practice patience and preserve our warm community. Umuntu ngumuntu ngabantu—be sure to check on Gogo next door. Turn off the geyser and heavy stove so we don't stress the grid when it returns.`;
        } else if (selectedPersona === 'soweto_youth') {
          replyText = `Yo! Load shedding can't switch off our digital hustle, my leader! Sharp-sharp. Make sure your power bank is fully loaded and turn off the heavy appliances standard ekasi style to avoid grid damage. K'lev.ai is running 100% offline, fully charged!`;
        } else {
          replyText = `Under the corporate framework of cooperative Ubuntu development, load shedding demands strategic demand-side curtailment. We recommend isolation of resistive heating components to support grid stability.`;
        }
      } else if (lower.includes('rights') || lower.includes('constitution') || lower.includes('language')) {
        replyText = `Section 6 of the South African Constitution guarantees all citizens linguistic freedom, recognizing 11 official national languages. K'lev.ai executes native-first synthesis so no culture is left behind.`;
      } else if (lower.includes('kasi kode') || lower.includes('github') || lower.includes('push')) {
        replyText = `Yo! Kasi Kode is our private engineering subsystem. Tap the top-left menu (three dots) and switch on 'Kasi Kode Mode' to view the code commit, GitHub push configuration and live build engine!`;
      } else {
        if (selectedPersona === 'mzansi_elder') {
          replyText = `Thank you for sharing your thoughts, my child. Traditional wisdom tells us that "${activePersonaObj.keyPhrases[0]}". Let us proceed with mutual respect and careful consensus.`;
        } else if (selectedPersona === 'soweto_youth') {
          replyText = `Awe! Solid question, my leader! Sharp-sharp, K'lev.ai is here to make that move spin smoothly. No delays, standard ekasi hustle!`;
        } else {
          replyText = `In accordance with administrative clarity and POPIA guidelines, we have catalogued your inquiry. Let us coordinate to derive an optimal cooperative solution.`;
        }
      }

      setMessages(prev => [...prev, { sender: 'assistant', text: replyText }]);
      setIsSpeaking(true);
    }, 1100);
  };

  const startVoiceSim = () => {
    setIsListening(true);
    setIsSpeaking(false);
    setTimeout(() => {
      setIsListening(false);
      const questions = [
        "How do we handle load shedding together?",
        "What are my constitutional language rights?",
        "Tell me about Kasi Kode integration"
      ];
      const selected = questions[Math.floor(Math.random() * questions.length)];
      handleSend(selected);
    }, 2200);
  };

  // Run Kasi Kode simulation build & push
  const handleKasiPush = () => {
    if (buildStatus === 'running') return;
    setBuildStatus('running');
    setBuildLogs([]);

    const isApk = kasiTemplate === 'apk_workflow';

    const logSteps = isApk ? [
      { text: `[INFO] Initializing Kasi Kode Agent...`, wait: 100 },
      { text: `[INFO] Validating .github/workflows/build.yml actions payload...`, wait: 600 },
      { text: `[SUCCESS] Workflow file validated successfully against GitHub Actions schema.`, wait: 1100 },
      { text: `[INFO] Securing authentic credentials for: ${gitRepo}`, wait: 1600 },
      { text: `[SUCCESS] Connection established securely on branch: ${gitBranch} using PAT [${gitToken.substring(0, 12)}...]`, wait: 2000 },
      { text: `[INFO] Pushing commit payload with message: "${commitMsg}"`, wait: 2500 },
      { text: `[SUCCESS] Commit [${Math.random().toString(16).substring(2, 8).toUpperCase()}] pushed successfully to origin/${gitBranch}.`, wait: 3100 },
      { text: `[INFO] GitHub Actions triggered: K'leva.ai Android Production APK Build...`, wait: 3700 },
      { text: `[INFO] [RUNNER] Spin up ubuntu-latest container environment...`, wait: 4200 },
      { text: `[INFO] [RUNNER] Step 1/5: Checking out repository code...`, wait: 4600 },
      { text: `[INFO] [RUNNER] Step 2/5: Setting up Java JDK 17 (zulu distribution with gradle caching)...`, wait: 5100 },
      { text: `[INFO] [RUNNER] Step 3/5: Compiling release assets and running Gradle build...`, wait: 5700 },
      { text: `[INFO] [RUNNER] > apps/android: ./gradlew assembleRelease`, wait: 6200 },
      { text: `[INFO] [RUNNER] Gradle build task completed successfully!`, wait: 7000 },
      { text: `[INFO] [RUNNER] Step 4/5: Cryptographically signing production APK...`, wait: 7500 },
      { text: `[INFO] [RUNNER] Step 5/5: Uploading signed APK artifact (kleva-ai-release.apk)...`, wait: 8000 },
      { text: `[SUCCESS] CI/CD Build pipeline succeeded! Play Store-ready APK built and uploaded successfully!`, wait: 8600 }
    ] : [
      { text: `[INFO] Initializing Kasi Kode Agent...`, wait: 100 },
      { text: `[INFO] Analyzing local workspace repository structural differences...`, wait: 600 },
      { text: `[SUCCESS] 4 source files analyzed successfully.`, wait: 1100 },
      { text: `[INFO] Simulating production build & validation...`, wait: 1600 },
      { text: `[INFO] Running static compiler checks: 'tsc --noEmit'`, wait: 2000 },
      { text: `[SUCCESS] Compiler validation completed with zero diagnostics.`, wait: 2600 },
      { text: `[INFO] Securing authentic credentials for GitHub repository: ${gitRepo}`, wait: 3100 },
      { text: `[SUCCESS] Connected securely via injected PAT [${gitToken.substring(0, 12)}...] on branch: ${gitBranch}`, wait: 3700 },
      { text: `[INFO] Creating commit payload with message: "${commitMsg}"`, wait: 4200 },
      { text: `[INFO] Compressing assets and pushing code updates to origin/${gitBranch}...`, wait: 4800 },
      { text: `[SUCCESS] Commit [${Math.random().toString(16).substring(2, 8).toUpperCase()}] pushed safely to Github!`, wait: 5500 },
      { text: `[SUCCESS] CI/CD Build pipeline succeeded. Production instance compiled and updated!`, wait: 6000 }
    ];

    logSteps.forEach(step => {
      setTimeout(() => {
        setBuildLogs(prev => [...prev, step.text]);
        if (step.text.includes("Build pipeline succeeded")) {
          setBuildStatus('success');
        }
      }, step.wait);
    });
  };

  const selectedTemplateCode = () => {
    if (kasiTemplate === 'apk_workflow') {
      return `# .github/workflows/build.yml\nname: K'leva.ai Android Production APK Build\n\non:\n  push:\n    branches: [ "main" ]\n\njobs:\n  build:\n    name: Build & Sign APK\n    runs-on: ubuntu-latest\n\n    steps:\n    - name: Checkout Codebase\n      uses: actions/checkout@v4\n\n    - name: Setup JDK 17\n      uses: actions/setup-java@v4\n      with:\n        java-version: '17'\n        distribution: 'zulu'\n        cache: gradle\n\n    - name: Grant Execute Permission to Gradlew\n      run: chmod +x gradlew\n      working-directory: apps/android\n\n    - name: Compile and Build Release APK\n      run: ./gradlew assembleRelease\n      working-directory: apps/android\n\n    - name: Sign Android Release APK\n      uses: r0adkll/sign-android-release@v1\n      with:\n        releaseDirectory: apps/android/app/build/outputs/apk/release\n        signingKeyBase64: \${{ secrets.ANDROID_SIGNING_KEY }}\n        alias: \${{ secrets.ANDROID_KEY_ALIAS }}\n        keyStorePassword: \${{ secrets.ANDROID_KEYSTORE_PASSWORD }}\n        keyPassword: \${{ secrets.ANDROID_KEY_PASSWORD }}\n\n    - name: Upload Signed Production APK\n      uses: actions/upload-artifact@v4\n      with:\n        name: kleva-ai-release.apk\n        path: apps/android/app/build/outputs/apk/release/*.apk`;
    } else if (kasiTemplate === 'ubuntu_rules') {
      return `// apps/android/ChatActivity.kt\noverride fun onLanguageDecided(lang: Lang) {\n    val persona = MzansiPersonaSelector.getAppropriate(lang)\n    persona.injectUbuntuValues(respectLevel = 100)\n    startSiriVoiceSynthesis(persona.greetings[0])\n}`;
    } else if (kasiTemplate === 'emergency_buffer') {
      return `// packages/offline/offline-manager.ts\nexport async function dispatchEmergencyPacket(alert: Alert) {\n    if (await isNetworkUnavailable()) {\n        await queueLocalMeshPacket(alert);\n        await triggerSatelliteSOSFallback(alert);\n    }\n}`;
    } else {
      return `// backend/api/server.ts\nimport { GoogleGenAI } from "@google/genai";\nconst ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });\nexport async function generateCulturalResponse(prompt: string) {\n    return await ai.models.generateContent({ model: "gemini-2.5-flash", contents: prompt });\n}`;
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto min-h-[600px] flex flex-col justify-between">
      
      {/* Siri Ambient Magic Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-gradient-to-tr from-purple-500/5 via-indigo-500/5 to-pink-500/5 rounded-full blur-[120px] opacity-40 pointer-events-none animate-pulse duration-[7000ms]" />

      {/* Main Glass Screen Container */}
      <div className="bg-white border border-gray-200/80 rounded-3xl shadow-xl overflow-hidden flex flex-col justify-between min-h-[580px] relative text-gray-900">
        
        {/* HEADER BAR: Dynamic top bar containing the menu on the left */}
        <div className="p-4 border-b border-gray-200/80 flex items-center justify-between bg-gray-50/50 relative z-30">
          
          {/* Menu Dropdown Trigger (MoreHorizontal) */}
          <div ref={menuRef} className="flex items-center gap-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              id="three-dots-menu-btn"
              className="p-2 bg-white hover:bg-gray-100 border border-gray-200 rounded-full text-gray-600 hover:text-gray-950 transition flex items-center justify-center cursor-pointer shadow-sm"
              title="System Menu"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          {/* Clean Small Logo in the header if conversation is active */}
          {(messages.length > 0 || isKasiKodeMode) && (
            <div className="animate-fade-in">
              <KlevLogo size="small" />
            </div>
          )}

          {/* User Account Dropdown Selector & Active indicator */}
          <div className="flex items-center gap-3 relative">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[9px] text-gray-500 font-sans tracking-wide leading-none">Active Profile</span>
              <span className="text-[10px] font-bold text-gray-800 font-mono">{signedInUser}</span>
            </div>
            
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition shadow-sm text-xs font-semibold text-gray-700 cursor-pointer"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>👤 {signedInUser === 'tshilidzi.mukwevho54@gmail.com' ? 'Developer' : 'User'}</span>
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 z-50 animate-fade-in">
                <div className="px-3 py-1.5 border-b border-gray-100 mb-1">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Switch Signed-In User</p>
                </div>
                
                <button
                  onClick={() => {
                    setSignedInUser('charesmagna@gmail.com');
                    setShowUserDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex flex-col transition cursor-pointer ${
                    signedInUser === 'charesmagna@gmail.com' ? 'bg-purple-50 text-purple-900 font-bold' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>Chares Magna</span>
                  <span className="text-[9px] text-gray-400 font-mono">charesmagna@gmail.com</span>
                </button>

                <button
                  onClick={() => {
                    setSignedInUser('tshilidzi.mukwevho54@gmail.com');
                    setShowUserDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex flex-col transition cursor-pointer ${
                    signedInUser === 'tshilidzi.mukwevho54@gmail.com' ? 'bg-purple-50 text-purple-900 font-bold' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-1">Tshilidzi Mukwevho <span className="text-[9px] bg-purple-100 text-purple-700 px-1 rounded">Dev</span></span>
                  <span className="text-[9px] text-gray-400 font-mono">tshilidzi.mukwevho54@gmail.com</span>
                </button>

                <button
                  onClick={() => {
                    setSignedInUser('guest@kleva.ai');
                    setShowUserDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex flex-col transition cursor-pointer ${
                    signedInUser === 'guest@kleva.ai' ? 'bg-purple-50 text-purple-900 font-bold' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>Guest User</span>
                  <span className="text-[9px] text-gray-400 font-mono">guest@kleva.ai</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Pull-down Hidden Settings Menu */}
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 bg-white/95 border-b border-gray-200 rounded-t-3xl p-5 md:p-6 space-y-5 backdrop-blur-2xl z-40 animate-fade-in shadow-2xl text-gray-900">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                K'lev.ai Pull-down System Console
              </span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full border border-gray-200 transition cursor-pointer"
              >
                Hide Console
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Left Side: Preferences and Kasi Kode Toggle */}
              <div className="space-y-4">
                
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-purple-900">
                      <Terminal className="h-4 w-4 text-purple-600" />
                      <span className="text-xs font-bold font-sans">Kasi Kode Agent Mode</span>
                    </div>
                    {/* Toggle Switch */}
                    <button
                      onClick={() => {
                        setIsKasiKodeMode(!isKasiKodeMode);
                        setIsMenuOpen(false);
                      }}
                      className={`w-11 h-6 rounded-full transition p-0.5 flex items-center cursor-pointer ${
                        isKasiKodeMode ? 'bg-purple-600 justify-end' : 'bg-gray-300 justify-start'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-white shadow-md block" />
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-600 leading-normal font-sans">
                    Enable private engineering workflow for local builds, code scanners, and automated GitHub pushes. Active User Profile: <strong className="text-purple-700">{signedInUser}</strong>.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                      <Languages className="h-3 w-3" /> Voice Accent
                    </span>
                    <select
                      value={selectedLang}
                      onChange={(e) => setSelectedLang(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-lg text-xs p-1.5 text-gray-800 focus:outline-none focus:border-purple-500"
                    >
                      {SOUTH_AFRICAN_LANGUAGES.map(l => (
                        <option key={l.code} value={l.code}>
                          {l.name} ({l.englishName})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> Cultural Avatar
                    </span>
                    <select
                      value={selectedPersona}
                      onChange={(e) => setSelectedPersona(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-lg text-xs p-1.5 text-gray-800 focus:outline-none focus:border-purple-500"
                    >
                      {CULTURAL_PERSONAS.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.avatar} {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Right Side: GitHub Repositories Config */}
              <div className="space-y-3 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Github className="h-4 w-4 text-gray-600" /> GitHub Repository Credentials
                </span>

                <div className="space-y-2">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">Repository</span>
                    <input 
                      type="text" 
                      value={gitRepo} 
                      onChange={(e) => setGitRepo(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded px-2.5 py-1 text-xs text-gray-950 font-mono focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">Branch</span>
                      <input 
                        type="text" 
                        value={gitBranch} 
                        onChange={(e) => setGitBranch(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded px-2.5 py-1 text-xs text-gray-950 font-mono focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">PAT Token</span>
                      <input 
                        type="password" 
                        value={gitToken} 
                        onChange={(e) => setGitToken(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded px-2.5 py-1 text-xs text-gray-950 font-mono focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200 flex justify-between items-center text-[9px] text-gray-400 font-mono">
              <span>SOUTH AFRICAN LINGUISTIC & POPIA SECURE INTEGRATION</span>
              <span>v1.0.4 PROD</span>
            </div>
          </div>
        )}

        {/* INTERACTIVE WORKSPACE VIEW */}
        <div className="flex-1 flex flex-col justify-between p-6 overflow-y-auto">
          
          {isKasiKodeMode ? (
            /* =======================================================
               KASI KODE ENGINEERING WORKSPACE (GITHUB AGENT)
               ======================================================= */
            <div className="space-y-6 flex-1 flex flex-col justify-between animate-fade-in text-gray-900">
              
              <div className="space-y-4">
                {/* Header title */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-base font-bold text-gray-950 flex items-center gap-2">
                      <Terminal className="h-5 w-5 text-purple-600" />
                      Kasi Kode GitHub Agent
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Automate repository code analysis, compile local source files, and push verified builds to GitHub safely.
                    </p>
                  </div>
                  <span className="text-[10px] bg-purple-50 border border-purple-200 text-purple-700 px-2 py-0.5 rounded font-mono font-bold">
                    SYSTEMS RUNNING
                  </span>
                </div>

                {/* Repo Connect & Config Box */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-gray-50 p-3.5 border border-gray-200 rounded-xl space-y-1">
                    <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider block">GitHub Repository</span>
                    <div className="flex items-center gap-1.5">
                      <Github className="h-3.5 w-3.5 text-gray-500 shrink-0" />
                      <input 
                        type="text" 
                        value={gitRepo} 
                        onChange={(e) => setGitRepo(e.target.value)}
                        className="bg-transparent text-xs text-gray-900 font-mono focus:outline-none w-full"
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3.5 border border-gray-200 rounded-xl space-y-1">
                    <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider block">Target Branch</span>
                    <div className="flex items-center gap-1.5">
                      <GitBranch className="h-3.5 w-3.5 text-gray-500 shrink-0" />
                      <input 
                        type="text" 
                        value={gitBranch} 
                        onChange={(e) => setGitBranch(e.target.value)}
                        className="bg-transparent text-xs text-gray-900 font-mono focus:outline-none w-full"
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3.5 border border-gray-200 rounded-xl space-y-1">
                    <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider block">Personal Access Token (PAT)</span>
                    <div className="flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5 text-gray-500 shrink-0" />
                      <input 
                        type="password" 
                        value={gitToken} 
                        onChange={(e) => setGitToken(e.target.value)}
                        className="bg-transparent text-xs text-gray-900 font-mono focus:outline-none w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Code templates & Diff Visualizer */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  
                  {/* Selector panel */}
                  <div className="md:col-span-4 space-y-3">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Engineering Tasks</span>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setKasiTemplate('apk_workflow');
                          setCommitMsg("ci: add automatic APK build actions workflow and Gradle signer");
                        }}
                        className={`w-full text-left p-3 rounded-xl border transition cursor-pointer ${
                          kasiTemplate === 'apk_workflow'
                            ? 'bg-purple-50 border-purple-300 text-purple-950'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <p className="text-xs font-bold">APK Actions Workflow</p>
                        <span className="text-[9px] text-gray-500 block mt-0.5 font-mono">.github/workflows/build.yml</span>
                      </button>

                      <button
                        onClick={() => {
                          setKasiTemplate('ubuntu_rules');
                          setCommitMsg("feat: Mzansi cultural persona select system injected");
                        }}
                        className={`w-full text-left p-3 rounded-xl border transition cursor-pointer ${
                          kasiTemplate === 'ubuntu_rules'
                            ? 'bg-purple-50 border-purple-300 text-purple-950'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <p className="text-xs font-bold">Inject Cultural Rules</p>
                        <span className="text-[9px] text-gray-500 block mt-0.5 font-mono">apps/android/ChatActivity.kt</span>
                      </button>

                      <button
                        onClick={() => {
                          setKasiTemplate('emergency_buffer');
                          setCommitMsg("feat: Emergency satellite offline SOS dispatch node");
                        }}
                        className={`w-full text-left p-3 rounded-xl border transition cursor-pointer ${
                          kasiTemplate === 'emergency_buffer'
                            ? 'bg-purple-50 border-purple-300 text-purple-950'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <p className="text-xs font-bold">Emergency Offline Buffer</p>
                        <span className="text-[9px] text-gray-500 block mt-0.5 font-mono">packages/offline/offline-manager.ts</span>
                      </button>

                      <button
                        onClick={() => {
                          setKasiTemplate('gemini_api');
                          setCommitMsg("feat: server-side Google GenAI routing layer");
                        }}
                        className={`w-full text-left p-3 rounded-xl border transition cursor-pointer ${
                          kasiTemplate === 'gemini_api'
                            ? 'bg-purple-50 border-purple-300 text-purple-950'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <p className="text-xs font-bold">Gemini Server Routing</p>
                        <span className="text-[9px] text-gray-500 block mt-0.5 font-mono">backend/api/server.ts</span>
                      </button>
                    </div>

                    {/* Commit Msg Input */}
                    <div className="space-y-1 pt-2">
                      <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider block">Commit Message</span>
                      <div className="flex bg-white border border-gray-200 rounded-xl p-2 items-center gap-1.5 shadow-sm">
                        <GitCommit className="h-3.5 w-3.5 text-gray-500 shrink-0" />
                        <input
                          type="text"
                          value={commitMsg}
                          onChange={(e) => setCommitMsg(e.target.value)}
                          className="bg-transparent text-xs text-gray-900 focus:outline-none w-full font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Code editor visualization */}
                  <div className="md:col-span-8 flex flex-col bg-gray-950 border border-gray-900 rounded-2xl overflow-hidden h-56 md:h-72">
                    <div className="bg-black/50 px-4 py-2 border-b border-gray-900 flex justify-between items-center">
                      <span className="text-[10px] text-gray-400 font-mono">STAGED DIFF PREVIEW</span>
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    </div>
                    <pre className="p-4 overflow-auto font-mono text-[10px] text-gray-300 bg-black/20 flex-1 leading-normal">
                      <code>{selectedTemplateCode()}</code>
                    </pre>
                  </div>

                </div>

              </div>

              {/* Build Log Outputs / Progress Simulation */}
              <div className="space-y-3">
                
                {buildLogs.length > 0 && (
                  <div className="bg-gray-950 border border-gray-900 rounded-xl p-4 h-36 overflow-y-auto font-mono text-[10px] text-gray-400 space-y-1.5 leading-normal">
                    {buildLogs.map((log, idx) => {
                      let color = "text-gray-400";
                      if (log.includes("[SUCCESS]")) color = "text-emerald-400 font-bold";
                      if (log.includes("[INFO]")) color = "text-purple-300";
                      return (
                        <p key={idx} className={color}>
                          {log}
                        </p>
                      );
                    })}
                  </div>
                )}

                {/* Trigger Push and compile */}
                <button
                  onClick={handleKasiPush}
                  disabled={buildStatus === 'running'}
                  className={`w-full py-4 rounded-xl text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition uppercase ${
                    buildStatus === 'running' 
                      ? 'bg-purple-900/40 text-purple-300 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/10'
                  }`}
                >
                  {buildStatus === 'running' ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Kasi Kode compiling and pushing code to repository...
                    </>
                  ) : (
                    <>
                      <Code2 className="h-4 w-4" />
                      Compile & Push Commit to Github Branch: {gitBranch}
                    </>
                  )}
                </button>

              </div>

            </div>
          ) : (
            /* =======================================================
               CONVERSATIONAL CHATBOT (SIRI-STYLE LANDING & CONVERSATION FEED)
               ======================================================= */
            <div className="flex-1 flex flex-col justify-between">
              
              {messages.length === 0 ? (
                /* HUGE LOGO LANDING (Before first message is sent) */
                <div className="flex-1 flex flex-col items-center justify-center space-y-8 py-16 animate-fade-in">
                  
                  {/* Huge White Logo Render */}
                  <KlevLogo size="large" />

                  {/* Sleek ambient voice aura visualizer indicator */}
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 bg-purple-500/10 rounded-full animate-ping duration-[3000ms]" />
                    <button 
                      onClick={startVoiceSim}
                      className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 hover:scale-105 transition duration-200 shadow-xl shadow-purple-500/10 cursor-pointer group"
                      title="Voice Assistant"
                    >
                      <Mic className="h-4 w-4 text-white" />
                    </button>
                  </div>

                  <span className="text-[10px] text-gray-500 font-sans tracking-widest uppercase opacity-80">
                    Sovereign National Knowledge Engine
                  </span>

                </div>
              ) : (
                /* CHAT CONVERSATION STREAM */
                <div className="flex-1 overflow-y-auto space-y-4 max-h-[380px] pr-2 scrollbar-none mb-6">
                  {messages.map((m, idx) => (
                    <div 
                      key={idx} 
                      className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-purple-50 border border-purple-200 text-purple-950 rounded-tr-none shadow-sm'
                          : 'bg-gray-50 border border-gray-150 text-gray-800 rounded-tl-none shadow-sm'
                      }`}>
                        <p className="font-medium whitespace-pre-wrap">{m.text}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
              )}

              {/* BOTTOM MESSAGE PANEL TAB */}
              <div className="border-t border-gray-150 pt-4 flex flex-col items-center justify-center space-y-3.5">
                
                {/* Visual waves if siri audio is running */}
                {(isListening || isSpeaking) && (
                  <div className="flex items-center gap-1 h-6">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <span 
                        key={i} 
                        className={`w-0.5 rounded-full animate-siri-wave ${
                          isListening ? 'bg-indigo-500' : 'bg-emerald-500'
                        }`}
                        style={{ 
                          animationDelay: `${i * 0.06}s`,
                          height: `${Math.floor(Math.random() * 16 + 6)}px`
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Translucent message field */}
                <div className="w-full flex gap-2 relative z-20">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={`Message Gogo Nomsa & K'lev.ai...`}
                    className="flex-1 text-xs bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-500/50 placeholder-gray-400 shadow-sm"
                  />
                  <button
                    onClick={() => handleSend()}
                    className="bg-purple-600 hover:bg-purple-500 text-white px-4 rounded-2xl transition shadow-lg shadow-purple-500/15 flex items-center justify-center cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center gap-4 text-[9px] text-gray-400 font-mono">
                  <span>● Active Accent: {activeLangObj.name}</span>
                  <span>● SECURE CLIENT SIDE ENDPOINT</span>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
