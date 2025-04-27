// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import postcssNested from 'postcss-nested';  // Import postcss-nested
// import tailwindcss from 'tailwindcss';  // Import TailwindCSS

// // Vite config
// export default defineConfig({
//   css: {
//     postcss: {
//       plugins: [
//         tailwindcss(),    // TailwindCSS plugin
//         postcssNested(),  // PostCSS Nested plugin
//       ],
//     },
//   },
// });





import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
