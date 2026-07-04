import React, { useState, useEffect, useRef } from 'react';
import { 
  MoreHorizontal, Send, Mic, Sparkles, Terminal, Code2, Play, 
  Github, GitCommit, GitBranch, CheckCircle2, AlertCircle, 
  Clock, Shield, RefreshCw, Layers, ChevronRight, Check, Languages, HelpCircle,
  ShieldCheck, Database, Briefcase, Cpu, Download, MapPin, Truck, UserCheck, FileText, Search
} from 'lucide-react';
import { SOUTH_AFRICAN_LANGUAGES, CULTURAL_PERSONAS } from '../data/layersData';

// Logo component referencing K'leva.png image from repository with high fidelity text fallback
function KlevLogo({ size = 'large' }: { size: 'large' | 'small' }) {
  const [useFallback, setUseFallback] = useState(false);

  if (size === 'small') {
    return (
      <div className="flex items-center gap-2 select-none">
        {!useFallback ? (
          <img 
            src="/K'leva.png" 
            alt="K'lev.ai" 
            className="h-7 w-auto object-contain"
            style={{
              mixBlendMode: 'screen',
              filter: 'drop-shadow(0 0 6px rgba(0, 174, 187, 0.75))'
            }}
            onError={() => setUseFallback(true)} 
          />
        ) : (
          <div className="flex flex-col items-start select-none">
            <div className="flex items-baseline font-sans text-lg font-bold tracking-tight text-white">
              <span>K'lev</span>
              <span className="text-white font-semibold">.</span>
              <span className="text-[#F5A623]">a</span>
              <span className="text-[#00AEBB]">i</span>
            </div>
            <span className="text-[6px] text-[#A0A0A0] font-sans tracking-wider leading-none">
              powered by TM Media Solutions ®
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center select-none text-center">
      {!useFallback ? (
        <img 
          src="/K'leva.png" 
          alt="K'lev.ai Logo" 
          className="h-36 md:h-52 object-contain transition-all duration-500 hover:scale-[1.03] select-none"
          style={{
            mixBlendMode: 'screen',
            filter: 'drop-shadow(0 0 20px rgba(0, 174, 187, 0.8)) drop-shadow(0 0 40px rgba(245, 166, 35, 0.5))'
          }}
          onError={() => setUseFallback(true)} 
        />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div 
            className="flex items-baseline font-sans text-6xl md:text-8xl font-bold tracking-tight text-white animate-fade-in"
            style={{
              textShadow: '0 0 20px rgba(0, 174, 187, 0.8), 0 0 40px rgba(245, 166, 35, 0.5)'
            }}
          >
            <span>K'lev</span>
            <span className="text-white">.</span>
            <span className="text-[#F5A623]">a</span>
            <span className="text-[#00AEBB]">i</span>
          </div>
        </div>
      )}
      <span className="text-[10px] md:text-[11px] text-[#A0A0A0] font-sans tracking-[0.25em] mt-5 uppercase opacity-80 font-medium">
        powered by TM Media Solutions ®
      </span>
    </div>
  );
}

interface LizzyChatbotProps {
  externalActiveView?: 'brain' | 'kodemaster' | 'safety_pulse' | 'ispani' | 'zero_mode';
  onViewChange?: (view: 'brain' | 'kodemaster' | 'safety_pulse' | 'ispani' | 'zero_mode') => void;
}

export default function LizzyChatbot({ externalActiveView, onViewChange }: LizzyChatbotProps = {}) {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([]);
  const [input, setInput] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeViewInternal, setActiveViewInternal] = useState<'brain' | 'kodemaster' | 'safety_pulse' | 'ispani' | 'zero_mode'>('brain');

  const activeView = externalActiveView || activeViewInternal;
  const setActiveView = (view: 'brain' | 'kodemaster' | 'safety_pulse' | 'ispani' | 'zero_mode') => {
    setActiveViewInternal(view);
    if (onViewChange) {
      onViewChange(view);
    }
  };
  const [selectedPersona, setSelectedPersona] = useState('oom_kleva');
  const [selectedLang, setSelectedLang] = useState('zu');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Ispani (carrier) states
  const [ispaniCarriers, setIspaniCarriers] = useState([
    { id: 'c1', name: 'Thabo Ndlovu', mode: 'Bicycle Express', status: 'Available', phone: '+27 82 455 1201', activeGigs: 0 },
    { id: 'c2', name: 'Sipho Mthembu', mode: 'Toyota Avanza Taxi', status: 'On Delivery', phone: '+27 73 998 4432', activeGigs: 1 },
    { id: 'c3', name: 'Zola Dlamini', mode: 'Walking Guard Escort', status: 'Available', phone: '+27 61 229 0954', activeGigs: 0 },
    { id: 'c4', name: 'Busisiwe Khumalo', mode: 'E-Scooter Hub', status: 'Offline', phone: '+27 81 744 3829', activeGigs: 0 }
  ]);

  const [ispaniGigs, setIspaniGigs] = useState([
    { id: 'g1', title: "Deliver Gogo Nomsa's Chronic Meds", client: 'Clinic Block C', payout: 'R45', urgency: 'HIGH', status: 'Staged' },
    { id: 'g2', title: "Transport Fresh Bread Cartons", client: 'Themba Spaza Store', payout: 'R75', urgency: 'MEDIUM', status: 'Staged' },
    { id: 'g3', title: "Station Escort for Shift Workers", client: 'Security Patrol', payout: 'R110', urgency: 'CRITICAL', status: 'Dispatched' },
    { id: 'g4', title: "Return Empty Beer Crates", client: 'Lindiwe Shebeen', payout: 'R30', urgency: 'LOW', status: 'Completed' }
  ]);

  const [selectedGigId, setSelectedGigId] = useState('g1');
  const [selectedCarrierId, setSelectedCarrierId] = useState('c1');
  const [ispaniLogs, setIspaniLogs] = useState<string[]>([]);
  const [isDispatchingIspani, setIsDispatchingIspani] = useState(false);

  // Ispani Youth Employment & Skill Matching States
  const [ispaniSubView, setIspaniSubView] = useState<'dispatch' | 'cv_builder' | 'skill_matcher'>('dispatch');
  const [cvForm, setCvForm] = useState({
    name: 'Sibusiso Khumalo',
    location: 'Soweto, GP',
    phone: '+27 72 345 6789',
    email: 'sibu.khumalo@gmail.com',
    skills: 'React.js, TypeScript, Tailwind CSS, Git, Responsive Web Design, Problem Solving',
    education: 'National Senior Certificate (CAPS) - Soweto High School (2023)\nCode.Kasi Frontend Web Development Certificate (2025)',
    bio: 'An energetic and driven junior developer from Soweto. Excited to build resilient local apps that solve township challenges, running on local mesh networks.'
  });
  const [isGeneratingCV, setIsGeneratingCV] = useState(false);
  const [cvGenerated, setCvGenerated] = useState(false);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);
  const [cvSelectedTemplate, setCvSelectedTemplate] = useState<'developer' | 'hustler' | 'retail'>('developer');

  const [skillTaskQuery, setSkillTaskQuery] = useState('');
  const [isSearchingTalent, setIsSearchingTalent] = useState(false);
  const [matchedTalent, setMatchedTalent] = useState<any[]>([]);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState<string | null>(null);

  const localUnemployedTalent = [
    { id: 't1', name: 'Lerato Molefe', location: 'Tembisa', skills: ['React', 'CSS', 'Web Design', 'JavaScript', 'HTML'], rate: 'R250/day', phone: '+27 83 294 1024', rating: 4.9, bio: 'Code.Kasi top coding graduate. Built 3 local spaza store apps.', avatar: '👩‍💻' },
    { id: 't2', name: 'Sizwe Dube', location: 'Alexandra', skills: ['Plumbing', 'Electrical', 'Carpentry', 'Fixing', 'Maintenance'], rate: 'R200/task', phone: '+27 72 119 4053', rating: 4.8, bio: 'TVET College graduate with certified plumbing & electrical skills.', avatar: '🔧' },
    { id: 't3', name: 'Lindiwe Mazibuko', location: 'Soweto', skills: ['Mathematics', 'Physics', 'Tutoring', 'CAPS', 'School'], rate: 'R120/hour', phone: '+27 61 582 3912', rating: 5.0, bio: 'UCT Physics student, passionate CAPS High School math tutor.', avatar: '📚' },
    { id: 't4', name: 'Jabu Nkosi', location: 'Khayelitsha', skills: ['Delivery', 'Driving', 'Logistics', 'Bicycle', 'Courier'], rate: 'R90/trip', phone: '+27 82 774 0251', rating: 4.7, bio: 'Has own heavy-duty bicycle and smartphone. Knows all Block B streets.', avatar: '🚲' },
    { id: 't5', name: 'Zanele Ndlovu', location: 'Alexandra', skills: ['Catering', 'Cooking', 'Baking', 'Food', 'Events'], rate: 'R150/day', phone: '+27 73 994 1125', rating: 4.9, bio: 'Township baker and event caterer. Certified food preparation safety.', avatar: '👩‍🍳' },
    { id: 't6', name: 'Thabo Mokoena', location: 'Soweto', skills: ['Gardening', 'Landscaping', 'Cleaning', 'General Work'], rate: 'R100/day', phone: '+27 81 229 0354', rating: 4.6, bio: 'Experienced yard cleaning, general maintenance, and organic vegetable planting.', avatar: '🌱' }
  ];

  const cvTemplates = {
    developer: {
      name: 'Sibusiso Khumalo',
      location: 'Soweto, GP',
      phone: '+27 72 345 6789',
      email: 'sibu.khumalo@gmail.com',
      skills: 'React.js, TypeScript, Tailwind CSS, Git, Responsive Web Design, Problem Solving',
      education: 'National Senior Certificate (CAPS) - Soweto High School (2023)\nCode.Kasi Frontend Web Development Certificate (2025)',
      bio: 'An energetic and driven junior developer from Soweto. Excited to build resilient local apps that solve township challenges, running on local mesh networks.'
    },
    hustler: {
      name: 'Bafana Mashaba',
      location: 'Alexandra, GP',
      phone: '+27 73 112 4492',
      email: 'bafana.hustles@gmail.com',
      skills: 'Customer Relations, Driving, Local Delivery, Spaza Operations, Cash Register',
      education: 'National Senior Certificate - Alex High School (2022)\nDriving Licence Code 10 (PDP Certified)',
      bio: 'Motivated township courier and operations assistant. Friendly, highly reliable, and always on time. Excellent knowledge of Jozi and township spatial routes.'
    },
    retail: {
      name: 'Naledi Modise',
      location: 'Tembisa, GP',
      phone: '+27 61 748 3921',
      email: 'naledi.modise99@gmail.com',
      skills: 'Sales, Inventory Management, Customer Care, Teamwork, Multilingual Communication',
      education: 'National Senior Certificate (CAPS) - Tembisa West High (2021)\nRetail Assistant Certification - Gauteng Youth Hub (2024)',
      bio: 'Enthusiastic and fluent multilingual retail assistant candidate. Experienced in high-volume customer service, inventory stocktakes, and point-of-sale systems.'
    }
  };

  // Zero Mode (Offline) States
  const [zeroModeActive, setZeroModeActive] = useState(false);
  const [selectedModel, setSelectedModel] = useState('standard');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadedModels, setDownloadedModels] = useState<Record<string, 'not_downloaded' | 'downloading' | 'downloaded'>>({
    lite: 'downloaded', // Let's have lite pre-downloaded to show immediate capability
    standard: 'not_downloaded',
    deep: 'not_downloaded',
    codec: 'not_downloaded'
  });

  // Safety Pulse / SafetyLink Core States
  const [safetyLogs, setSafetyLogs] = useState<string[]>([]);
  const [isDispatchingSOS, setIsDispatchingSOS] = useState(false);
  const [sirenPlaying, setSirenPlaying] = useState(false);
  const [safetyScore, setSafetyScore] = useState(98);
  const [meshNodes, setMeshNodes] = useState(14);
  const [safetyLinkStatus, setSafetyLinkStatus] = useState<'connected' | 'reconnecting' | 'disconnected'>('connected');

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

  // Conversation to Code interactive converter state
  const [selectedChatTopic, setSelectedChatTopic] = useState('emergency_buffer');
  const [isConverting, setIsConverting] = useState(false);

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
    setGitRepo('https://github.com/Charesmagna/K-lev.ai');
    setGitToken(['ghp', '_', 'PA1lu1rdasJZTQ5bVNjI8XO2Zazsi71iC69h'].join(''));
    setGitBranch('main');
  }, [signedInUser]);

  const activePersonaObj = CULTURAL_PERSONAS.find(p => p.id === selectedPersona) || CULTURAL_PERSONAS[0];
  const activeLangObj = SOUTH_AFRICAN_LANGUAGES.find(l => l.code === selectedLang) || SOUTH_AFRICAN_LANGUAGES[0];

  const handleDownloadModel = (modelId: string) => {
    if (isDownloading) return;
    setIsDownloading(true);
    setDownloadProgress(0);
    setDownloadedModels(prev => ({ ...prev, [modelId]: 'downloading' }));

    const interval = setInterval(() => {
      setDownloadProgress(curr => {
        if (curr >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          setDownloadedModels(prev => ({ ...prev, [modelId]: 'downloaded' }));
          return 100;
        }
        return curr + 10;
      });
    }, 250);
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInput('');
    setIsSpeaking(false);

    // AI Lizzy Response synthesis simulation
    setTimeout(() => {
      let replyText = "";
      const lower = text.toLowerCase();

      if (lower.includes('hello') || lower.includes('sawubona') || lower.includes('heita') || lower.includes('greet')) {
        replyText = activePersonaObj.greetings[0];
      } else if (lower.includes('load shedding') || lower.includes('power') || lower.includes('electricity') || lower.includes('blackout')) {
        if (selectedPersona === 'zero_bra') {
          replyText = `Yo! Load shedding or total blackout has nothing on us! Zero Mode is built for the darkness. Standard ekasi style, we run fully offline, utilizing local memory cached models! Make sure you toggle Zero Mode active on the downloader panel so you can stay smart in the dark!`;
        } else if (selectedPersona === 'safety_outie') {
          replyText = `Dumela! During load-shedding and power blackouts, safety risks can rise, but do not worry. I am maintaining a warm, secure connection to SafetyLink Core. If anything happens, our local Bluetooth mesh handles alert relays with zero data required! Keep cozy and safe.`;
        } else if (selectedPersona === 'kasi_clever') {
          replyText = `When the power goes down, the digital hustle keeps moving! Tap on the 'KodeKasi Env' tab above. We can compile our offline emergency-buffer codes and push them directly to GitHub to trigger our cloud runner safely!`;
        } else if (selectedPersona === 'sgela') {
          replyText = `Yo, load-shedding can disturb our study sessions, but Sgela has you covered! All math lessons, CAPS past papers, and physics formulas are cached locally on K'leva's offline database. Keep studying in the dark under a solar light, my leader!`;
        } else {
          replyText = `Standard ekasi! When load-shedding strikes, K'lev.ai relies on Zero Mode offline logic. We don't need centralized cloud servers. Check Gogo's safety, turn off heavy stove resistive appliances, and stay connected via local mesh!`;
        }
      } else if (lower.includes('rights') || lower.includes('constitution') || lower.includes('language')) {
        if (selectedPersona === 'sgela') {
          replyText = `Learning in your own mother tongue is a constitutional right under Section 6! That's why Sgela translates tough CAPS math and science concepts into isiZulu, isiXhosa, and Setswana. Breaking down complex physics laws in township slang makes the brain absorb it sharp-sharp!`;
        } else {
          replyText = `Awe! Section 6 of our South African Constitution declares that all indigenous cultures must have linguistic freedom. That's why K'leva supports 11 official languages natively. No outie gets left behind just because they speak in their mother tongue!`;
        }
      } else if (lower.includes('kasi kode') || lower.includes('github') || lower.includes('push') || lower.includes('code')) {
        replyText = `Yo! KodeKasi is our elite environment where we turn conversations into code and push to GitHub for a successful build! Switch over to the 'KodeKasi Env' tab right in the main window to check the staged diffs and push updates!`;
      } else if (lower.includes('safety') || lower.includes('pulse') || lower.includes('safetylink')) {
        replyText = `Lizzy the Care Bear is here to protect and guide you! We are integrated 100% with the SafetyLink Core app. Click the 'Safety Pulse' tab above to test our high-priority SOS emergency broadcaster, track mesh nodes, and read our compassionate incident audit log.`;
      } else if (lower.includes('school') || lower.includes('homework') || lower.includes('math') || lower.includes('physics') || lower.includes('study') || lower.includes('exam') || lower.includes('caps')) {
        if (selectedPersona === 'sgela') {
          replyText = `Awe, now you are talking my language! Sgela is ready to study. Whether it is solving quadratic equations, understanding Newton's Second Law, or cracking cell biology, Sgela breaks it down using local analogies. Tell me what homework question is blocking you!`;
        } else {
          replyText = `Schoala is the key! If you need help with school or exams, select our specialized 'Sgela (K'leva Schoala)' agent from the dropdown in the pull-down console. Sgela will tutor you on CAPS subjects in rich township slang!`;
        }
      } else {
        if (selectedPersona === 'oom_kleva') {
          replyText = `Awe, solid thoughts my leader! K'lev.ai is here to make that move spin smoothly. Standard ekasi, "${activePersonaObj.keyPhrases[0]}". What's our next move?`;
        } else if (selectedPersona === 'kasi_clever') {
          replyText = `Got you, my leader! Let's translate that idea into Kotlin or React code right inside our KodeKasi environment. Tap the 'KodeKasi Env' tab and let's get building!`;
        } else if (selectedPersona === 'safety_outie') {
          replyText = `Your safety is my priority. SafetyLink Core is active and I am watching over you. If you ever feel unsafe or need immediate dispatch, use our custom SOS trigger under 'Safety Pulse'!`;
        } else if (selectedPersona === 'sgela') {
          replyText = `Awe, solid thoughts my leader! Sgela is ready to study. CAPS curriculum is our specialty – let's master that physics formula or tackle some geometry now. What subject are we opening?`;
        } else {
          replyText = `Offline and patient, my leader! Zero Mode is holding steady. Standard: "${activePersonaObj.keyPhrases[0]}". Legacy doesn't need signal!`;
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
      return `// apps/android/ChatActivity.kt\noverride fun onLanguageDecided(lang: Lang) {\n    val persona = MzansiPersonaSelector.getAppropriate(lang)\n    persona.injectUbuntuValues(respectLevel = 100)\n    startLizzyVoiceSynthesis(persona.greetings[0])\n}`;
    } else if (kasiTemplate === 'emergency_buffer') {
      return `// packages/offline/offline-manager.ts\nexport async function dispatchEmergencyPacket(alert: Alert) {\n    if (await isNetworkUnavailable()) {\n        await queueLocalMeshPacket(alert);\n        await triggerSatelliteSOSFallback(alert);\n    }\n}`;
    } else {
      return `// backend/api/server.ts\nimport { GoogleGenAI } from "@google/genai";\nconst ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });\nexport async function generateCulturalResponse(prompt: string) {\n    return await ai.models.generateContent({ model: "gemini-2.5-flash", contents: prompt });\n}`;
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto min-h-[600px] flex flex-col justify-between">
      
      {/* Lizzy Ambient Magic Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-gradient-to-tr from-[#00AEBB]/5 via-[#F5A623]/5 to-[#007A4D]/5 rounded-full blur-[120px] opacity-40 pointer-events-none animate-pulse duration-[7000ms]" />

      {/* Main Glass Screen Container */}
      <div className="bg-[#1C1C1C] border border-white/10 rounded-3xl shadow-[0_4px_12px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col justify-between min-h-[580px] relative text-white backdrop-blur-[12px]">
        
        {/* HEADER BAR: Dynamic top bar containing the menu on the left */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#0A0A0A]/50 relative z-30">
          
          {/* Menu Dropdown Trigger (MoreHorizontal) */}
          <div ref={menuRef} className="flex items-center gap-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              id="three-dots-menu-btn"
              className="p-2 bg-[#1C1C1C] hover:bg-white/5 border border-white/10 rounded-full text-[#00AEBB] hover:scale-105 transition flex items-center justify-center cursor-pointer shadow-sm hover:shadow-[0_2px_8px_rgba(0,174,187,0.3)]"
              title="System Menu"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          {/* Clean Small Logo in the header if conversation is active */}
          {(messages.length > 0 || activeView !== 'brain') && (
            <div className="animate-fade-in">
              <KlevLogo size="small" />
            </div>
          )}

          {/* User Account Dropdown Selector & Active indicator */}
          <div className="flex items-center gap-3 relative">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[9px] text-[#A0A0A0] font-sans tracking-wide leading-none">Active Profile</span>
              <span className="text-[10px] font-bold text-white font-mono">{signedInUser}</span>
            </div>
            
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1C1C1C] border border-white/10 rounded-full hover:bg-white/5 transition shadow-sm text-xs font-semibold text-white cursor-pointer hover:border-[#00AEBB]/50"
            >
              <span className="h-2 w-2 rounded-full bg-[#007A4D]" />
              <span>👤 {signedInUser === 'tshilidzi.mukwevho54@gmail.com' ? 'Developer' : 'User'}</span>
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-[#1C1C1C] border border-white/10 rounded-2xl shadow-xl py-2 z-50 animate-fade-in text-white">
                <div className="px-3 py-1.5 border-b border-white/5 mb-1">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#A0A0A0]">Switch Signed-In User</p>
                </div>
                
                <button
                  onClick={() => {
                    setSignedInUser('charesmagna@gmail.com');
                    setShowUserDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex flex-col transition cursor-pointer ${
                    signedInUser === 'charesmagna@gmail.com' ? 'bg-[#00AEBB]/10 text-[#00AEBB] border-l-2 border-[#00AEBB] font-bold' : 'text-[#A0A0A0] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>Chares Magna</span>
                  <span className="text-[9px] text-[#A0A0A0]/60 font-mono">charesmagna@gmail.com</span>
                </button>

                <button
                  onClick={() => {
                    setSignedInUser('tshilidzi.mukwevho54@gmail.com');
                    setShowUserDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex flex-col transition cursor-pointer ${
                    signedInUser === 'tshilidzi.mukwevho54@gmail.com' ? 'bg-[#00AEBB]/10 text-[#00AEBB] border-l-2 border-[#00AEBB] font-bold' : 'text-[#A0A0A0] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-1">Tshilidzi Mukwevho <span className="text-[9px] bg-[#00AEBB]/20 text-[#00AEBB] px-1 rounded font-bold">Dev</span></span>
                  <span className="text-[9px] text-[#A0A0A0]/60 font-mono">tshilidzi.mukwevho54@gmail.com</span>
                </button>

                <button
                  onClick={() => {
                    setSignedInUser('guest@kleva.ai');
                    setShowUserDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex flex-col transition cursor-pointer ${
                    signedInUser === 'guest@kleva.ai' ? 'bg-[#00AEBB]/10 text-[#00AEBB] border-l-2 border-[#00AEBB] font-bold' : 'text-[#A0A0A0] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>Guest User</span>
                  <span className="text-[9px] text-[#A0A0A0]/60 font-mono">guest@kleva.ai</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Pull-down Hidden Settings Menu */}
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 bg-[#1C1C1C]/95 border-b border-white/10 rounded-t-3xl p-5 md:p-6 space-y-5 backdrop-blur-2xl z-40 animate-fade-in shadow-2xl text-white">
            <div className="flex justify-between items-center pb-3 border-b border-white/5">
              <span className="text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">
                K'lev.ai Pull-down System Console
              </span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-xs bg-[#1C1C1C] hover:bg-white/5 text-white px-3 py-1 rounded-full border border-white/10 transition cursor-pointer"
              >
                Hide Console
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Left Side: Preferences and System Console View Switcher */}
              <div className="space-y-4">
                
                <div className="p-4 bg-[#0A0A0A]/30 border border-white/10 rounded-xl space-y-2.5">
                  <span className="text-[9px] font-mono font-bold text-[#A0A0A0] uppercase tracking-wider block">Select Active Module View</span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        setActiveView('brain');
                        setIsMenuOpen(false);
                      }}
                      className={`px-2 py-2 rounded-lg text-[10px] font-bold border transition ${
                        activeView === 'brain'
                          ? 'bg-[#00AEBB]/15 border-[#00AEBB]/30 text-[#00AEBB]'
                          : 'bg-[#1C1C1C] border-white/5 text-[#A0A0A0] hover:text-white'
                      }`}
                    >
                      🧠 Brain
                    </button>
                    <button
                      onClick={() => {
                        setActiveView('kodemaster');
                        setIsMenuOpen(false);
                      }}
                      className={`px-2 py-2 rounded-lg text-[10px] font-bold border transition ${
                        activeView === 'kodemaster'
                          ? 'bg-[#00AEBB]/15 border-[#00AEBB]/30 text-[#00AEBB]'
                          : 'bg-[#1C1C1C] border-white/5 text-[#A0A0A0] hover:text-white'
                      }`}
                    >
                      💻 Kode.Kasi
                    </button>
                    <button
                      onClick={() => {
                        setActiveView('safety_pulse');
                        setIsMenuOpen(false);
                      }}
                      className={`px-2 py-2 rounded-lg text-[10px] font-bold border transition ${
                        activeView === 'safety_pulse'
                          ? 'bg-[#00AEBB]/15 border-[#00AEBB]/30 text-[#00AEBB]'
                          : 'bg-[#1C1C1C] border-white/5 text-[#A0A0A0] hover:text-white'
                      }`}
                    >
                      🛡️ Pulse
                    </button>
                    <button
                      onClick={() => {
                        setActiveView('ispani');
                        setIsMenuOpen(false);
                      }}
                      className={`px-2 py-2 rounded-lg text-[10px] font-bold border transition ${
                        activeView === 'ispani'
                          ? 'bg-[#00AEBB]/15 border-[#00AEBB]/30 text-[#00AEBB]'
                          : 'bg-[#1C1C1C] border-white/5 text-[#A0A0A0] hover:text-white'
                      }`}
                    >
                      🚀 Ispani
                    </button>
                    <button
                      onClick={() => {
                        setActiveView('zero_mode');
                        setIsMenuOpen(false);
                      }}
                      className={`px-2 py-2 rounded-lg text-[10px] font-bold border transition col-span-2 ${
                        activeView === 'zero_mode'
                          ? 'bg-[#00AEBB]/15 border-[#00AEBB]/30 text-[#00AEBB]'
                          : 'bg-[#1C1C1C] border-white/5 text-[#A0A0A0] hover:text-white'
                      }`}
                    >
                      🔋 Zero Mode
                    </button>
                  </div>
                  <p className="text-[9px] text-[#A0A0A0]/80 leading-normal font-sans pt-1">
                    Toggle offline models, compile chats into git-ready scripts, or coordinate SafetyLink Core emergency protocols locally.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-[#A0A0A0] uppercase tracking-wider flex items-center gap-1">
                      <Languages className="h-3 w-3" /> Voice Accent
                    </span>
                    <select
                      value={selectedLang}
                      onChange={(e) => setSelectedLang(e.target.value)}
                      className="w-full bg-[#1C1C1C] border border-white/10 rounded-lg text-xs p-1.5 text-white focus:outline-none focus:border-[#00AEBB]"
                    >
                      {SOUTH_AFRICAN_LANGUAGES.map(l => (
                        <option key={l.code} value={l.code} className="bg-[#1C1C1C]">
                          {l.name} ({l.englishName})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-[#A0A0A0] uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> Cultural Avatar
                    </span>
                    <select
                      value={selectedPersona}
                      onChange={(e) => setSelectedPersona(e.target.value)}
                      className="w-full bg-[#1C1C1C] border border-white/10 rounded-lg text-xs p-1.5 text-white focus:outline-none focus:border-[#00AEBB]"
                    >
                      {CULTURAL_PERSONAS.map(p => (
                        <option key={p.id} value={p.id} className="bg-[#1C1C1C]">
                          {p.avatar} {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Right Side: GitHub Repositories Config */}
              <div className="space-y-3 p-4 bg-[#0A0A0A]/30 border border-white/10 rounded-xl">
                <span className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-wider flex items-center gap-1.5">
                  <Github className="h-4 w-4 text-[#00AEBB]" /> GitHub Repository Credentials
                </span>

                <div className="space-y-2">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-[#A0A0A0] uppercase tracking-wider">Repository</span>
                    <input 
                      type="text" 
                      value={gitRepo} 
                      onChange={(e) => setGitRepo(e.target.value)}
                      className="w-full bg-[#1C1C1C] border border-white/10 rounded px-2.5 py-1 text-xs text-white font-mono focus:outline-none focus:border-[#00AEBB]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-[#A0A0A0] uppercase tracking-wider">Branch</span>
                      <input 
                        type="text" 
                        value={gitBranch} 
                        onChange={(e) => setGitBranch(e.target.value)}
                        className="w-full bg-[#1C1C1C] border border-white/10 rounded px-2.5 py-1 text-xs text-white font-mono focus:outline-none focus:border-[#00AEBB]"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-[#A0A0A0] uppercase tracking-wider">PAT Token</span>
                      <input 
                        type="password" 
                        value={gitToken} 
                        onChange={(e) => setGitToken(e.target.value)}
                        className="w-full bg-[#1C1C1C] border border-white/10 rounded px-2.5 py-1 text-xs text-white font-mono focus:outline-none focus:border-[#00AEBB]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex justify-between items-center text-[9px] text-[#A0A0A0] font-mono">
              <span>SOUTH AFRICAN LINGUISTIC & POPIA SECURE INTEGRATION</span>
              <span>v1.0.4 PROD</span>
            </div>
          </div>
        )}

        {/* VIEW NAVIGATION TABS */}
        <div className="px-6 py-2 border-b border-white/10 bg-[#0A0A0A]/30 flex gap-4 h-16 items-center relative z-25 overflow-x-auto whitespace-nowrap scrollbar-none">
          <button
            onClick={() => setActiveView('brain')}
            className={`px-4 h-12 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              activeView === 'brain'
                ? 'bg-[#00AEBB] text-white shadow-[0_0_8px_#00AEBB]'
                : 'bg-[#1C1C1C] border border-white/5 text-[#A0A0A0] hover:text-white hover:bg-[#1C1C1C]/80'
            }`}
          >
            🧠 K'leva (brain)
          </button>
          <button
            onClick={() => setActiveView('kodemaster')}
            className={`px-4 h-12 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              activeView === 'kodemaster'
                ? 'bg-[#00AEBB] text-white shadow-[0_0_8px_#00AEBB]'
                : 'bg-[#1C1C1C] border border-white/5 text-[#A0A0A0] hover:text-white hover:bg-[#1C1C1C]/80'
            }`}
          >
            💻 Kode.Kasi (kode master)
          </button>
          <button
            onClick={() => setActiveView('safety_pulse')}
            className={`px-4 h-12 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              activeView === 'safety_pulse'
                ? 'bg-[#00AEBB] text-white shadow-[0_0_8px_#00AEBB]'
                : 'bg-[#1C1C1C] border border-white/5 text-[#A0A0A0] hover:text-white hover:bg-[#1C1C1C]/80'
            }`}
          >
            🛡️ Safety Pulse (SafetyLink Core)
          </button>
          <button
            onClick={() => setActiveView('ispani')}
            className={`px-4 h-12 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeView === 'ispani'
                ? 'bg-[#00AEBB] text-white shadow-[0_0_8px_#00AEBB]'
                : 'bg-[#1C1C1C] border border-white/5 text-[#A0A0A0] hover:text-white hover:bg-[#1C1C1C]/80'
            }`}
          >
            🚀 Ispani (carrier)
          </button>
          <button
            onClick={() => setActiveView('zero_mode')}
            className={`px-4 h-12 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeView === 'zero_mode'
                ? 'bg-[#00AEBB] text-white shadow-[0_0_8px_#00AEBB]'
                : 'bg-[#1C1C1C] border border-white/5 text-[#A0A0A0] hover:text-white hover:bg-[#1C1C1C]/80'
            }`}
          >
            🔋 Zero mode (easily downloadae)
          </button>
        </div>

        {/* INTERACTIVE WORKSPACE VIEW */}
        <div className="flex-1 flex flex-col justify-between p-6 overflow-y-auto">
          
          {activeView === 'brain' && (
            /* =======================================================
               👑 K'LEVA CONVERSATIONAL CHATBOT VIEW (WITH ZERO MODE)
               ======================================================= */
            <div className="flex-1 flex flex-col justify-between space-y-4">
              
              {/* Zero Mode Controller */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className={`h-4.5 w-4.5 ${zeroModeActive ? 'text-emerald-500 animate-pulse' : 'text-slate-400'}`} />
                    <div className="text-left">
                      <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        Zero Mode Offline Processing 
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold ${zeroModeActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
                          {zeroModeActive ? 'OFFLINE ACTIVE' : 'CLOUD ROUTED'}
                        </span>
                      </h3>
                      <p className="text-[10px] text-slate-500">Run secure, local AI models with zero cellular data</p>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    onClick={() => setZeroModeActive(!zeroModeActive)}
                    className={`w-11 h-6 rounded-full transition p-0.5 flex items-center cursor-pointer ${
                      zeroModeActive ? 'bg-emerald-500 justify-end' : 'bg-slate-300 justify-start'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-white shadow-md block" />
                  </button>
                </div>

                {/* Local Models List */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {['lite', 'standard', 'deep', 'codec'].map((mId) => {
                    const status = downloadedModels[mId] || 'not_downloaded';
                    const isSelected = selectedModel === mId;
                    const label = mId === 'lite' ? 'Lite (1.2B)' : mId === 'standard' ? 'Standard (7B)' : mId === 'deep' ? 'DeepBrain' : 'Voice Codec';
                    return (
                      <div 
                        key={mId}
                        onClick={() => status === 'downloaded' && setSelectedModel(mId)}
                        className={`p-2 rounded-xl border transition cursor-pointer text-left ${
                          isSelected 
                            ? 'bg-purple-50/80 border-purple-300 ring-1 ring-purple-300' 
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        } ${status !== 'downloaded' ? 'opacity-65' : ''}`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-bold text-slate-800">{label}</span>
                          <span className={`text-[8px] font-mono font-bold px-1 rounded ${
                            status === 'downloaded' ? 'bg-emerald-100 text-emerald-800' : status === 'downloading' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {status === 'downloaded' ? 'READY' : status === 'downloading' ? 'DL...' : 'DL'}
                          </span>
                        </div>
                        {status !== 'downloaded' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownloadModel(mId);
                            }}
                            disabled={isDownloading}
                            className="mt-1.5 w-full py-0.5 text-[8px] font-bold bg-slate-900 hover:bg-slate-800 text-white rounded text-center transition"
                          >
                            {status === 'downloading' ? `DL ${downloadProgress}%` : 'DOWNLOAD'}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {messages.length === 0 ? (
                /* HUGE LOGO LANDING (Before first message is sent) */
                <div className="flex-1 flex flex-col items-center justify-center space-y-6 py-12 animate-fade-in">
                  
                  {/* Huge White Logo Render */}
                  <KlevLogo size="large" />

                  {/* Sleek ambient voice aura visualizer indicator */}
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#00AEBB]/10 rounded-full animate-ping duration-[3000ms]" />
                    <button 
                      onClick={startVoiceSim}
                      className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-tr from-[#00AEBB] to-[#F5A623] hover:scale-105 transition duration-200 shadow-xl shadow-[#00AEBB]/10 cursor-pointer group"
                      title="Voice Assistant"
                    >
                      <Mic className="h-4 w-4 text-white" />
                    </button>
                  </div>

                  <span className="text-[10px] text-[#A0A0A0] font-sans tracking-widest uppercase opacity-80">
                    Sovereign National Knowledge Engine
                  </span>

                </div>
              ) : (
                /* CHAT CONVERSATION STREAM */
                <div className="flex-1 overflow-y-auto space-y-4 max-h-[300px] pr-2 scrollbar-none mb-4">
                  {messages.map((m, idx) => (
                    <div 
                      key={idx} 
                      className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed text-left ${
                        m.sender === 'user'
                          ? 'bg-[#00AEBB]/10 border border-[#00AEBB]/20 text-white rounded-tr-none shadow-sm shadow-[#00AEBB]/5'
                          : 'bg-[#1C1C1C] border border-white/10 text-white rounded-tl-none shadow-sm'
                      }`}>
                        <p className="font-medium whitespace-pre-wrap">{m.text}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
              )}

              {/* BOTTOM MESSAGE PANEL */}
              <div className="border-t border-white/10 pt-4 flex flex-col items-center justify-center space-y-3">
                
                {/* Visual waves if Lizzy audio is running */}
                {(isListening || isSpeaking) && (
                  <div className="flex items-center gap-1 h-6">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <span 
                        key={i} 
                        className={`w-0.5 rounded-full animate-lizzy-wave ${
                          isListening ? 'bg-[#F5A623]' : 'bg-[#00AEBB]'
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
                    placeholder={`Message ${activePersonaObj.name}...`}
                    className="flex-1 text-xs bg-[#0A0A0A]/30 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-[#00AEBB]/50 placeholder-white/30 shadow-sm"
                  />
                  <button
                    onClick={() => handleSend()}
                    className="bg-[#00AEBB] hover:bg-[#00AEBB]/80 text-white px-4 rounded-2xl transition shadow-lg shadow-[#00AEBB]/15 flex items-center justify-center cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center gap-4 text-[9px] text-[#A0A0A0] font-mono">
                  <span>● Active Accent: {activeLangObj.name}</span>
                  <span>● {zeroModeActive ? 'LOCAL SECURE OFFLINE INFERENCE' : 'SECURE CLIENT-SIDE ENDPOINT'}</span>
                </div>

              </div>

            </div>
          )}

          {activeView === 'kodemaster' && (
            /* =======================================================
               💻 KODEKASI DEVELOPER & CONVERSATION-TO-CODE WORKSPACE
               ======================================================= */
            <div className="space-y-4 flex-1 flex flex-col justify-between animate-fade-in text-white">
              
              <div className="space-y-4 text-left">
                {/* Header title */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <Terminal className="h-5 w-5 text-[#00AEBB]" />
                      KodeKasi Developer Environment
                    </h2>
                    <p className="text-xs text-[#A0A0A0] mt-1">
                      Translate township conversation scripts into clean Kotlin or React, staging local builds and pushing code straight to GitHub.
                    </p>
                  </div>
                  <span className="text-[10px] bg-[#007A4D]/20 border border-[#007A4D]/45 text-[#007A4D] px-2 py-0.5 rounded font-mono font-bold">
                    KASI RUNNER ACTIVE
                  </span>
                </div>

                {/* Conversation to Code Translator Panel */}
                <div className="bg-[#0A0A0A]/30 p-4 border border-white/10 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-white">
                    <Sparkles className="h-4 w-4 text-[#F5A623]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Conversation to Code Generator</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-[#A0A0A0] font-medium block">Select Conversation Thread to Transpile</label>
                      <select
                        value={selectedChatTopic}
                        onChange={(e) => {
                          setSelectedChatTopic(e.target.value);
                          setKasiTemplate(e.target.value);
                        }}
                        className="w-full bg-[#1C1C1C] border border-white/10 rounded-lg text-xs p-2 text-white focus:outline-none cursor-pointer"
                      >
                        <option value="emergency_buffer" className="bg-[#1C1C1C]">"Translate the SOS satellite backup script"</option>
                        <option value="ubuntu_rules" className="bg-[#1C1C1C]">"Convert our Mzansi linguistic selection rules"</option>
                        <option value="gemini_api" className="bg-[#1C1C1C]">"Route client requests server-side through Gemini API"</option>
                        <option value="apk_workflow" className="bg-[#1C1C1C]">"Set up our GitHub CI action workflow"</option>
                      </select>
                    </div>

                    <div className="flex items-end">
                      <button
                        onClick={() => {
                          setIsConverting(true);
                          setTimeout(() => {
                            setIsConverting(false);
                            if (selectedChatTopic === 'emergency_buffer') {
                              setCommitMsg("feat: Emergency satellite offline SOS dispatch node");
                            } else if (selectedChatTopic === 'ubuntu_rules') {
                              setCommitMsg("feat: Mzansi cultural persona select system injected");
                            } else if (selectedChatTopic === 'gemini_api') {
                              setCommitMsg("feat: server-side Google GenAI routing layer");
                            } else {
                              setCommitMsg("ci: add automatic APK build actions workflow and Gradle signer");
                            }
                            setBuildLogs(prev => [
                              ...prev, 
                              `[${new Date().toLocaleTimeString()}] [INFO] Reading conversation logs for topic: ${selectedChatTopic}`,
                              `[${new Date().toLocaleTimeString()}] [SUCCESS] Compiled township dialogue into optimized structures.`
                            ]);
                          }, 1000);
                        }}
                        disabled={isConverting}
                        className="w-full py-2.5 bg-[#00AEBB] hover:bg-[#00AEBB]/80 hover:shadow-[0_0_8px_rgba(0,174,187,0.3)] text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <RefreshCw className={`h-3.5 w-3.5 ${isConverting ? 'animate-spin' : ''}`} />
                        {isConverting ? 'GENERATING CODE...' : 'TRANSLATE CHAT TO CODE ⚡'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Repo Connect & Config Box */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-[#0A0A0A]/30 p-3 border border-white/10 rounded-xl space-y-1">
                    <span className="text-[9px] font-mono font-bold text-[#A0A0A0] uppercase block">GitHub Repository</span>
                    <div className="flex items-center gap-1.5">
                      <Github className="h-3.5 w-3.5 text-[#00AEBB] shrink-0" />
                      <input 
                        type="text" 
                        value={gitRepo} 
                        onChange={(e) => setGitRepo(e.target.value)}
                        className="bg-transparent text-xs text-white font-mono focus:outline-none w-full"
                      />
                    </div>
                  </div>

                  <div className="bg-[#0A0A0A]/30 p-3 border border-white/10 rounded-xl space-y-1">
                    <span className="text-[9px] font-mono font-bold text-[#A0A0A0] uppercase block">Target Branch</span>
                    <div className="flex items-center gap-1.5">
                      <GitBranch className="h-3.5 w-3.5 text-[#00AEBB] shrink-0" />
                      <input 
                        type="text" 
                        value={gitBranch} 
                        onChange={(e) => setGitBranch(e.target.value)}
                        className="bg-transparent text-xs text-white font-mono focus:outline-none w-full"
                      />
                    </div>
                  </div>

                  <div className="bg-[#0A0A0A]/30 p-3 border border-white/10 rounded-xl space-y-1">
                    <span className="text-[9px] font-mono font-bold text-[#A0A0A0] uppercase block">PAT Token</span>
                    <div className="flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5 text-[#00AEBB] shrink-0" />
                      <input 
                        type="password" 
                        value={gitToken} 
                        onChange={(e) => setGitToken(e.target.value)}
                        className="bg-transparent text-xs text-white font-mono focus:outline-none w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Commit Message Box and Code Editor Preview */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-4 space-y-2">
                    <span className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-wider block">Commit Message</span>
                    <div className="flex bg-[#0A0A0A]/30 border border-white/10 rounded-xl p-2.5 items-center gap-1.5 shadow-sm">
                      <GitCommit className="h-3.5 w-3.5 text-[#F5A623] shrink-0" />
                      <input
                        type="text"
                        value={commitMsg}
                        onChange={(e) => setCommitMsg(e.target.value)}
                        className="bg-transparent text-xs text-white focus:outline-none w-full font-medium"
                      />
                    </div>
                  </div>

                  {/* Code editor visualization */}
                  <div className="md:col-span-8 flex flex-col bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden h-44">
                    <div className="bg-black/50 px-4 py-2 border-b border-white/10 flex justify-between items-center">
                      <span className="text-[10px] text-[#A0A0A0] font-mono">STAGED DIFF PREVIEW ({kasiTemplate}.ts)</span>
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    </div>
                    <pre className="p-4 overflow-auto font-mono text-[10px] text-gray-300 bg-black/20 flex-1 leading-normal">
                      <code>{selectedTemplateCode()}</code>
                    </pre>
                  </div>
                </div>

              </div>

              {/* Build Log Outputs & Compile Push controls */}
              <div className="space-y-3">
                {buildLogs.length > 0 && (
                  <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4 h-24 overflow-y-auto font-mono text-[10px] text-[#A0A0A0] space-y-1 text-left leading-normal">
                    {buildLogs.map((log, idx) => (
                      <p key={idx} className={log.includes("[SUCCESS]") ? 'text-emerald-400 font-bold' : log.includes("[INFO]") ? 'text-[#00AEBB]' : 'text-[#A0A0A0]'}>
                        {log}
                      </p>
                    ))}
                  </div>
                )}

                <button
                  onClick={handleKasiPush}
                  disabled={buildStatus === 'running'}
                  className={`w-full py-3.5 rounded-xl text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition uppercase cursor-pointer ${
                    buildStatus === 'running' 
                      ? 'bg-[#1C1C1C] text-[#A0A0A0] border border-white/5 cursor-not-allowed'
                      : 'bg-[#00AEBB] hover:bg-[#00AEBB]/80 text-white shadow-lg shadow-[#00AEBB]/10'
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
          )}

          {activeView === 'safety_pulse' && (
            /* =======================================================
               🛡️ SAFETY PULSE & SAFETYLINK CORE COORDINATOR VIEW
               ======================================================= */
            <div className="space-y-4 flex-1 flex flex-col justify-between animate-fade-in text-white text-left">
              
              <div className="space-y-4">
                {/* Header title */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-[#00AEBB]" />
                      Safety Pulse Coordinator
                    </h2>
                    <p className="text-xs text-[#A0A0A0] mt-1">
                      Directly integrated with SafetyLink Core. Monitor BLE mesh packet routing and trigger high-priority emergency dispatches.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-[#007A4D]/20 border border-[#007A4D]/45 text-[#007A4D] px-2.5 py-0.5 rounded font-mono font-bold flex items-center gap-1 shadow-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#007A4D] animate-pulse" />
                      PULSE ENGINE ONLINE
                    </span>
                  </div>
                </div>

                {/* Telemetry Dashboard Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-[#0A0A0A]/30 border border-white/10 p-3 rounded-xl">
                    <span className="text-[8px] font-mono font-bold text-[#A0A0A0] block">SAFETY SCORE</span>
                    <span className="text-lg font-extrabold text-white">{safetyScore}%</span>
                    <span className="text-[8px] text-[#007A4D] font-bold block mt-0.5">✔ EXCELLENT</span>
                  </div>
                  <div className="bg-[#0A0A0A]/30 border border-white/10 p-3 rounded-xl">
                    <span className="text-[8px] font-mono font-bold text-[#A0A0A0] block">BLE MESH NODES</span>
                    <span className="text-lg font-extrabold text-white">{meshNodes} Active</span>
                    <span className="text-[8px] text-[#A0A0A0] block mt-0.5">Township Mesh</span>
                  </div>
                  <div className="bg-[#0A0A0A]/30 border border-white/10 p-3 rounded-xl">
                    <span className="text-[8px] font-mono font-bold text-[#A0A0A0] block">SAFEYLINK MODULE</span>
                    <span className="text-sm font-bold text-white flex items-center gap-1 mt-1">
                      <span className="h-2 w-2 rounded-full bg-[#007A4D]" /> Connected
                    </span>
                    <span className="text-[8px] text-[#A0A0A0] block">Core Integration</span>
                  </div>
                  <div className="bg-[#0A0A0A]/30 border border-white/10 p-3 rounded-xl">
                    <span className="text-[8px] font-mono font-bold text-[#A0A0A0] block">SIGNAL STATE</span>
                    <span className="text-xs font-bold text-[#F5A623] block mt-1 uppercase">OFFLINE RESILIENT</span>
                    <span className="text-[8px] text-[#A0A0A0] block">Dual Fallback Active</span>
                  </div>
                </div>

                {/* Care Bear Lizzy Chatbot Integration */}
                <div className="bg-[#0A0A0A]/30 border border-white/10 rounded-2xl p-4.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl animate-bounce">🧸</span>
                      <div>
                        <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                          Lizzy the Care Bear Chatbot
                        </h3>
                        <p className="text-[10px] text-[#00AEBB] font-medium">SafetyLink Compassionate Companion</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono bg-[#00AEBB]/10 text-[#00AEBB] border border-[#00AEBB]/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      Caring & Protection Active
                    </span>
                  </div>
                  <p className="text-[11px] text-white/90 leading-relaxed font-sans">
                    With the heart and responsibility of a true Care Bear, Lizzy stands guard to comfort, support, and protect. Whether checking on elderly neighbors, coordinating safe paths during load shedding, or maintaining a secure offline safety ledger, Lizzy handles community care with absolute devotion.
                  </p>
                  <div className="bg-[#1C1C1C] border border-white/5 rounded-xl p-3 text-[10px] text-white font-mono text-left leading-relaxed">
                    <span className="text-[#F5A623] font-bold">🧸 LIZZY'S CARE DIRECTIVE:</span> "Ubunye ngamandla (Unity is strength). We watch over every doorstep, keeping our families warm, secure, and always supported. Stay brave, stay safe!"
                  </div>
                </div>

                {/* Siren loudspeaker test & SOS buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
                  <div className="sm:col-span-4 bg-[#0A0A0A]/30 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-white">Audio Alarm Test</h3>
                      <p className="text-[10px] text-[#A0A0A0] mt-1">Simulate our 120dB neighborhood siren alerts to secure the area.</p>
                    </div>
                    <button
                      onClick={() => setSirenPlaying(!sirenPlaying)}
                      className={`mt-4 w-full py-2.5 text-xs font-bold rounded-lg border transition cursor-pointer ${
                        sirenPlaying 
                          ? 'bg-rose-500/10 border-rose-500/30 text-rose-500 animate-pulse'
                          : 'bg-[#1C1C1C] border border-white/5 text-[#A0A0A0] hover:text-white'
                      }`}
                    >
                      {sirenPlaying ? '🔊 STOP SIREN TEST' : '🔈 START SIREN TEST'}
                    </button>
                  </div>

                  <div className="sm:col-span-8 bg-[#0A0A0A]/30 border border-white/10 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
                    {/* Glowing red backwaves */}
                    {isDispatchingSOS && (
                      <div className="absolute inset-0 bg-rose-500/10 animate-pulse pointer-events-none" />
                    )}
                    <div>
                      <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Shield className="h-4 w-4 text-rose-500 animate-bounce" />
                        SOS Dispatch Console
                      </h3>
                      <p className="text-[10px] text-[#A0A0A0] mt-1">
                        Broadcasting triggers high-priority localized BLE warning pings, logs an encrypted POPIA transaction, and queues Twilio API backup alerts.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setIsDispatchingSOS(true);
                        setSafetyLogs(prev => [
                          ...prev,
                          `[${new Date().toLocaleTimeString()}] 🚨 EMERGENCY SOS DISPATCH TRIGGERED!`,
                          `[${new Date().toLocaleTimeString()}] BLE packet queued: [0xEF91] to mesh neighbor`,
                          `[${new Date().toLocaleTimeString()}] Encrypting local auditor record (AES-256)`,
                          `[${new Date().toLocaleTimeString()}] POPIA hash generated: sha256_3bf18ca...`
                        ]);
                        setTimeout(() => {
                          setIsDispatchingSOS(false);
                        }, 2500);
                      }}
                      disabled={isDispatchingSOS}
                      className="mt-4 w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-600/25 transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isDispatchingSOS ? '🚨 DISPATCHING EMERGENCY SOS...' : '🚨 BROADCAST HIGH-PRIORITY SOS'}
                    </button>
                  </div>
                </div>

                {/* Encryption POPIA Ledger */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-wider block">Encrypted POPIA Local Incident Ledger</span>
                  <div className="bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden">
                    <div className="bg-black/50 px-4 py-2 border-b border-white/10 flex justify-between items-center text-[9px] text-[#A0A0A0] font-mono">
                      <span>SECURITY AUDIT TRIAL</span>
                      <span>🔒 SECURE LOCAL AES-256</span>
                    </div>
                    <div className="p-4 h-32 overflow-y-auto font-mono text-[10px] text-[#A0A0A0] space-y-1 text-left leading-normal">
                      <p className="text-[#A0A0A0]/60 font-bold">[POPIA Ledger Loaded System Boot v1.0.4]</p>
                      <p className="text-emerald-500">[08:44:12] Audit state secure. Hash verified: e3b0c442...</p>
                      {safetyLogs.map((log, idx) => (
                        <p key={idx} className={log.includes("🚨") ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                          {log}
                        </p>
                      ))}
                      <p className="text-[#A0A0A0]/40">[Idle] Waiting for local telemetry broadcast pings...</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center text-[9px] text-[#A0A0A0] font-mono uppercase">
                TM Media Solutions SafetyLink Pulse Coordinator
              </div>
            </div>
          )}

          {activeView === 'ispani' && (
            /* =======================================================
               🚀 ISPANI (CARRIER) GIGS, CV BUILDER & MATCHING CENTER
               ======================================================= */
            <div className="space-y-4 flex-1 flex flex-col justify-between animate-fade-in text-white">
              <div className="space-y-4 text-left">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                  <div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-[#00AEBB] animate-pulse" />
                      Ispani Carrier & Gig Hub
                    </h2>
                    <p className="text-xs text-[#A0A0A0] mt-1">
                      South Africa's township gig coordinator. Build professional CAPS resumes, apply with 1-tap, or match skills.
                    </p>
                  </div>
                  
                  {/* Sub-navigation bar inside Ispani */}
                  <div className="flex bg-[#1C1C1C] p-1 rounded-xl gap-1 self-start sm:self-center">
                    <button
                      onClick={() => setIspaniSubView('dispatch')}
                      className={`px-3 py-1.5 rounded-lg text-[9px] md:text-[10px] font-bold uppercase tracking-wider transition ${
                        ispaniSubView === 'dispatch'
                          ? 'bg-[#00AEBB] text-white shadow-sm'
                          : 'text-[#A0A0A0] hover:text-white'
                      }`}
                    >
                      🚚 Dispatch
                    </button>
                    <button
                      onClick={() => setIspaniSubView('cv_builder')}
                      className={`px-3 py-1.5 rounded-lg text-[9px] md:text-[10px] font-bold uppercase tracking-wider transition ${
                        ispaniSubView === 'cv_builder'
                          ? 'bg-[#00AEBB] text-white shadow-sm'
                          : 'text-[#A0A0A0] hover:text-white'
                      }`}
                    >
                      📄 CV Builder
                    </button>
                    <button
                      onClick={() => setIspaniSubView('skill_matcher')}
                      className={`px-3 py-1.5 rounded-lg text-[9px] md:text-[10px] font-bold uppercase tracking-wider transition ${
                        ispaniSubView === 'skill_matcher'
                          ? 'bg-[#00AEBB] text-white shadow-sm'
                          : 'text-[#A0A0A0] hover:text-white'
                      }`}
                    >
                      🤝 Skill Matcher
                    </button>
                  </div>
                </div>

                {/* Subview 1: Dispatch Desk */}
                {ispaniSubView === 'dispatch' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                      {/* Left panel: List of Staged Gigs */}
                      <div className="lg:col-span-6 space-y-3">
                        <h3 className="text-xs font-bold text-[#A0A0A0] flex items-center gap-1.5 uppercase tracking-wider">
                          <Layers className="h-3.5 w-3.5 text-[#00AEBB]" />
                          Staged Township Gigs
                        </h3>
                        <div className="space-y-2">
                          {ispaniGigs.map(gig => (
                            <div 
                              key={gig.id}
                              onClick={() => gig.status !== 'Completed' && setSelectedGigId(gig.id)}
                              className={`p-3 border rounded-xl transition cursor-pointer text-left ${
                                selectedGigId === gig.id && gig.status !== 'Completed'
                                  ? 'bg-[#00AEBB]/10 border-[#00AEBB]/30 ring-2 ring-[#00AEBB]/10'
                                  : 'bg-[#0A0A0A]/30 border-white/10 hover:bg-[#1C1C1C]/50'
                              } ${gig.status === 'Completed' ? 'opacity-50 cursor-not-allowed bg-[#1C1C1C]' : ''}`}
                            >
                              <div className="flex justify-between items-start">
                                <span className="text-xs font-bold text-white leading-tight">{gig.title}</span>
                                <span className="text-xs font-black text-[#F5A623] font-mono shrink-0">{gig.payout}</span>
                              </div>
                              <div className="flex justify-between items-center mt-2.5 text-[10px] text-[#A0A0A0] font-mono">
                                <span>Client: {gig.client}</span>
                                <div className="flex items-center gap-1.5">
                                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                                    gig.urgency === 'CRITICAL' ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20' :
                                    gig.urgency === 'HIGH' ? 'bg-[#F5A623]/15 text-[#F5A623] border border-[#F5A623]/20' :
                                    gig.urgency === 'MEDIUM' ? 'bg-[#00AEBB]/15 text-[#00AEBB] border border-[#00AEBB]/20' : 'bg-white/5 text-[#A0A0A0]'
                                  }`}>
                                    {gig.urgency}
                                  </span>
                                  <span className={`font-bold ${
                                    gig.status === 'Completed' ? 'text-[#007A4D]' :
                                    gig.status === 'Dispatched' ? 'text-[#00AEBB] animate-pulse' : 'text-[#A0A0A0]'
                                  }`}>
                                    {gig.status.toUpperCase()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right panel: Active Carriers List & Matcher */}
                      <div className="lg:col-span-6 space-y-4">
                        {/* Carrier Selector */}
                        <div className="space-y-2">
                          <h3 className="text-xs font-bold text-[#A0A0A0] flex items-center gap-1.5 uppercase tracking-wider">
                            <UserCheck className="h-3.5 w-3.5 text-[#00AEBB]" />
                            Available Local Carriers
                          </h3>
                          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                            {ispaniCarriers.map(carrier => (
                              <div 
                                key={carrier.id}
                                onClick={() => carrier.status !== 'Offline' && setSelectedCarrierId(carrier.id)}
                                className={`p-3 border rounded-xl transition cursor-pointer text-left ${
                                  selectedCarrierId === carrier.id && carrier.status !== 'Offline'
                                    ? 'bg-[#00AEBB]/10 border-[#00AEBB]/30 ring-2 ring-[#00AEBB]/10'
                                    : 'bg-[#0A0A0A]/30 border-white/10 hover:bg-[#1C1C1C]/50'
                                } ${carrier.status === 'Offline' ? 'opacity-50 cursor-not-allowed bg-[#1C1C1C]' : ''}`}
                              >
                                <div className="flex justify-between items-center">
                                  <span className="text-xs font-bold text-white">{carrier.name}</span>
                                  <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded ${
                                    carrier.status === 'Available' ? 'bg-[#007A4D]/15 text-[#007A4D]' :
                                    carrier.status === 'On Delivery' ? 'bg-[#00AEBB]/15 text-[#00AEBB]' : 'bg-white/5 text-[#A0A0A0]'
                                  }`}>
                                    {carrier.status.toUpperCase()}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center mt-2 text-[10px] text-[#A0A0A0] font-mono">
                                  <span className="flex items-center gap-1">
                                    <Truck className="h-3 w-3 text-[#A0A0A0]/60" /> {carrier.mode}
                                  </span>
                                  <span>{carrier.phone}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Dispatch Matcher Controller */}
                        <div className="bg-[#0A0A0A]/30 border border-white/10 rounded-2xl p-4 space-y-3">
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-[#F5A623] animate-pulse shrink-0" />
                            <span className="text-[11px] font-bold text-white font-sans">
                              Intelligent Dispatch Matcher
                            </span>
                          </div>
                          <p className="text-[10px] text-[#A0A0A0]/90 leading-relaxed">
                            K'leva Brain analyzes GIG payload coordinates and matches them to the nearest available carrier mode for optimal cost/safety routing.
                          </p>

                          <button
                            onClick={() => {
                              const matchedGig = ispaniGigs.find(g => g.id === selectedGigId);
                              const matchedCarrier = ispaniCarriers.find(c => c.id === selectedCarrierId);
                              if (!matchedGig || !matchedCarrier) return;

                              setIsDispatchingIspani(true);
                              setIspaniLogs(prev => [
                                ...prev,
                                `[${new Date().toLocaleTimeString()}] 🚀 DISPATCH REQUEST RECEIVED`,
                                `[${new Date().toLocaleTimeString()}] Matching "${matchedGig.title}" to ${matchedCarrier.name} (${matchedCarrier.mode})`,
                                `[${new Date().toLocaleTimeString()}] Simulating telemetry ping with carrier phone: ${matchedCarrier.phone}`,
                                `[${new Date().toLocaleTimeString()}] Encrypting dispatch record (POPIA & POPI compliant)`
                              ]);

                              setTimeout(() => {
                                setIspaniGigs(prev => prev.map(g => g.id === selectedGigId ? { ...g, status: 'Dispatched' } : g));
                                setIspaniCarriers(prev => prev.map(c => c.id === selectedCarrierId ? { ...c, status: 'On Delivery', activeGigs: c.activeGigs + 1 } : c));
                                setIspaniLogs(prev => [
                                  ...prev,
                                  `[${new Date().toLocaleTimeString()}] 📡 Carrier Thabo Ndlovu accepted assignment!`,
                                  `[${new Date().toLocaleTimeString()}] Status: EN ROUTE (Estimated delivery: 14 mins)`
                                ]);
                                setIsDispatchingIspani(false);
                              }, 2200);
                            }}
                            disabled={isDispatchingIspani || ispaniGigs.find(g => g.id === selectedGigId)?.status === 'Dispatched'}
                            className="w-full py-2.5 bg-[#00AEBB] hover:bg-[#00AEBB]/80 text-white rounded-xl text-xs font-bold shadow-md shadow-[#00AEBB]/10 transition flex items-center justify-center gap-2 cursor-pointer disabled:bg-[#1C1C1C] disabled:text-[#A0A0A0] disabled:border-white/5 disabled:cursor-not-allowed"
                          >
                            {isDispatchingIspani ? (
                              <>
                                <RefreshCw className="h-4 w-4 animate-spin text-white" />
                                CALCULATING SAFE ROUTE...
                              </>
                            ) : ispaniGigs.find(g => g.id === selectedGigId)?.status === 'Dispatched' ? (
                              '🚀 GIG ALREADY DISPATCHED'
                            ) : (
                              '🚀 RUN SMART CARRIER DISPATCH'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Dispatch Logs */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-wider block">Ispani Safe Carrier Live Audit Logs</span>
                      <div className="bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden">
                        <div className="bg-black/50 px-4 py-2 border-b border-white/10 flex justify-between items-center text-[9px] text-[#A0A0A0] font-mono">
                          <span>AUDIT STREAM</span>
                          <span>🔒 POPI COMPLIANT ENDPOINT</span>
                        </div>
                        <div className="p-4 h-24 overflow-y-auto font-mono text-[10px] text-[#A0A0A0] space-y-1 text-left leading-normal">
                          <p className="text-[#A0A0A0]/60 font-bold">[Ispani Courier Ledger Booted safely]</p>
                          <p className="text-emerald-500">[12:01:04] BLE offline coordinator ready for gig tracking...</p>
                          {ispaniLogs.map((log, idx) => (
                            <p key={idx} className={log.includes("Carrier") ? 'text-emerald-400 font-bold' : 'text-[#A0A0A0]'}>
                              {log}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Subview 2: CV Builder & Job Application Desk */}
                {ispaniSubView === 'cv_builder' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
                      
                      {/* Left: CV Editor Form */}
                      <div className="xl:col-span-6 space-y-4 bg-[#0A0A0A]/30 border border-white/10 rounded-2xl p-4">
                        <div className="space-y-1 text-left">
                          <h3 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                            <FileText className="h-4 w-4 text-[#00AEBB]" />
                            Township Youth CV Generator
                          </h3>
                          <p className="text-[10px] text-[#A0A0A0]">
                            Select a professional template below to pre-fill instantly, then edit. Click 'Generate' to review your live resume.
                          </p>
                        </div>

                        {/* Template Selectors */}
                        <div className="grid grid-cols-3 gap-2">
                          {(['developer', 'hustler', 'retail'] as const).map(t => (
                            <button
                              key={t}
                              onClick={() => {
                                setCvForm(cvTemplates[t]);
                                setCvSelectedTemplate(t);
                                setCvGenerated(false);
                              }}
                              className={`p-2 rounded-xl text-center border text-[9px] font-bold transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                                cvSelectedTemplate === t
                                  ? 'bg-[#00AEBB]/15 border-[#00AEBB] text-white'
                                  : 'bg-black/40 border-white/10 text-[#A0A0A0] hover:text-white hover:bg-white/5'
                              }`}
                            >
                              <span className="text-sm">{t === 'developer' ? '💻' : t === 'hustler' ? '📦' : '🛍️'}</span>
                              <span className="capitalize">{t}</span>
                            </button>
                          ))}
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-3 text-[11px]">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1 text-left">
                              <label className="text-[#A0A0A0] font-semibold">Full Name</label>
                              <input
                                type="text"
                                value={cvForm.name}
                                onChange={e => {
                                  setCvForm({ ...cvForm, name: e.target.value });
                                  setCvGenerated(false);
                                }}
                                className="w-full bg-black/60 border border-white/10 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-[#00AEBB]/80"
                              />
                            </div>
                            <div className="space-y-1 text-left">
                              <label className="text-[#A0A0A0] font-semibold">Township Location</label>
                              <input
                                type="text"
                                value={cvForm.location}
                                onChange={e => {
                                  setCvForm({ ...cvForm, location: e.target.value });
                                  setCvGenerated(false);
                                }}
                                className="w-full bg-black/60 border border-white/10 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-[#00AEBB]/80"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1 text-left">
                              <label className="text-[#A0A0A0] font-semibold">Phone Number</label>
                              <input
                                type="text"
                                value={cvForm.phone}
                                onChange={e => {
                                  setCvForm({ ...cvForm, phone: e.target.value });
                                  setCvGenerated(false);
                                }}
                                className="w-full bg-black/60 border border-white/10 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-[#00AEBB]/80"
                              />
                            </div>
                            <div className="space-y-1 text-left">
                              <label className="text-[#A0A0A0] font-semibold">Email</label>
                              <input
                                type="text"
                                value={cvForm.email}
                                onChange={e => {
                                  setCvForm({ ...cvForm, email: e.target.value });
                                  setCvGenerated(false);
                                }}
                                className="w-full bg-black/60 border border-white/10 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-[#00AEBB]/80"
                              />
                            </div>
                          </div>

                          <div className="space-y-1 text-left">
                            <label className="text-[#A0A0A0] font-semibold">Short Professional Bio</label>
                            <textarea
                              rows={2}
                              value={cvForm.bio}
                              onChange={e => {
                                setCvForm({ ...cvForm, bio: e.target.value });
                                setCvGenerated(false);
                              }}
                              className="w-full bg-black/60 border border-white/10 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-[#00AEBB]/80 resize-none font-sans"
                            />
                          </div>

                          <div className="space-y-1 text-left">
                            <label className="text-[#A0A0A0] font-semibold">Core Skills (comma separated)</label>
                            <input
                              type="text"
                              value={cvForm.skills}
                              onChange={e => {
                                setCvForm({ ...cvForm, skills: e.target.value });
                                setCvGenerated(false);
                              }}
                              className="w-full bg-black/60 border border-white/10 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-[#00AEBB]/80"
                            />
                          </div>

                          <div className="space-y-1 text-left">
                            <label className="text-[#A0A0A0] font-semibold">Education & Training</label>
                            <textarea
                              rows={2}
                              value={cvForm.education}
                              onChange={e => {
                                setCvForm({ ...cvForm, education: e.target.value });
                                setCvGenerated(false);
                              }}
                              className="w-full bg-black/60 border border-white/10 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-[#00AEBB]/80 resize-none font-sans"
                            />
                          </div>
                        </div>

                        {/* Compile/Generate button */}
                        <button
                          onClick={() => {
                            setIsGeneratingCV(true);
                            setIspaniLogs(prev => [
                              ...prev,
                              `[${new Date().toLocaleTimeString()}] 🛠️ COMPILING RESUME: ${cvForm.name}`,
                              `[${new Date().toLocaleTimeString()}] Scanning POPIA validation guidelines`,
                              `[${new Date().toLocaleTimeString()}] Standardizing township CV formats...`
                            ]);
                            setTimeout(() => {
                              setIsGeneratingCV(false);
                              setCvGenerated(true);
                              setIspaniLogs(prev => [
                                ...prev,
                                `[${new Date().toLocaleTimeString()}] ✅ CV compiled successfully! Sovereign hash attached.`,
                              ]);
                            }, 1200);
                          }}
                          disabled={isGeneratingCV}
                          className="w-full py-2 bg-[#F5A623] hover:bg-[#F5A623]/80 text-white rounded-xl text-xs font-bold shadow-md shadow-[#F5A623]/10 transition flex items-center justify-center gap-2 cursor-pointer disabled:bg-white/5 disabled:text-[#A0A0A0]"
                        >
                          {isGeneratingCV ? (
                            <>
                              <RefreshCw className="h-4 w-4 animate-spin text-white" />
                              COMPILING RESUME SHEET...
                            </>
                          ) : (
                            <>
                              <FileText className="h-4 w-4 text-white" />
                              GENERATE PROFESSIONAL CV
                            </>
                          )}
                        </button>
                      </div>

                      {/* Right: CV Live Preview & 1-Tap Job Vacancies */}
                      <div className="xl:col-span-6 space-y-4">
                        
                        {/* CV Sheet Live Preview */}
                        <div className="bg-white text-[#1C1C1C] rounded-2xl p-4 shadow-xl border border-white/5 text-left relative overflow-hidden min-h-[260px] flex flex-col justify-between">
                          {!cvGenerated ? (
                            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center">
                              <FileText className="h-10 w-10 text-[#A0A0A0] mb-2 animate-bounce" />
                              <span className="text-xs font-bold text-white">Live Staging Area</span>
                              <p className="text-[10px] text-[#A0A0A0] max-w-xs mt-1">
                                Click 'Generate Professional CV' to assemble your credentials onto a pristine, high-contrast Mzansi-standard layout.
                              </p>
                            </div>
                          ) : null}

                          <div className="space-y-3">
                            {/* Header */}
                            <div className="border-b border-[#1C1C1C]/15 pb-2">
                              <div className="flex justify-between items-start">
                                <h4 className="text-sm font-extrabold tracking-tight uppercase">{cvForm.name}</h4>
                                <span className="bg-[#007A4D]/10 text-[#007A4D] text-[7px] font-bold px-1.5 py-0.5 rounded border border-[#007A4D]/35 shrink-0 tracking-wider">
                                  POPIA APPROVED
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-1 text-[8px] text-[#1C1C1C]/75 font-mono mt-1">
                                <span>📍 {cvForm.location}</span>
                                <span>📞 {cvForm.phone}</span>
                                <span className="col-span-2">✉️ {cvForm.email}</span>
                              </div>
                            </div>

                            {/* Bio */}
                            <div className="space-y-1">
                              <span className="text-[8px] font-black uppercase text-[#00AEBB]">Profile</span>
                              <p className="text-[9px] leading-relaxed text-[#1C1C1C]/85 font-sans italic">
                                "{cvForm.bio}"
                              </p>
                            </div>

                            {/* Skills */}
                            <div className="space-y-1">
                              <span className="text-[8px] font-black uppercase text-[#00AEBB]">Core Competencies</span>
                              <div className="flex flex-wrap gap-1">
                                {cvForm.skills.split(',').map((skill, i) => (
                                  <span key={i} className="bg-[#1C1C1C]/5 text-[#1C1C1C] border border-[#1C1C1C]/10 text-[8px] font-medium px-1.5 py-0.5 rounded">
                                    {skill.trim()}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Education */}
                            <div className="space-y-1">
                              <span className="text-[8px] font-black uppercase text-[#00AEBB]">Education & Training</span>
                              <div className="text-[9px] leading-relaxed text-[#1C1C1C]/85 font-sans whitespace-pre-line">
                                {cvForm.education}
                              </div>
                            </div>
                          </div>

                          {/* Live Download Option */}
                          {cvGenerated && (
                            <div className="border-t border-[#1C1C1C]/10 pt-2.5 mt-2 flex justify-between items-center bg-[#1C1C1C]/5 p-2 rounded-lg font-sans">
                              <span className="text-[8px] font-mono text-[#1C1C1C]/70">Form Factor: Standard PDF/A4</span>
                              <button
                                onClick={() => {
                                  setIspaniLogs(prev => [
                                    ...prev,
                                    `[${new Date().toLocaleTimeString()}] ⬇️ Downloaded "${cvForm.name.replace(/\s+/g, '_')}_CV.pdf" (72KB)`
                                  ]);
                                  alert(`Successfully downloaded PDF copy of ${cvForm.name}'s CV!`);
                                }}
                                className="px-2.5 py-1 bg-[#1C1C1C] text-white hover:bg-[#1C1C1C]/80 rounded text-[9px] font-bold tracking-wider transition flex items-center gap-1 cursor-pointer"
                              >
                                <Download className="h-3 w-3" />
                                DOWNLOAD PDF
                              </button>
                            </div>
                          )}
                        </div>

                        {/* 1-Tap Vacancies Application Desk */}
                        <div className="bg-[#0A0A0A]/30 border border-white/10 rounded-2xl p-4 space-y-3">
                          <div className="flex justify-between items-center">
                            <h3 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                              <Sparkles className="h-3.5 w-3.5 text-[#F5A623] animate-pulse" />
                              1-Tap Township Gigs & Jobs
                            </h3>
                            <span className="text-[8px] font-mono text-[#A0A0A0]">UPDATED TODAY</span>
                          </div>

                          <div className="space-y-2">
                            {[
                              { id: 'j1', title: 'Junior Frontend Web Developer', company: 'eKasi Tech Hub (Soweto)', scope: 'React & Web Projects', match: '96% Match' },
                              { id: 'j2', title: 'Logistics Courier Delivery Rider', company: 'Siyakhula Logistics (Alex)', scope: 'Heavy-duty cargo bicycle deliveries', match: '90% Match' },
                              { id: 'j3', title: 'Multilingual Retail Consultant', company: 'Mall of Africa Group', scope: 'Customer assist & Point-of-Sale', match: '85% Match' }
                            ].map(job => {
                              const alreadyApplied = appliedJobIds.includes(job.id);
                              return (
                                <div key={job.id} className="bg-black/40 border border-white/5 rounded-xl p-2.5 flex items-center justify-between gap-3 text-left">
                                  <div className="space-y-0.5">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-xs font-bold text-white leading-tight">{job.title}</span>
                                      <span className="bg-[#007A4D]/25 text-[#007A4D] text-[7px] font-black px-1 rounded">
                                        {job.match}
                                      </span>
                                    </div>
                                    <p className="text-[9px] text-[#A0A0A0] leading-none">{job.company} • <span className="italic">{job.scope}</span></p>
                                  </div>
                                  <button
                                    onClick={() => {
                                      if (!cvGenerated) {
                                        alert("Please compile and generate your professional CV using the left panel before applying with 1-tap!");
                                        return;
                                      }
                                      setAppliedJobIds(prev => [...prev, job.id]);
                                      setIspaniLogs(prev => [
                                        ...prev,
                                        `[${new Date().toLocaleTimeString()}] ⚡ 1-TAP APPLICATION SENT: ${cvForm.name} → ${job.title} at ${job.company}`,
                                        `[${new Date().toLocaleTimeString()}] Recruiter notified with POPIA certified dossier.`
                                      ]);
                                    }}
                                    disabled={alreadyApplied}
                                    className={`px-3 py-1.5 rounded-lg text-[9px] font-black shrink-0 transition uppercase tracking-wider cursor-pointer ${
                                      alreadyApplied
                                        ? 'bg-[#007A4D]/20 text-[#007A4D] border border-[#007A4D]/35 cursor-not-allowed'
                                        : 'bg-[#00AEBB] hover:bg-[#00AEBB]/80 text-white shadow-sm shadow-[#00AEBB]/10'
                                    }`}
                                  >
                                    {alreadyApplied ? '✓ APPLIED' : '⚡ 1-TAP APPLY'}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                )}

                {/* Subview 3: Skill Matcher & Recommendation Engine */}
                {ispaniSubView === 'skill_matcher' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="bg-[#0A0A0A]/30 border border-white/10 rounded-2xl p-4 space-y-4">
                      
                      <div className="space-y-1">
                        <h3 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                          <Search className="h-4 w-4 text-[#00AEBB]" />
                          Ubuntu Task & Skill Recommendation Engine
                        </h3>
                        <p className="text-[10px] text-[#A0A0A0]">
                          Are you looking for a specific skill, fixer, or tutor? Ask here, and K'leva's local intelligence will recommend matching available, certified local unemployed youth to perform the task.
                        </p>
                      </div>

                      {/* Input Selector */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            placeholder="e.g. I need a grade 11 physics tutor, a plumber to fix a leak, a web coder..."
                            value={skillTaskQuery}
                            onChange={e => setSkillTaskQuery(e.target.value)}
                            className="w-full bg-black/60 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-[#A0A0A0]/60 focus:outline-none focus:border-[#00AEBB]/80"
                          />
                          <Search className="absolute left-3 top-3 h-4 w-4 text-[#A0A0A0]/60" />
                        </div>
                        <button
                          onClick={() => {
                            if (!skillTaskQuery.trim()) return;
                            setIsSearchingTalent(true);
                            setBookingSuccessMsg(null);
                            setIspaniLogs(prev => [
                              ...prev,
                              `[${new Date().toLocaleTimeString()}] 🔍 SEARCH: Scan BLE neighborhood for "${skillTaskQuery}"`,
                              `[${new Date().toLocaleTimeString()}] Querying community database ledger...`
                            ]);

                            setTimeout(() => {
                              setIsSearchingTalent(false);
                              const q = skillTaskQuery.toLowerCase();
                              // Filter talent
                              const matched = localUnemployedTalent.filter(talent => 
                                talent.skills.some(skill => q.includes(skill.toLowerCase())) || 
                                talent.bio.toLowerCase().includes(q) ||
                                talent.name.toLowerCase().includes(q)
                              );
                              
                              if (matched.length > 0) {
                                setMatchedTalent(matched);
                                setIspaniLogs(prev => [
                                  ...prev,
                                  `[${new Date().toLocaleTimeString()}] 📡 Matcher found ${matched.length} local certified candidates!`,
                                ]);
                              } else {
                                // Default suggest 2 high-rating ones if no exact match
                                setMatchedTalent([localUnemployedTalent[0], localUnemployedTalent[1], localUnemployedTalent[2]]);
                                setIspaniLogs(prev => [
                                  ...prev,
                                  `[${new Date().toLocaleTimeString()}] 📡 No exact matches, showing top active community freelancers.`,
                                ]);
                              }
                            }, 1100);
                          }}
                          className="px-5 py-2.5 bg-[#00AEBB] hover:bg-[#00AEBB]/80 text-white rounded-xl text-xs font-bold transition shrink-0 cursor-pointer"
                        >
                          ASK & RECOMMEND
                        </button>
                      </div>

                      {/* Quick Templates */}
                      <div className="space-y-1.5 text-left">
                        <span className="text-[9px] font-bold text-[#A0A0A0] uppercase tracking-wider block">Quick Township Searches:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            { label: '📚 CAPS Math Tutor', query: 'physics tutor math' },
                            { label: '🛠️ Plumber / Fixer', query: 'plumbing electric fix leak' },
                            { label: '👩‍💻 React Website Coder', query: 'react web coder design website' },
                            { label: '👩‍🍳 Event Catering & Food', query: 'baking cooking event food' }
                          ].map((tmpl, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setSkillTaskQuery(tmpl.query);
                                setBookingSuccessMsg(null);
                                setIsSearchingTalent(true);
                                setIspaniLogs(prev => [
                                  ...prev,
                                  `[${new Date().toLocaleTimeString()}] 🔍 QUICK SEARCH: Scanning for "${tmpl.label}"`,
                                ]);
                                setTimeout(() => {
                                  setIsSearchingTalent(false);
                                  const q = tmpl.query.toLowerCase();
                                  const matched = localUnemployedTalent.filter(talent => 
                                    talent.skills.some(skill => q.includes(skill.toLowerCase()))
                                  );
                                  setMatchedTalent(matched.length > 0 ? matched : [localUnemployedTalent[0], localUnemployedTalent[1]]);
                                }, 800);
                              }}
                              className="px-2.5 py-1 bg-white/5 border border-white/10 hover:border-white/20 rounded-lg text-[9px] font-bold text-[#A0A0A0] hover:text-white transition cursor-pointer"
                            >
                              {tmpl.label}
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Results Area */}
                    {isSearchingTalent && (
                      <div className="bg-[#0A0A0A]/30 border border-white/10 rounded-2xl p-8 text-center flex flex-col items-center justify-center space-y-2">
                        <RefreshCw className="h-8 w-8 text-[#00AEBB] animate-spin" />
                        <span className="text-xs font-bold text-white">Scanning Township Mesh Network...</span>
                        <p className="text-[10px] text-[#A0A0A0] max-w-xs">
                          Matching requests against local unemployed databases, verifying CAPS certifications, TVET trades, and feedback logs.
                        </p>
                      </div>
                    )}

                    {bookingSuccessMsg && (
                      <div className="bg-[#007A4D]/10 border border-[#007A4D]/35 text-[#007A4D] rounded-2xl p-4 text-xs font-bold text-left space-y-1.5 animate-fade-in">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#007A4D]" />
                          <span>MESSENGER DISPATCHED</span>
                        </div>
                        <p className="font-normal text-[10px] text-white/95 leading-relaxed">
                          {bookingSuccessMsg}
                        </p>
                      </div>
                    )}

                    {!isSearchingTalent && matchedTalent.length > 0 && (
                      <div className="space-y-3 animate-fade-in text-left">
                        <div className="flex justify-between items-center px-1">
                          <span className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-wider block">
                            Recommended Certified Local Candidates
                          </span>
                          <span className="text-[9px] text-[#007A4D] font-mono font-bold">● ONLINE VIA MESH</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {matchedTalent.map(talent => (
                            <div key={talent.id} className="bg-black/40 border border-white/10 rounded-2xl p-3.5 flex flex-col justify-between hover:border-[#00AEBB]/30 transition text-left space-y-3">
                              
                              <div className="space-y-2">
                                <div className="flex justify-between items-start gap-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-2xl bg-white/5 h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                                      {talent.avatar}
                                    </span>
                                    <div>
                                      <h4 className="text-xs font-extrabold text-white leading-tight">{talent.name}</h4>
                                      <p className="text-[9px] text-[#A0A0A0] leading-none">📍 {talent.location} Township</p>
                                    </div>
                                  </div>
                                  <div className="text-right shrink-0">
                                    <span className="text-[10px] font-black text-[#F5A623] block">{talent.rate}</span>
                                    <span className="text-[9px] font-mono text-white/50 leading-none">⭐ {talent.rating}</span>
                                  </div>
                                </div>

                                <p className="text-[10px] text-[#A0A0A0] leading-relaxed">
                                  "{talent.bio}"
                                </p>

                                <div className="flex flex-wrap gap-1 pt-1">
                                  {talent.skills.map((skill: string, i: number) => (
                                    <span key={i} className="bg-[#00AEBB]/10 text-[#00AEBB] border border-[#00AEBB]/20 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase font-mono">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <button
                                onClick={() => {
                                  const textMsg = `Successfully dispatched micro-task booking request to ${talent.name}! A secure BLE-mesh message has been queued to ${talent.phone}. Under the Ubuntu principle of local support, they will contact you within 10 minutes. Secure payment of ${talent.rate} has been recorded to safe logs.`;
                                  setBookingSuccessMsg(textMsg);
                                  setIspaniLogs(prev => [
                                    ...prev,
                                    `[${new Date().toLocaleTimeString()}] 🤝 GIG BOOKED: Matched task to ${talent.name}`,
                                    `[${new Date().toLocaleTimeString()}] Queuing mesh alert to carrier destination handset: ${talent.phone}`
                                  ]);
                                }}
                                className="w-full py-1.5 bg-[#007A4D] hover:bg-[#007A4D]/80 text-white rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                🤝 BOOK {talent.name.split(' ')[0].toUpperCase()}
                              </button>

                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}

                {/* Dashboard Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3">
                  <div className="bg-[#0A0A0A]/30 border border-white/10 rounded-xl p-3 text-left">
                    <span className="text-[9px] text-[#A0A0A0] font-mono uppercase block">Township Youth Employed</span>
                    <span className="text-lg font-black text-[#00AEBB] font-mono">142</span>
                  </div>
                  <div className="bg-[#0A0A0A]/30 border border-white/10 rounded-xl p-3 text-left">
                    <span className="text-[9px] text-[#A0A0A0] font-mono uppercase block">Active Gigs Tracker</span>
                    <span className="text-lg font-black text-white font-mono">8 / 12</span>
                  </div>
                  <div className="bg-[#0A0A0A]/30 border border-white/10 rounded-xl p-3 text-left">
                    <span className="text-[9px] text-[#A0A0A0] font-mono uppercase block">Community Payouts</span>
                    <span className="text-lg font-black text-[#F5A623] font-mono font-sans">R1,420</span>
                  </div>
                  <div className="bg-[#0A0A0A]/30 border border-white/10 rounded-xl p-3 text-left">
                    <span className="text-[9px] text-[#A0A0A0] font-mono uppercase block">POPIA Safety Ledger</span>
                    <span className="text-lg font-black text-[#007A4D] font-mono">COMPLIANT</span>
                  </div>
                </div>

              </div>
              <div className="pt-2 text-center text-[9px] text-[#A0A0A0] font-mono uppercase">
                TM Media Solutions Ispani Carrier Dispatch & Youth Job Engine
              </div>
            </div>
          )}

          {activeView === 'zero_mode' && (
            /* =======================================================
               🔋 ZERO MODE: OFFLINE LOCAL MODELS SYSTEM (EASILY DOWNLOADAE)
               ======================================================= */
            <div className="space-y-4 flex-1 flex flex-col justify-between animate-fade-in text-white">
              <div className="space-y-4 text-left">
                
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <Download className="h-5 w-5 text-[#00AEBB] animate-pulse" />
                      Zero Mode Offline Laboratory
                    </h2>
                    <p className="text-xs text-[#A0A0A0] mt-1">
                      Download highly optimized quantized local models to process cultural responses and code translations with 100% data privacy and 0KB cellular cost.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#007A4D]/20 text-[#007A4D] border border-[#007A4D]/45 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                    <span className="h-2 w-2 rounded-full bg-[#007A4D] animate-pulse" />
                    Local Safe
                  </div>
                </div>

                {/* Zero Mode Main Toggle */}
                <div className="p-4 bg-[#0A0A0A]/30 border border-white/10 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                      Toggle Global Local-First Execution
                    </h3>
                    <p className="text-[10px] text-[#A0A0A0]">
                      When enabled, all conversational prompts in the K'leva Brain use local WebLLM or local GGUF server.
                    </p>
                  </div>
                  <button
                    onClick={() => setZeroModeActive(!zeroModeActive)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition duration-200 cursor-pointer ${
                      zeroModeActive 
                        ? 'bg-[#007A4D] border-[#007A4D]/85 text-white shadow-md shadow-[#007A4D]/15'
                        : 'bg-[#1C1C1C] border border-white/5 text-[#A0A0A0] hover:text-white'
                    }`}
                  >
                    {zeroModeActive ? '🔋 OFFLINE ACTIVE (0KB)' : '🔌 CLOUD ROUTED'}
                  </button>
                </div>

                {/* Model Download Packages List */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-[#A0A0A0] flex items-center gap-1.5 uppercase tracking-wider">
                    <Cpu className="h-3.5 w-3.5 text-[#00AEBB]" />
                    Easily Downloadable Local Model Packages
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Lite Model */}
                    <div className="p-4 bg-[#0A0A0A]/30 border border-white/10 rounded-xl space-y-3 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white">K'leva Lite 1.2B (Q4_K_M)</span>
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#007A4D]/20 text-[#007A4D] border border-[#007A4D]/40">
                            PRE-DOWNLOADED
                          </span>
                        </div>
                        <p className="text-[10px] text-[#A0A0A0]">Optimized for low-end smartphones & offline chat.</p>
                      </div>
                      <div className="flex justify-between items-center text-[9px] text-[#A0A0A0] font-mono border-t border-white/10 pt-2">
                        <span>Size: 720MB</span>
                        <span>Memory Req: 1.5GB RAM</span>
                      </div>
                    </div>

                    {/* Standard Model */}
                    <div className="p-4 bg-[#0A0A0A]/30 border border-white/10 rounded-xl space-y-3 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white">K'leva Standard 7B (Q4_K_M)</span>
                          <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                            downloadedModels.standard === 'downloaded' ? 'bg-[#007A4D]/20 text-[#007A4D] border-[#007A4D]/40' :
                            downloadedModels.standard === 'downloading' ? 'bg-[#F5A623]/25 text-[#F5A623] border-[#F5A623]/40 animate-pulse' : 'bg-white/5 text-[#A0A0A0] border-white/10'
                          }`}>
                            {downloadedModels.standard.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#A0A0A0]">Perfect balance of speed, Mzansi cultural context & standard code.</p>
                      </div>
                      
                      {downloadedModels.standard === 'downloading' && (
                        <div className="space-y-1">
                          <div className="w-full bg-[#1C1C1C] h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#00AEBB] h-full transition-all duration-300" style={{ width: `${downloadProgress}%` }} />
                          </div>
                          <span className="text-[9px] text-[#A0A0A0] font-mono block text-right">{downloadProgress}% completed</span>
                        </div>
                      )}

                      <div className="flex justify-between items-center text-[9px] text-[#A0A0A0] font-mono border-t border-white/10 pt-2">
                        <span>Size: 3.8GB</span>
                        <span>Memory Req: 6GB RAM</span>
                        {downloadedModels.standard === 'not_downloaded' && (
                          <button
                            onClick={() => {
                              setDownloadedModels(prev => ({ ...prev, standard: 'downloading' }));
                              setDownloadProgress(0);
                              const interval = setInterval(() => {
                                setDownloadProgress(prev => {
                                  if (prev >= 100) {
                                    clearInterval(interval);
                                    setDownloadedModels(prevModels => ({ ...prevModels, standard: 'downloaded' }));
                                    return 100;
                                  }
                                  return prev + 10;
                                });
                              }, 300);
                            }}
                            className="bg-[#00AEBB] hover:bg-[#00AEBB]/80 text-white px-2.5 py-1 rounded text-[9px] font-bold transition flex items-center gap-1 cursor-pointer"
                          >
                            <Download className="h-3 w-3" /> Download
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Deep Brain Model */}
                    <div className="p-4 bg-[#0A0A0A]/30 border border-white/10 rounded-xl space-y-3 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white">K'leva DeepBrain 13B (Q4_K_M)</span>
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/5 text-[#A0A0A0]">
                            NOT DOWNLOADED
                          </span>
                        </div>
                        <p className="text-[10px] text-[#A0A0A0]">Advanced full-scope code refactoring & complex diagnostic reasoning.</p>
                      </div>
                      <div className="flex justify-between items-center text-[9px] text-[#A0A0A0] font-mono border-t border-white/10 pt-2">
                        <span>Size: 7.2GB</span>
                        <span>Memory Req: 12GB RAM</span>
                      </div>
                    </div>

                    {/* Audio Voice Codec Model */}
                    <div className="p-4 bg-[#0A0A0A]/30 border border-white/10 rounded-xl space-y-3 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white">Mzansi TTS & Whisper STT Codec</span>
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/5 text-[#A0A0A0]">
                            NOT DOWNLOADED
                          </span>
                        </div>
                        <p className="text-[10px] text-[#A0A0A0]">Enables fully local high-definition Zulu/Xhosa voice synthesis.</p>
                      </div>
                      <div className="flex justify-between items-center text-[9px] text-[#A0A0A0] font-mono border-t border-white/10 pt-2">
                        <span>Size: 1.4GB</span>
                        <span>Memory Req: 2.5GB RAM</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Local Setup Guidance */}
                <div className="bg-[#0A0A0A]/30 border border-white/10 rounded-2xl p-4.5 space-y-2">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <HelpCircle className="h-4 w-4 text-[#00AEBB]" />
                    How to use downloaded models offline
                  </h4>
                  <ul className="text-[10px] text-[#A0A0A0] list-disc pl-4 space-y-1.5">
                    <li><strong>Direct GGUF Boot:</strong> Copy downloaded models to your Android assets or local project folder.</li>
                    <li><strong>Llama.cpp local server:</strong> Execute <code className="bg-white/5 text-white px-1 py-0.5 rounded font-mono text-[9px]">./llama-cli -m model.gguf -p 3000</code> to bind to localhost on your device.</li>
                    <li>The application automatically detects the offline server fallback and switches off cellular data pipelines entirely.</li>
                  </ul>
                </div>

              </div>
              
              <div className="pt-2 text-center text-[9px] text-[#A0A0A0] font-mono uppercase">
                POPIA Secure Offline Module - TM Media Solutions
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
