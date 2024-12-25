export const performanceMiddleware = async (request: Request, env: Env) => {
  const start = performance.now();
  
  // 执行请求
  const response = await handleRequest(request, env);
  
  const duration = performance.now() - start;
  await env.KV.put(`metrics:${request.url}`, JSON.stringify({
    duration,
    timestamp: Date.now()
  }));
  
  return response;
}; 