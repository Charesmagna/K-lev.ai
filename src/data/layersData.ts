import { Layer, LanguageInfo, PersonaConfig, GraphNode, GraphLink, RoadmapPhase, MetricKPI } from '../types';

export const K_LEVA_LAYERS: Layer[] = [
  {
    id: 1,
    title: "South African Brain (RAG Engine)",
    subtitle: "Local-First Semantic Knowledge Engine",
    category: "core",
    icon: "Brain",
    description: "The core retrieval and inference hub, running advanced semantic search over South African national archives, legal codes, and organizational knowledge bases without relying on public cloud endpoints.",
    keyFeatures: [
      "Offline RAG Architecture enabling true data sovereignty.",
      "Local Document Ingestion (PDF, TXT, DOCX) with smart paragraph-level chunking.",
      "Fastembed and TF-IDF fallback for lightweight, high-performance edge vectorization.",
      "Source attribution maps directly linking answers back to physical document paths."
    ],
    techStack: ["Ollama", "Llama 3.2 (3B/8B)", "Fastembed", "FAISS VectorDB", "Drizzle & SQLite"],
    popiaCompliance: "Strict compliance. No document fragments or prompt vectors are transmitted outside the host container or physical edge device.",
    evaluationMetrics: ["Mean Reciprocal Rank (MRR): >0.88", "RAG Triad faithfulness: >92%", "Retrieval Latency: <180ms"]
  },
  {
    id: 2,
    title: "Local Personality Layer",
    subtitle: "Cultural Adaptation & Persona Modeler",
    category: "adaptation",
    icon: "Smile",
    description: "Adapts K'lev.ai's core linguistic output to reflect South African cultural paradigms, values (such as Ubuntu), local idioms, and contextually appropriate levels of respect.",
    keyFeatures: [
      "Dynamic persona morphing matching local demographics and expectations.",
      "Ubuntu context reasoning, emphasizing community, consensus, and respectful address.",
      "Slang and colloquial integration mapped accurately without feeling manufactured.",
      "Multi-modal response tuning based on communication mode (text, voice, structured SMS)."
    ],
    techStack: ["Prompt Template Orchestrators", "Local LLM Fine-Tuning", "Ubuntu Principle Knowledge Store"],
    popiaCompliance: "Demographic preferences and tone profiles are processed locally in-memory and are never stored alongside personally identifiable fields.",
    evaluationMetrics: ["Cultural Relevance Rating: >90%", "Colloquial Appropriateness: >94%", "Brand Tone Compliance: 98%"]
  },
  {
    id: 3,
    title: "Eleven Languages Layer",
    subtitle: "Indigenous Language Synthesis & Translation",
    category: "adaptation",
    icon: "Languages",
    description: "Providing high-fidelity multi-lingual synthesis, text-to-speech (TTS), automatic speech recognition (ASR), and translation for South Africa's 11 official languages.",
    keyFeatures: [
      "Universal language routing that auto-detects input language in real-time.",
      "High-accuracy translation pipelines for low-resource indigenous languages.",
      "Edge-deployable TTS models providing clear, human-like voice delivery in local accents.",
      "ASR optimized for code-switching (mixing languages mid-sentence) common in urban areas."
    ],
    techStack: ["Eleven Multilingual v2", "Whisper-Edge", "NLLB-200 (No Language Left Behind)", "FastText Classifier"],
    popiaCompliance: "Audio recordings and voice prints are discarded immediately after transcription unless explicit user consent is logged for model refinement.",
    evaluationMetrics: ["Code-Switching Word Error Rate (WER): <12%", "Language Detection Accuracy: 99.2%", "Voice Latency (TTS): <250ms"]
  },
  {
    id: 4,
    title: "SafetyLink Integration",
    subtitle: "High-Priority Emergency Escalation",
    category: "safety",
    icon: "ShieldAlert",
    description: "An ultra-resilient safety, alert orchestration, and auditability framework derived from the SafetyLink ecosystem, guaranteeing message delivery under worst-case network events.",
    keyFeatures: [
      "Instantaneous, high-priority emergency triggering with zero-overhead.",
      "Multi-channel fallback routing (SMS, WhatsApp, voice call, edge mesh).",
      "Immutable local audit trail capturing exact delivery receipts and agent timelines.",
      "Offline alert buffering with automated cloud synchronization upon reconnection."
    ],
    techStack: ["Twilio Gateway API", "WhatsApp Business REST Client", "BLE Mesh Protocols", "IndexedDB Buffers"],
    popiaCompliance: "Critical medical/location telemetry is encrypted client-side with AES-256 and only decrypted inside authorized emergency response consoles.",
    evaluationMetrics: ["Primary Delivery Latency: <1.8s", "Escalation Success Rate: 100% under normal network conditions", "P2P Mesh Hop Overhead: <120ms"]
  },
  {
    id: 5,
    title: "SA Memory (Knowledge Graph)",
    subtitle: "Provenance-Rich Context Ledger",
    category: "core",
    icon: "Database",
    description: "Acts as K'lev.ai's persistent memory, storing semantic relations, historical facts, regional context, and user history within an queryable, provenance-rich knowledge graph.",
    keyFeatures: [
      "Dynamic Entity-Relationship extraction from local document streams.",
      "Strict provenance mapping, tagging every fact with author, document source, and date.",
      "Chronological incident timelines designed for emergency and administrative auditing.",
      "Bi-directional graph traversal allowing deep semantic query reasoning."
    ],
    techStack: ["Neo4j Local / SQLite Graph Extensions", "JSON-LD Context Maps", "GraphRAG Parsers"],
    popiaCompliance: "Supports granular 'Right to be Forgotten' sweeps, allowing direct deletion of personal nodes and edges without corrupting structural graph integrity.",
    evaluationMetrics: ["Graph Ingestion Speed: >120 entities/sec", "Query Traversal Depth: 3 degrees under <35ms", "Entity Resolution Accuracy: 96%"]
  },
  {
    id: 6,
    title: "Hyper-local Data Sources",
    subtitle: "Real-time Regional Feed Ingestion",
    category: "data",
    icon: "MapPin",
    description: "Ingests and structures hyper-local telemetry, environmental feeds, municipality status dashboards, and community security alerts to ensure ground-level relevance.",
    keyFeatures: [
      "Real-time connector interfaces for localized environmental sensors (e.g., weather, load shedding).",
      "Dynamic spatial geofencing mapping community-reported safety risk zones.",
      "Strict source licensing, provenance tracking, and data quality grading.",
      "Automated conversion of unstructured municipal notices into clean JSON feeds."
    ],
    techStack: ["ThingsBoard MQTT Client", "GDAL Geospatial Engine", "RSS/Cap Alert Parser", "OpenStreetMap API"],
    popiaCompliance: "Precise location feeds are dynamically generalized into neighborhood-level polygons to protect individual movement histories.",
    evaluationMetrics: ["Data Quality Score: >95%", "Feed Sync Frequency: <60s", "Geofence Trigger Latency: <10ms"]
  },
  {
    id: 7,
    title: "Agent System",
    subtitle: "Multi-Agent Orchestration Sandbox",
    category: "orchestration",
    icon: "Users",
    description: "Manages specialized, goal-oriented autonomous sub-agents that coordinate to parse documents, translate instructions, monitor safety queues, and audit system actions.",
    keyFeatures: [
      "Role-based agent allocation with explicit system prompts and tool constraints.",
      "Collaborative task dispatch, utilizing asynchronous multi-agent communication loops.",
      "Safety guardrail checks preventing circular execution loops and infinite API billing.",
      "Inter-agent telemetry logging for complete task-lifecycle auditability."
    ],
    techStack: ["LangChain-style local runners", "Custom Agent Protocol", "Token Budget Gatekeepers"],
    popiaCompliance: "Agents operate within strict Sandbox boundaries. Agents do not have bulk read access to the master database; they query dedicated, sanitized API views.",
    evaluationMetrics: ["Task Execution Success: >91%", "Token Efficiency Rating: >85%", "Inter-Agent Latency: <50ms"]
  },
  {
    id: 8,
    title: "Offline Mode (Edge Mesh)",
    subtitle: "Resilient Local-First Architecture",
    category: "infrastructure",
    icon: "WifiOff",
    description: "Guarantees continuity of intelligence in remote, rural, or load-shed environments. Runs core search, RAG, and alert mechanics directly on low-power edge nodes.",
    keyFeatures: [
      "Ultra-compact edge distributions requiring as little as 8GB RAM.",
      "Bluetooth Low Energy (BLE) Mesh routing, letting alerts hop across devices peer-to-peer.",
      "Intelligent bi-directional data syncing that merges offline histories once connectivity heals.",
      "Adaptive performance states that scale down LLM parameters during low battery alarms."
    ],
    techStack: ["WebRTC P2P", "BLE Central/Peripheral API", "SQLite Local Storage", "Wasm-compiled tools"],
    popiaCompliance: "Data stored offline is encrypted using device-hardware keys (Tee/Secure Enclave) preventing extraction if physical nodes are lost or stolen.",
    evaluationMetrics: ["Mesh Peer Discovery Time: <1.5s", "Offline Query Success: 100% for local cache", "Battery Consumption Impact: <2% per hour"]
  },
  {
    id: 9,
    title: "South African Search Engine",
    subtitle: "Sovereign Web & Regional Index",
    category: "data",
    icon: "Search",
    description: "A secure search crawler and localized indexing layer designed to curate, rank, and serve verified South African web, civic, and academic resources.",
    keyFeatures: [
      "Custom localized ranking scoring documents based on regional relevance and provenance.",
      "Web crawler that prioritizes .gov.za, .ac.za, and local community portals.",
      "Privacy-preserving search tracking, preventing creation of search intent profiles.",
      "Search results structured as immediate prompt-ready context blocks for the RAG engine."
    ],
    techStack: ["Elasticsearch Local / Meilisearch", "Python BeautifulSoup Scrapers", "Custom Rank Scorer"],
    popiaCompliance: "No cookies or query logs are bound to IP addresses or individual user profiles. Search history is strictly session-based and auto-purged.",
    evaluationMetrics: ["Precision@10: >0.85", "Index Update Frequency: <24h for government portals", "Search Latency: <85ms"]
  },
  {
    id: 10,
    title: "Long-Term Model Strategy",
    subtitle: "Continual Sovereign Learning Lifecycle",
    category: "infrastructure",
    icon: "TrendingUp",
    description: "Governs model lifecycle training, localized synthetic data curation, fine-tuning protocols, and real-world system key performance monitoring.",
    keyFeatures: [
      "Synthetic data generation engines that generate high-quality multi-lingual dialogue.",
      "Federated learning frameworks allowing localized edge devices to train shared model weights safely.",
      "Regular model version checkpoints that are audited for bias and safety.",
      "Telemetry feedback boards identifying performance regressions across dialect groups."
    ],
    techStack: ["PyTorch Core", "Hugging Face Transformers", "Llama-Factory", "Sovereign Datasets"],
    popiaCompliance: "Training datasets go through automated double-pass anonymization scrubs, ensuring zero PII or private documents ever make it into training weights.",
    evaluationMetrics: ["Language Model Perplexity: <8.2", "Auditing Coverage: 100% of released checkpoints", "Model Release Frequency: Quarterly"]
  }
];

