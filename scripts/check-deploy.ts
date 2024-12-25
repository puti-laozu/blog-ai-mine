import { readFileSync } from 'fs';
import { resolve } from 'path';

const requiredEnvVars = [
  'CF_ACCOUNT_ID',
  'CF_API_TOKEN',
  'BLOG_TITLE',
  'BLOG_DESCRIPTION',
  'ADMIN_USERNAME',
  'ADMIN_PASSWORD',
  'JWT_SECRET'
];

function checkEnvVars() {
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars);
    process.exit(1);
  }
}

function checkWranglerConfig() {
  try {
    const wranglerConfig = readFileSync(resolve(process.cwd(), 'wrangler.toml'), 'utf-8');
    const requiredConfigs = ['database_id', 'bucket_name', 'kv_namespace'];
    
    const missingConfigs = requiredConfigs.filter(config => !wranglerConfig.includes(config));
    if (missingConfigs.length > 0) {
      console.error('Missing required Wrangler configurations:', missingConfigs);
      process.exit(1);
    }
  } catch (error) {
    console.error('Error reading wrangler.toml:', error);
    process.exit(1);
  }
}

function main() {
  console.log('Checking deployment prerequisites...');
  checkEnvVars();
  checkWranglerConfig();
  console.log('All checks passed! Ready to deploy.');
}

main(); 