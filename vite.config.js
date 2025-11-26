import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import fs from "node:fs";

const META_SOURCES = {
  ru: "./src/data/ru/meta.json",
  en: "./src/data/en/meta.json",
};

const resolveMeta = () => {
  const lang =
    (process.env.VITE_DEFAULT_LANG || "en").toLowerCase() in META_SOURCES
      ? (process.env.VITE_DEFAULT_LANG || "en").toLowerCase()
      : "ru";
  const metaPath = new URL(META_SOURCES[lang], import.meta.url);
  const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));

  return { meta, metaPath };
};

const { meta: buildMeta, metaPath } = resolveMeta();

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: "inject-build-meta",
      enforce: "pre",
      configResolved(config) {
        if (config.command === "serve" && this.addWatchFile) {
          this.addWatchFile(fileURLToPath(metaPath));
        }
      },
      transformIndexHtml(html) {
        const tags = [];

        if (buildMeta?.title) {
          tags.push({
            tag: "title",
            children: buildMeta.title,
            injectTo: "head",
          });
        }

        if (buildMeta?.description) {
          tags.push({
            tag: "meta",
            attrs: {
              name: "description",
              content: buildMeta.description.slice(0, 255),
            },
            injectTo: "head",
          });
        }

        if (buildMeta?.ogTitle) {
          tags.push({
            tag: "meta",
            attrs: {
              property: "og:title",
              content: buildMeta.ogTitle,
            },
            injectTo: "head",
          });
        }

        const ogDescription =
          buildMeta?.ogDescription || buildMeta?.description || "";

        if (ogDescription) {
          tags.push({
            tag: "meta",
            attrs: {
              property: "og:description",
              content: ogDescription.slice(0, 255),
            },
            injectTo: "head",
          });
        }

        if (buildMeta?.ogImage) {
          tags.push({
            tag: "meta",
            attrs: {
              property: "og:image",
              content: buildMeta.ogImage,
            },
            injectTo: "head",
          });
        }

        return { html, tags };
      },
    },
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "localhost",
    port: 8080,
    open: true,
  },
});
