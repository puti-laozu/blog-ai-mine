export function handleError(error: any) {
  console.error('Application error:', error);

  if (error instanceof ApiError) {
    return new Response(error.message, {
      status: error.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response('Internal Server Error', {
    status: 500,
    headers: { 'Content-Type': 'application/json' },
  });
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }

  static notFound(message = 'Not Found') {
    return new ApiError(404, message);
  }

  static unauthorized(message = 'Unauthorized') {
    return new ApiError(401, message);
  }

  static badRequest(message = 'Bad Request') {
    return new ApiError(400, message);
  }
} 