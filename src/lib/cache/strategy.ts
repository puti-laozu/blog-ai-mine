interface CacheStrategy {
  key: string;
  ttl: number;
  condition: (request: Request) => boolean;
}

const cacheStrategies: Record<string, CacheStrategy> = {
  posts: {
    key: 'posts:list',
    ttl: 3600,
    condition: (request) => request.method === 'GET'
  },
  assets: {
    key: 'assets',
    ttl: 86400, // 24小时
    condition: (request) => request.url.includes('/assets/')
  }
}; 