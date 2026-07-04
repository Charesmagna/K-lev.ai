/**
 * Types and interfaces for the K'lev.ai Architecture Platform
 */

export interface Layer {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  category: 'core' | 'adaptation' | 'safety' | 'data' | 'orchestration' | 'infrastructure';
  description: string;
  keyFeatures: string[];
  techStack: string[];
  popiaCompliance: string;
  evaluationMetrics: string[];
}

export type PersonaType = 'mzansi_elder' | 'soweto_youth' | 'ubuntu_corporate' | 'standard_formal' | 'oom_kleva' | 'kasi_clever' | 'safety_outie' | 'zero_bra' | 'sgela';

export interface PersonaConfig {
  id: PersonaType;
  name: string;
  tagline: string;
  description: string;
  avatar: string;
  greetings: string[];
  keyPhrases: string[];
  ubuntuPrinciple: string;
}

export interface LanguageInfo {
  code: string;
  name: string;
  englishName: string;
  family: string;
  speakersPct: number;
  nluStatus: 'Full' | 'In Progress' | 'Planned';
  ttsStatus: 'Full' | 'In Progress' | 'Planned';
  asrStatus: 'Full' | 'In Progress' | 'Planned';
}

export interface SafetyAlert {
  id: string;
  timestamp: string;
  type: 'Medical' | 'Security' | 'Fire' | 'General';
  status: 'Triggered' | 'Queued' | 'Sent' | 'Delivered' | 'Escalated' | 'Acknowledged';
  location: string;
  recipient: string;
  channels: {
    sms: 'sent' | 'failed' | 'delivered' | 'pending';
    whatsapp: 'sent' | 'failed' | 'delivered' | 'pending';
    voice: 'sent' | 'failed' | 'completed' | 'pending';
    mesh: 'sent' | 'failed' | 'delivered' | 'pending';
  };
  hops?: number;
  logs: string[];
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'concept' | 'person' | 'location' | 'document' | 'regulation';
  provenance: string;
}

export interface GraphLink {
  source: string;
  target: string;
  relationship: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  status: 'idle' | 'working' | 'completed' | 'escalating';
  currentAction: string;
  tokensUsed: number;
}

export interface RoadmapPhase {
  phase: string;
  title: string;
  duration: string;
  objectives: string[];
  deliverables: string[];
  status: 'completed' | 'current' | 'upcoming';
}

export interface MetricKPI {
  name: string;
  value: string;
  target: string;
  trend: 'up' | 'stable' | 'down';
  description: string;
}
