import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ai.klev.app',
  appName: "K'lev AI",
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
