export const apiRoutes = {
  posts: {
    list: '/api/posts',
    detail: '/api/posts/:slug',
    create: '/api/posts',
    update: '/api/posts/:id',
    delete: '/api/posts/:id',
  },
  comments: {
    list: '/api/comments',
    create: '/api/comments',
    moderate: '/api/comments/:id/moderate',
  },
  categories: {
    list: '/api/categories',
    create: '/api/categories',
  },
  tags: {
    list: '/api/tags',
    create: '/api/tags',
  },
  search: '/api/search',
  archives: '/api/archives',
  statistics: '/api/statistics',
}; 