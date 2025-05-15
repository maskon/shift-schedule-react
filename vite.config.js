import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  base: "/shift-schedule-react/",
  plugins: [
    tailwindcss(),
  ],
})