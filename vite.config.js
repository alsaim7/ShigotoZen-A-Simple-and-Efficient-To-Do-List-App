import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Automatically updates the service worker
      includeAssets: ['favicon.png', 'logo.png', 'favicon-192.png', 'favicon-512.png'],
      manifest: {
        name: 'ShigotoZen',
        short_name: 'ShigotoZen',
        description: 'A minimalist todo app for productivity and focus',
        theme_color: '#3B82F6', // Matches your app's theme
        background_color: '#F8FAFC', // Matches light theme background
        display: 'standalone', // App-like experience
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'favicon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'favicon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'favicon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable', // For adaptive icons on Android
          },
        ],
      },
      devOptions: {
        enabled: true, // Enables PWA testing during development
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg}'], // Cache all assets
      },
    }),
  ],
  base: './', // Ensures relative paths for PWA and Capacitor compatibility
  build: {
    outDir: 'dist', // Matches your Capacitor webDir
  },
});