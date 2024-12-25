export function post({ title, description, post }: PostPageData) {
  return `
    <!DOCTYPE html>
    <html lang="zh">
      <head>
        <meta charset="UTF-8">
        <title>${post.title} - ${title}</title>
        <meta name="description" content="${description}">
        <link rel="stylesheet" href="/static/style.css">
      </head>
      <body>
        <header>
          <h1>${post.title}</h1>
          <time>${new Date(post.published_at).toLocaleDateString()}</time>
        </header>
        <main>
          <article>
            ${marked(post.content)}
          </article>
        </main>
      </body>
    </html>
  `;
}

interface PostPageData {
  title: string;
  description: string;
  post: Post;
} 