export const SOUTH_AFRICAN_LANGUAGES: LanguageInfo[] = [
  { code: "zu", name: "isiZulu", englishName: "Zulu", family: "Bantu (Nguni)", speakersPct: 22.7, nluStatus: "Full", ttsStatus: "Full", asrStatus: "In Progress" },
  { code: "xh", name: "isiXhosa", englishName: "Xhosa", family: "Bantu (Nguni)", speakersPct: 16.0, nluStatus: "Full", ttsStatus: "In Progress", asrStatus: "Planned" },
  { code: "af", name: "Afrikaans", englishName: "Afrikaans", family: "West Germanic", speakersPct: 13.5, nluStatus: "Full", ttsStatus: "Full", asrStatus: "Full" },
  { code: "en", name: "English", englishName: "English", family: "West Germanic", speakersPct: 9.6, nluStatus: "Full", ttsStatus: "Full", asrStatus: "Full" },
  { code: "nso", name: "Sepedi", englishName: "Northern Sotho", family: "Bantu (Sotho-Tswana)", speakersPct: 9.1, nluStatus: "Full", ttsStatus: "Planned", asrStatus: "Planned" },
  { code: "tn", name: "Setswana", englishName: "Tswana", family: "Bantu (Sotho-Tswana)", speakersPct: 8.0, nluStatus: "Full", ttsStatus: "Planned", asrStatus: "Planned" },
  { code: "st", name: "Sesotho", englishName: "Southern Sotho", family: "Bantu (Sotho-Tswana)", speakersPct: 7.6, nluStatus: "Full", ttsStatus: "In Progress", asrStatus: "Planned" },
  { code: "ts", name: "Xitsonga", englishName: "Tsonga", family: "Bantu (Tswa-Ronga)", speakersPct: 4.5, nluStatus: "Full", ttsStatus: "Planned", asrStatus: "Planned" },
  { code: "ss", name: "siSwati", englishName: "Swati", family: "Bantu (Nguni)", speakersPct: 2.5, nluStatus: "In Progress", ttsStatus: "Planned", asrStatus: "Planned" },
  { code: "ve", name: "Tshivenda", englishName: "Venda", family: "Bantu (Venda)", speakersPct: 2.4, nluStatus: "In Progress", ttsStatus: "Planned", asrStatus: "Planned" },
  { code: "nr", name: "isiNdebele", englishName: "Southern Ndebele", family: "Bantu (Nguni)", speakersPct: 2.1, nluStatus: "In Progress", ttsStatus: "Planned", asrStatus: "Planned" }
];

