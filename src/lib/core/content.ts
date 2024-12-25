import { marked } from 'marked';
import { sanitize } from 'isomorphic-dompurify';

interface ContentProcessor {
  process: (content: string) => Promise<string>;
  cache: (key: string, content: string) => Promise<void>;
}

export class MarkdownProcessor implements ContentProcessor {
  async process(content: string): Promise<string> {
    // 支持更多 markdown 特性
    const html = await marked(content, {
      gfm: true,
      breaks: true,
      highlight: (code, lang) => {
        // 代码高亮支持
        return highlightCode(code, lang);
      }
    });
    
    return sanitize(html);
  }

  async cache(key: string, content: string): Promise<void> {
    await env.KV.put(key, content, {
      expirationTtl: 3600 // 1小时缓存
    });
  }
} 