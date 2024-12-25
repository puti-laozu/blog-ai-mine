interface SiteConfig {
  title: string;
  description: string;
  language: string;
  themeConfig: {
    darkMode: boolean;
    accentColor: string;
  };
  analytics?: {
    cfAnalytics?: boolean;
    gaId?: string;
  };
} 