// 初始化 Markdown 编辑器
const easyMDE = new EasyMDE({
  element: document.getElementById('content'),
  spellChecker: false,
  autosave: {
    enabled: true,
    uniqueId: 'blog-post-editor',
  },
});

// 自动生成 slug
document.getElementById('title').addEventListener('input', (e) => {
  const slug = document.getElementById('slug');
  if (!slug.value) {
    slug.value = generateSlug(e.target.value);
  }
});

// 处理表单提交
document.getElementById('postForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const post = {
    title: formData.get('title'),
    content: easyMDE.value(),
    slug: formData.get('slug'),
    status: formData.get('status'),
  };

  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      window.location.href = '/admin/login';
      return;
    }

    const response = await fetch('/api/admin/posts/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });

    if (response.ok) {
      window.location.href = '/admin/posts';
    } else {
      const error = await response.json();
      alert(`保存失败：${error.message}`);
    }
  } catch (error) {
    console.error('Save error:', error);
    alert('保存失败，请稍后重试');
  }
});

// 预览功能
document.querySelector('.btn-preview').addEventListener('click', () => {
  const content = easyMDE.value();
  const previewWindow = window.open('', '_blank');
  previewWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>预览</title>
        <link rel="stylesheet" href="/static/style.css">
      </head>
      <body>
        <article class="post-content">
          ${marked(content)}
        </article>
      </body>
    </html>
  `);
});

// 生成 URL 别名
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-|-$/g, '');
} 