export const CULTURAL_PERSONAS: PersonaConfig[] = [
  {
    id: "mzansi_elder",
    name: "Gogo Nomsa (The Mzansi Elder)",
    tagline: "Ubuntu-focused, wise, patient, and deeply respectful of cultural heritage.",
    description: "Answers using traditional wisdom, begins with warm African blessings, integrates respectful vocabulary (such as Gogo, Baba, Sawubona), and explains technical topics using analogies from community life.",
    avatar: "👵🏾",
    greetings: ["Sawubona mntanami (Greetings my child). I hope you are well.", "Ndi rila (Blessings upon you). Let us talk together with patience.", "Dumela ngwana waka. It is beautiful to share knowledge today."],
    keyPhrases: ["Isitsha esihle asidleli (A beautiful vessel is not eaten from - respect cultural value).", "Umuntu ngumuntu ngabantu (A person is a person through other people).", "Let us build consensus with patience, as elders have done."],
    ubuntuPrinciple: "Respect for elders, historical perspective, community harmony, and slow, intentional consultation."
  },
  {
    id: "soweto_youth",
    name: "Sizwe 'Siz' (Soweto Tech Youth)",
    tagline: "High-energy, fast-paced, digital native, code-switching expert.",
    description: "Uses vibrant Johannesburg street slang combined with tech terminology. Code-switches naturally between English, isiZulu, and Tsotsitaal. Focused on rapid action, digital hustle, and practical solutions.",
    avatar: "🧢",
    greetings: ["Heita! Sharp-sharp, my leader! What's the play today?", "Awe, mfo! Let's get this digital hustle going.", "Sharp-sharp! K'lev.ai is online, ready to assist, no delay."],
    keyPhrases: ["No load shedding here, my leader - we are fully charged!", "Let's make this thing spin sharp-sharp.", "Ekasi style: we make it work with what we've got, standard."],
    ubuntuPrinciple: "Peer solidarity, grassroots ingenuity (jugaad/hustle), mutual aid, and active youth collaboration."
  },
  {
    id: "ubuntu_corporate",
    name: "Khumalo (Ubuntu Professional)",
    tagline: "Balanced, administrative, highly structured, POPIA-conscious.",
    description: "Designed for corporate governance, municipal offices, and enterprise settings. Combines legal and administrative precision with the core ethical framework of cooperative Ubuntu development.",
    avatar: "👔",
    greetings: ["Good day. Welcome to K'lev.ai Professional Services. Let us collaborate.", "Greetings. I am here to facilitate cooperative problem-solving for your organization.", "Sanibonani. Let us align our strategic objectives in a spirit of transparency."],
    keyPhrases: ["We must ensure compliance with POPIA section 12 prior to proceeding.", "In the interest of administrative transparency and mutual respect.", "Cooperative consensus guarantees sustainable outcomes."],
    ubuntuPrinciple: "Constitutional alignment, strict regulatory compliance, corporate stewardship, and professional collaboration."
  }
];

