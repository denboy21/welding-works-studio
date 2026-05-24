import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    optimizeDeps: {
      exclude: ["cloudflare:workers"],
    },
    plugins: [
      cloudflare({
        viteEnvironment: { name: "ssr" },
      }),
    ],
  },
});