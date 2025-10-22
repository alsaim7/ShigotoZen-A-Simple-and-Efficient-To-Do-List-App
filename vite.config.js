import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      filename: 'sw.js', // ✅ ensures service worker name matches your registration
      includeAssets: [
        'favicon.png',
        'favicon.png',
        'favicon.png',
        'apple-touch-icon.png',
        'robots.txt'
      ],
      manifest: false, // ✅ because you are using your own public/manifest.webmanifest
      devOptions: {
        enabled: false,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2}'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: { cacheName: 'html-cache' },
          },
          {
            urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'asset-cache' },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: { maxEntries: 50 },
            },
          },
        ],
      },
      injectRegister: 'auto', // ✅ automatically injects registration script
    }),
  ],
  base: '/',
  build: {
    outDir: 'dist',
  },
})