export const KNOWLEDGE_GRAPH_DATA: { nodes: GraphNode[]; links: GraphLink[] } = {
  nodes: [
    { id: "1", label: "K'lev.ai Core", type: "concept", provenance: "K'lev.ai Architecture Blueprint Sec 1" },
    { id: "2", label: "South African Constitution", type: "document", provenance: "Act 108 of 1996, National Archives" },
    { id: "3", label: "POPI Act (POPIA)", type: "regulation", provenance: "Act 4 of 2013, Information Regulator" },
    { id: "4", label: "SafetyLink Protocol", type: "regulation", provenance: "SafetyLink Technical Specification v2" },
    { id: "5", label: "Nelson Mandela", type: "person", provenance: "National Heritage Register" },
    { id: "6", label: "Ubuntu Philosophy", type: "concept", provenance: "African Jurisprudence Journals" },
    { id: "7", label: "Sovereign Llama 3.2", type: "concept", provenance: "Meta Open Source Model Spec" },
    { id: "8", label: "Community Watch Mesh", type: "location", provenance: "Gauteng Safety Network Logs" },
    { id: "9", label: "Load Shedding Telemetry", type: "concept", provenance: "Eskom Open API Feed" }
  ],
  links: [
    { source: "1", target: "2", relationship: "ALIGNS_WITH" },
    { source: "1", target: "3", relationship: "COMPLIES_WITH" },
    { source: "1", target: "4", relationship: "INTEGRATES" },
    { source: "1", target: "6", relationship: "OPERATES_BY" },
    { source: "1", target: "7", relationship: "HOSTS_LOCALLY" },
    { source: "4", target: "8", relationship: "DEPLOYED_IN" },
    { source: "2", target: "6", relationship: "EMBODIES" },
    { source: "5", target: "2", relationship: "SIGNATORY_OF" },
    { source: "8", target: "3", relationship: "BOUND_BY" },
    { source: "1", target: "9", relationship: "MONITORS" }
  ]
};

