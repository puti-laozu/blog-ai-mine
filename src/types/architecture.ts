interface Architecture {
  frontend: {
    framework: 'Next.js';
    styling: 'TailwindCSS';
    components: 'React';
  };
  backend: {
    runtime: 'Cloudflare Workers';
    database: 'Cloudflare D1';
    storage: 'Cloudflare R2';
    cache: 'Cloudflare KV';
  };
  features: {
    posts: boolean;      // 文章管理
    comments: boolean;   // 评论系统
    search: boolean;     // 搜索功能
    categories: boolean; // 分类功能
    tags: boolean;      // 标签功能
    archives: boolean;   // 归档功能
    statistics: boolean; // 阅读统计
  };
} 