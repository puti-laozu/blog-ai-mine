export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function groupPostsByYear(posts: any[]) {
  return posts.reduce((groups: Record<string, any[]>, post) => {
    const year = new Date(post.created_at).getFullYear();
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(post);
    return groups;
  }, {});
} 