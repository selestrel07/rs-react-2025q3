/// <reference types="vitest/config" />
import { defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-utils/test-setup.ts',
    coverage: {
      provider: 'v8',
      reporter: 'text',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/**/*.d.ts', 'src/test-utils/*'],
    },
    coverageThreshold: {
      global: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
    },
  },
} as UserConfig);
