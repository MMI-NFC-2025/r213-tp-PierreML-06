import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'server',

  vite: {
    plugins: [tailwindcss()]
  },

  image: {
    domains: ['agence.pierre-mouilleseaux-lhuillier.fr'],
  },

  adapter: netlify()
});