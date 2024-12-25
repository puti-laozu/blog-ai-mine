export const html = {
  home({ title, description, posts }: HomePageData) {
    return `
      <!DOCTYPE html>
      <html lang="zh">
        <head>
          <meta charset="UTF-8">
          <title>${title}</title>
          <meta name="description" content="${description}">
          <link rel="stylesheet" href="/static/style.css">
        </head>
        <body>
          <header>
            <h1>${title}</h1>
            <p>${description}</p>
          </header>
          <main>
            ${posts.map(post => `
              <article>
                <h2><a href="/posts/${post.slug}">${post.title}</a></h2>
                <time>${new Date(post.published_at).toLocaleDateString()}</time>
              </article>
            `).join('')}
          </main>
        </body>
      </html>
    `;
  },

  // 其他页面模板...
};

interface HomePageData {
  title: string;
  description: string;
  posts: Post[];
} 