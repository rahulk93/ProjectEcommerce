// prisma.config.ts
import 'dotenv/config';
import path from 'node:path';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  datasource: {
    // Prisma 7 wants the URL here, not in schema.prisma
    url: env('DATABASE_URL'),
  },
  // Optional, but explicit:
  // engine: 'classic',
});