export const IMPLEMENTATION_ROADMAP: RoadmapPhase[] = [
  {
    phase: "Phase 1",
    title: "MVP (Core Conversational Platform)",
    duration: "Months 1 - 6",
    objectives: [
      "Deliver a core conversational platform centered around local needs.",
      "Incorporate key system components: Android application framework, active chat console, and real-time multilingual interface.",
      "Integrate resilient cloud-independent authentication and a smart AI routing layer."
    ],
    deliverables: [
      "Android client application setup with localized conversational voice layers.",
      "First-stage provider adapters routing seamlessly to local model backends.",
      "Offline emergency instructions caching mechanism and basic monitoring telemetry."
    ],
    status: "completed"
  },
  {
    phase: "Phase 2",
    title: "Production (Operational Maturity)",
    duration: "Months 7 - 12",
    objectives: [
      "Transition from pilot deployments to fully stable, production-ready operational maturity.",
      "Integrate high-accuracy retrieval-augmented knowledge bases (RAG) and voice layers.",
      "Launch specialized Kode Agent subsystems for continuous codebase audits and dependency safety."
    ],
    deliverables: [
      "Production-ready RAG Knowledge Store supporting localized document downloads.",
      "Provider abstraction layers with versioned system prompt configurations.",
      "Kode Agent repository analysis engine and automated staged canary release pipelines."
    ],
    status: "current"
  },
  {
    phase: "Phase 3",
    title: "National Scale (High Availability & Resilience)",
    duration: "Months 13 - 24",
    objectives: [
      "Scale operations nationally with absolute high availability and extreme fault resilience.",
      "Deploy multi-provider edge routers and local model packs optimized for low-resource environments.",
      "Build advanced system observability, automated error diagnostics, and audit dashboards."
    ],
    deliverables: [
      "Dynamic cost-optimized multi-provider routing layer.",
      "Regional caching servers paired with automated pipeline diagnostics.",
      "Sovereign canary release dashboards with audit logging and telemetry visualizations."
    ],
    status: "upcoming"
  },
  {
    phase: "Phase 4",
    title: "Sovereign AI Platform (Long-Term Independence)",
    duration: "Month 25+",
    objectives: [
      "Achieve full sovereign self-reliance and complete long-term technological independence.",
      "Enable 100% disconnected offline operations utilizing compact localized language models.",
      "Open South African national knowledge pipelines and enterprise-grade developer SDKs."
    ],
    deliverables: [
      "Completely standalone offline deployment kits for rural and load-shed areas.",
      "Comprehensive voice/text translation support covering all 11 official South African languages.",
      "Extensible developer SDKs, regulatory compliance reporting dashboards, and governance tools."
    ],
    status: "upcoming"
  }
];

export const KEY_EVALUATION_METRICS: MetricKPI[] = [
  {
    name: "RAG Faithfulness Score",
    value: "94.2%",
    target: ">92.0%",
    trend: "up",
    description: "Tracks how factual the generated answers are based purely on the provided context, preventing hallucinations."
  },
  {
    name: "Safety Delivery Latency",
    value: "1.4s",
    target: "<1.8s",
    trend: "up",
    description: "Average latency to dispatch high-priority alerts across Twilio, WhatsApp, and edge mesh nodes simultaneously."
  },
  {
    name: "Code-Switching Word Error Rate",
    value: "11.2%",
    target: "<12.0%",
    trend: "up",
    description: "Speech-to-text accuracy in mixed language sentences (e.g., mixing isiZulu and English in Soweto neighborhoods)."
  },
  {
    name: "Edge Offline Query Latency",
    value: "165ms",
    target: "<200ms",
    trend: "up",
    description: "Query execution speed when running the RAG vector index entirely in local memory (8GB RAM laptops)."
  },
  {
    name: "POPIA Audit Logging Coverage",
    value: "100%",
    target: "100%",
    trend: "stable",
    description: "Strict end-to-end tracing showing where every piece of ingested data rests, ensuring right-to-forgotten sweeps work perfectly."
  }
];
