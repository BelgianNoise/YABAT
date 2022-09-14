import { defineConfig, loadEnv } from 'vite';
import pluginRewriteAll from 'vite-plugin-rewrite-all';

export default defineConfig( ({ command, mode }) => {

  return {
    // fixes 404 errors with dots in URL when serving locally (https://github.com/vitejs/vite/issues/2415)
    plugins: [ pluginRewriteAll() ],
    root: 'lib',
    server: {
      port: 3000,
    },
    build: {
      outDir: '../dist',
    },
    base: '',
  }
});
