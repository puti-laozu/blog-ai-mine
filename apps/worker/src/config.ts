interface Config {
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  JWT_SECRET: string;
  FRONTEND_URL: string;
}

export const getConfig = (env: any): Config => ({
  GITHUB_CLIENT_ID: env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: env.GITHUB_CLIENT_SECRET,
  JWT_SECRET: env.JWT_SECRET,
  FRONTEND_URL: env.FRONTEND_URL,
}); 