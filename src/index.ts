import { handleRequest } from './lib/core/router';

export interface Env {
  DB: D1Database;
  ASSETS: R2Bucket;
  KV: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    try {
      return await handleRequest(request, env);
    } catch (e) {
      return new Response('Internal Server Error', { status: 500 });
    }
  }
}; 