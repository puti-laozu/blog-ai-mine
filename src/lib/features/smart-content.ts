interface SmartContent {
  autoExcerpt: (content: string) => string;
  suggestTags: (content: string) => Promise<string[]>;
  optimizeImages: (content: string) => Promise<string>;
} 