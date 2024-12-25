export async function handleStaticRequest(request: Request, env: Env) {
  const url = new URL(request.url);
  const key = url.pathname.replace('/static/', '');

  // 从 KV 获取静态资源
  const asset = await env.KV.get(key, 'arrayBuffer');
  if (!asset) {
    return new Response('Not Found', { status: 404 });
  }

  // 设置内容类型
  const contentType = getContentType(key);
  return new Response(asset, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000',
    },
  });
}

function getContentType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  const types: Record<string, string> = {
    'js': 'application/javascript',
    'css': 'text/css',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
  };
  return types[ext || ''] || 'application/octet-stream';
} 