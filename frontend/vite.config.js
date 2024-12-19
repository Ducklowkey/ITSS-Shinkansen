import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

console.log("VITE_API_URL in vite.config.js:", process.env.VITE_API_URL);

export default defineConfig({
  plugins: [react()],
});
