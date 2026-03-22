import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { drizzle as drizzleWs } from 'drizzle-orm/neon-serverless'; // Add this
import { neon, neonConfig, Pool } from '@neondatabase/serverless';
import ws from 'ws';

if (!process.env.NEON_URL) {
  throw new Error('NEON_URL is not defined');
}

// 1. For standard API calls (Next.js Routes) - Fast HTTP
const sql = neon(process.env.NEON_URL);
export const db = drizzle(sql);

// 2. For Migrations/Scripts (WebSockets)
neonConfig.webSocketConstructor = ws;
const pool = new Pool({ connectionString: process.env.NEON_URL });
export const dbWs = drizzleWs(pool);